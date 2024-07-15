import { AppDataSource } from '@/config/data-source'
import { StatusCode } from '@/constant/statusCode'
import { Genre } from '@/entity/genre.entity'
import { BaseResponse } from '@/utils/base-response'
import { Request, Response } from 'express'

const genreRepository = AppDataSource.getRepository(Genre)
export const findListGenreById = async (genreArray: number[], req: Request, res: Response): Promise<Genre[] | null> => {
  const genres = await genreRepository.find({
    where: genreArray.map((id) => ({ id }))
  })
  if (genres.length !== genreArray.length) {
    BaseResponse.new(res, StatusCode.NotFound, req.t('genre:error.not_found'), null).send()
    return null
  }

  return [...genres]
}
