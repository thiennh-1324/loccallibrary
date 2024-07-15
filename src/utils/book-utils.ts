import { AppDataSource } from '@/config/data-source'
import { StatusCode } from '@/constant/statusCode'
import { Book } from '@/entity/book.entity'
import { BaseResponse } from '@/utils/base-response'
import { Request, Response } from 'express'

export enum BookQueryType {
  BASIC,
  WITH_AUTHOR,
  WITH_AUTHOR_AND_GENRES
}

const bookRepository = AppDataSource.getRepository(Book)
export const findBookById = async (
  bookId: number,
  type: BookQueryType,
  req: Request,
  res: Response
): Promise<Book | null> => {
  let book: Book | null = null
  switch (type) {
    case BookQueryType.BASIC:
      book = await bookRepository.findOne({
        where: { id: bookId }
      })
      break
    case BookQueryType.WITH_AUTHOR:
      book = await bookRepository.findOne({
        where: { id: bookId },
        relations: { author: true }
      })
      break
    case BookQueryType.WITH_AUTHOR_AND_GENRES:
      book = await bookRepository.findOne({
        where: { id: bookId },
        relations: { author: true, genres: true }
      })
      break
    default:
      book = await bookRepository.findOne({
        where: { id: bookId }
      })
  }

  if (!book) {
    BaseResponse.new(res, StatusCode.NotFound, req.t('book:error.not_found'), null).send()
    return null
  }

  return book
}
