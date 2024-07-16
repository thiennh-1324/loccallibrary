import { AppDataSource } from '@/config/data-source'
import { StatusCode } from '@/constant/statusCode'
import { Author } from '@/entity/author.entity'
import { Book } from '@/entity/book.entity'
import { Genre } from '@/entity/genre.entity'
import { BookResponseType, BookSerializer } from '@/serializers/book.serializer'
import { AuthorQueryType, findAuthorById } from '@/utils/author-untils'
import { BaseResponse } from '@/utils/base-response'
import { BookQueryType, findBookById } from '@/utils/book-utils'
import { GenreQueryType, findListGenreById } from '@/utils/genre-untils'
import handleDatabaseOperation from '@/utils/handle-data-async'
import { CreateBookDto } from '@/view-models/book/createBookDto'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'

class BookService {
  private readonly bookRepository = AppDataSource.getRepository(Book)

  getListBooks = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit, skip } = req.pagination
    const [books, total] = await this.bookRepository.findAndCount({
      relations: { author: true, genres: true },
      skip: skip,
      take: limit
    })
    const serializedBooks = books.map((book) => BookSerializer.new(book, BookResponseType.FOR_LIST).serialize())
    const paging = {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
    BaseResponse.new(res, StatusCode.Success, req.t('book:success.list'), { paging, books: serializedBooks }).send()
  })

  getBookById = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookId = parseInt(req.params.id)
    const book = await findBookById(bookId, BookQueryType.WITH_AUTHOR_AND_GENRES, req, res)
    if (!book) return
    const serializedBooks = BookSerializer.new(book, BookResponseType.FOR_DETAIL).serialize()
    BaseResponse.new(res, StatusCode.Success, req.t('book:success.get'), { book: serializedBooks }).send()
  })

  createBook = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookData = plainToInstance(CreateBookDto, req.body)
    const authorId = bookData.authorId
    const author = await findAuthorById(authorId, AuthorQueryType.BASIC, req, res)
    if (!author) return

    const genres = await findListGenreById(bookData.genres, GenreQueryType.BASIC, req, res)
    if (!genres) return

    const newBook = this.bookRepository.create({
      ...bookData,
      author,
      genres
    })
    await handleDatabaseOperation(
      req,
      res,
      async () => {
        await this.bookRepository.save(newBook)
        return { book: newBook }
      },
      req.t('book:success.create'),
      req.t('book:error.internal_server')
    )
  })

  updateBook = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookId = parseInt(req.params.id)
    const bookData = plainToInstance(CreateBookDto, req.body)
    const authorId = bookData.authorId
    const book = await findBookById(bookId, BookQueryType.BASIC, req, res)
    if (!book) return

    const author = await findAuthorById(authorId, AuthorQueryType.BASIC, req, res)
    if (!author) return

    const genres = await findListGenreById(bookData.genres, GenreQueryType.BASIC, req, res)
    if (!genres) return

    const result = this.bookRepository.merge(book, {
      ...bookData,
      author,
      genres
    })
    await handleDatabaseOperation(
      req,
      res,
      async () => {
        await this.bookRepository.save(result)
        return result
      },
      req.t('book:success.update'),
      req.t('book:error.internal_server')
    )
  })

  deleteBook = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookId = parseInt(req.params.id)
    const book = await findBookById(bookId, BookQueryType.BASIC, req, res)
    if (!book) return
    await handleDatabaseOperation(
      req,
      res,
      async () => {
        const deleteResult = await this.bookRepository.delete(bookId)
        return deleteResult.affected
      },
      req.t('book:success.delete'),
      req.t('book:error.internal_server')
    )
  })
}

const bookService = new BookService()
export default bookService
