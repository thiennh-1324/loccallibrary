import { AppDataSource } from '@/config/data-source'
import { StatusCode } from '@/constant/statusCode'
import { Genre } from '@/entity/genre.entity'
import { BaseResponse } from '@/utils/base-response'
import { Request, Response } from 'express'

export enum GenreQueryType {
  BASIC
}

const genreRepository = AppDataSource.getRepository(Genre)
export const findListGenreById = async (
  genreArray: number[],
  type: GenreQueryType,
  req: Request,
  res: Response
): Promise<Genre[] | null> => {
  let genres: Genre[] = []
  switch (type) {
    case GenreQueryType.BASIC:
      genres = await genreRepository.find({
        where: genreArray.map((id) => ({ id }))
      })
      break

    default:
      genres = await genreRepository.find({
        where: genreArray.map((id) => ({ id }))
      })
      break
  }

  if (genres.length !== genreArray.length) {
    BaseResponse.new(res, StatusCode.NotFound, req.t('genre:error.not_found'), null).send()
    return null
  }

  return [...genres]
}
