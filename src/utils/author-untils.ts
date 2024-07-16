import { AppDataSource } from '@/config/data-source'
import { StatusCode } from '@/constant/statusCode'
import { Author } from '@/entity/author.entity'
import { BaseResponse } from '@/utils/base-response'
import { Request, Response } from 'express'

export enum AuthorQueryType {
  BASIC,
  WITH_BOOKS,
  WITH_BOOKS_AND_OTHER_RELATIONS
}

const authorRepository = AppDataSource.getRepository(Author)
export const findAuthorById = async (
  authorId: number,
  type: AuthorQueryType,
  req: Request,
  res: Response
): Promise<Author | null> => {
  let author: Author | null = null
  switch (type) {
    case AuthorQueryType.BASIC:
      author = await authorRepository.findOne({
        where: { id: authorId }
      })
      break
    case AuthorQueryType.WITH_BOOKS:
      author = await authorRepository.findOne({
        where: { id: authorId },
        relations: { books: true }
      })
      break
    default:
      author = await authorRepository.findOne({
        where: { id: authorId }
      })
  }

  if (!author) {
    BaseResponse.new(res, StatusCode.NotFound, req.t('author:error.not_found'), null).send()
    return null
  }

  return author
}
