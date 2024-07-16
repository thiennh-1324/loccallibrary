import { AppDataSource } from '@/config/data-source'
import { StatusCode } from '@/constant/statusCode'
import { BookInstance } from '@/entity/book-instance.entity'
import { BookInstanceResponseType, BookInstanceSerializer } from '@/serializers/book-instance.serializer'
import { BaseResponse } from '@/utils/base-response'
import { BookInstanceQueryType, findBookInstanceById } from '@/utils/book-instance-untils'
import { BookQueryType, findBookById } from '@/utils/book-utils'
import handleDatabaseOperation from '@/utils/handle-data-async'
import { CreateBookInstanceDto } from '@/view-models/book-instance/createBookInstanceDto'
import { plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'

class BookInstanceService {
  private readonly bookInstanceRepository = AppDataSource.getRepository(BookInstance)

  getListBookInstances = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit, skip } = req.pagination
    const [bookInstances, total] = await this.bookInstanceRepository.findAndCount({
      relations: { book: true },
      skip: skip,
      take: limit
    })
    const serializedBookInstances = bookInstances.map((bookInstance) =>
      BookInstanceSerializer.new(bookInstance, BookInstanceResponseType.FOR_LIST).serializer()
    )
    const paging = {
      page,
      total,
      limit,
      pages: Math.ceil(total / limit)
    }
    BaseResponse.new(res, StatusCode.Success, req.t('book-instance:success.list'), {
      paging,
      bookInstances: serializedBookInstances
    }).send()
  })

  getBookInstanceById = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstanceId = parseInt(req.params.id)
    const bookInstance = await findBookInstanceById(bookInstanceId, BookInstanceQueryType.WITH_BOOK, req, res)
    if (!bookInstance) return
    const serializedBookInstances = BookInstanceSerializer.new(
      bookInstance,
      BookInstanceResponseType.FOR_DETAIL
    ).serializer()
    BaseResponse.new(res, StatusCode.Success, req.t('book-instance:success.get'), {
      bookInstance: serializedBookInstances
    }).send()
  })

  createBookInstance = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstanceData = plainToInstance(CreateBookInstanceDto, req.body)
    const bookId = bookInstanceData.bookId
    const book = await findBookById(bookId, BookQueryType.BASIC, req, res)
    if (!book) return

    const newBookInstance = this.bookInstanceRepository.create({
      ...bookInstanceData,
      book
    })

    await handleDatabaseOperation(
      req,
      res,
      async () => {
        await this.bookInstanceRepository.save(newBookInstance)
        return { bookInstance: newBookInstance }
      },
      req.t('book-instance:success.create'),
      req.t('book-instance:error.internal_server')
    )
  })

  updateBookInstance = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstanceId = parseInt(req.params.id)
    const bookInstance = await findBookInstanceById(bookInstanceId, BookInstanceQueryType.WITH_BOOK, req, res)
    if (!bookInstance) return
    const bookInstanceData = plainToInstance(CreateBookInstanceDto, req.body)
    const bookId = bookInstanceData.bookId
    const book = await findBookById(bookId, BookQueryType.BASIC, req, res)
    if (!book) return

    const result = this.bookInstanceRepository.merge(bookInstance, { ...bookInstanceData, book })

    await handleDatabaseOperation(
      req,
      res,
      async () => {
        await this.bookInstanceRepository.save(result)
        return result
      },
      req.t('book-instance:success.update'),
      req.t('book-instance:error.internal_server')
    )
  })

  deleteBookInstance = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstanceId = parseInt(req.params.id)
    const bookInstance = await findBookInstanceById(bookInstanceId, BookInstanceQueryType.WITH_BOOK, req, res)
    if (!bookInstance) return

    await handleDatabaseOperation(
      req,
      res,
      async () => {
        const deleteResult = await this.bookInstanceRepository.delete(bookInstanceId)
        return deleteResult.affected
      },
      req.t('book-instance:success.delete'),
      req.t('book-instance:error.internal_server')
    )
  })
}

const bookInstanceService = new BookInstanceService()

export default bookInstanceService
