import { AppDataSource } from '@/config/data-source'
import { StatusCode } from '@/constant/statusCode'
import { Author } from '@/entity/author.entity'
import { AuthorResponseType, AuthorSerializer } from '@/serializers/author.serializer'
import { AuthorQueryType, findAuthorById } from '@/utils/author-untils'
import { BaseResponse } from '@/utils/base-response'
import handleDatabaseOperation from '@/utils/handle-data-async'
import { CreateAuthorDto } from '@/view-models/author/createAuthorDto'
import { plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'

class AuthorService {
  private readonly authorRepository = AppDataSource.getRepository(Author)

  getListAuthors = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit, skip } = req.pagination
    const [authors, total] = await this.authorRepository.findAndCount({
      relations: { books: true },
      skip: skip,
      take: limit
    })
    const serializedAuthors = authors.map((author) =>
      AuthorSerializer.new(author, AuthorResponseType.FOR_LIST).serialize()
    )
    const paging = {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
    BaseResponse.new(res, StatusCode.Success, req.t('author:success.list'), {
      paging,
      authors: serializedAuthors
    }).send()
  })

  getAuthorById = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = parseInt(req.params.id)
    const author = await findAuthorById(authorId, AuthorQueryType.WITH_BOOKS, req, res)
    if (!author) return
    const serializedAuthor = AuthorSerializer.new(author, AuthorResponseType.FOR_DETAIL).serialize()
    BaseResponse.new(res, StatusCode.Success, req.t('author:success.list'), { author: serializedAuthor }).send()
  })

  createAuthor = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Chuyển đổi dữ liệu từ request body thành instance của CreateAuthorDto
    const authorData = plainToInstance(CreateAuthorDto, req.body)
    const newAuthor = this.authorRepository.create(authorData)
    await handleDatabaseOperation(
      req,
      res,
      async () => {
        await this.authorRepository.save(newAuthor)
        return { author: newAuthor }
      },
      req.t('author:success.create'),
      req.t('author:error.internal_server')
    )
  })

  updateAuthor = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = parseInt(req.params.id)
    const author = await findAuthorById(authorId, AuthorQueryType.BASIC, req, res)
    if (!author) return
    const authorUpdate = plainToInstance(Author, req.body)
    this.authorRepository.merge(author, authorUpdate)
    await handleDatabaseOperation(
      req,
      res,
      async () => {
        await this.authorRepository.save(author)
        return { author }
      },
      req.t('author:success.update'),
      req.t('author:error.internal_server')
    )
  })

  deleteAuthor = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = parseInt(req.params.id)
    const author = await findAuthorById(authorId, AuthorQueryType.BASIC, req, res)
    if (!author) return
    await handleDatabaseOperation(
      req,
      res,
      async () => {
        const deleteResult = await this.authorRepository.delete(authorId)
        return deleteResult.affected
      },
      req.t('author:success.delete'),
      req.t('author:error.internal_server')
    )
  })
}

const authorService = new AuthorService()

export default authorService
