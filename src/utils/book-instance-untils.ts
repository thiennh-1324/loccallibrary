import { AppDataSource } from '@/config/data-source'
import { StatusCode } from '@/constant/statusCode'
import { BookInstance } from '@/entity/book-instance.entity'
import { BaseResponse } from '@/utils/base-response'
import { Request, Response } from 'express'

export enum BookInstanceQueryType {
  BASIC,
  WITH_BOOK
}

const bookInstanceRepository = AppDataSource.getRepository(BookInstance)

export const findBookInstanceById = async (
  bookInstanceId: number,
  type: BookInstanceQueryType,
  req: Request,
  res: Response
) => {
  let bookInstance: BookInstance | null = null
  switch (type) {
    case BookInstanceQueryType.BASIC:
      bookInstance = await bookInstanceRepository.findOne({ where: { id: bookInstanceId } })
      break
    case BookInstanceQueryType.WITH_BOOK:
      bookInstance = await bookInstanceRepository.findOne({ where: { id: bookInstanceId }, relations: { book: true } })
      break
    default:
      bookInstance = await bookInstanceRepository.findOne({ where: { id: bookInstanceId } })
      break
  }

  if (!bookInstance) {
    BaseResponse.new(res, StatusCode.NotFound, req.t('book-instance:error.not_found'), null).send()
    return null
  }
  return bookInstance
}
