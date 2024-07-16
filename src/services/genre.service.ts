import { AppDataSource } from '@/config/data-source'
import { StatusCode } from '@/constant/statusCode'
import { Genre } from '@/entity/genre.entity'
import { GenreResponseType, GenreSerializer } from '@/serializers/genre.serializer'
import { BaseResponse } from '@/utils/base-response'
import { GenreQueryType, findListGenreById } from '@/utils/genre-untils'
import handleDatabaseOperation from '@/utils/handle-data-async'
import { CreateGenreDto } from '@/view-models/genre/createGenreDto'
import { plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'

class GenreService {
  private readonly genreRepository = AppDataSource.getRepository(Genre)

  getListGenres = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit, skip } = req.pagination
    const [genres, total] = await this.genreRepository.findAndCount({ skip: skip, take: limit })
    const serializedGenre = genres.map((genre) => GenreSerializer.new(genre, GenreResponseType.FOR_ID).serializer())
    const paging = {
      page,
      total,
      limit,
      pages: Math.ceil(total / limit)
    }
    BaseResponse.new(res, StatusCode.Success, req.t('genre:success.list'), { paging, genres: serializedGenre }).send()
  })

  getGenreById = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genreId = parseInt(req.params.id)
    const genres = await findListGenreById([genreId], GenreQueryType.BASIC, req, res)
    if (genres.length === 0) return
    const serializedGenre = genres.map((genre) => GenreSerializer.new(genre, GenreResponseType.FOR_ID).serializer())
    BaseResponse.new(res, StatusCode.Success, req.t('genre:success.get'), { genres: serializedGenre }).send()
  })

  createGenre = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genreData = plainToInstance(CreateGenreDto, req.body)
    const newGenre = await this.genreRepository.create(genreData)
    await handleDatabaseOperation(
      req,
      res,
      async () => {
        await this.genreRepository.save(newGenre)
        return { genre: newGenre }
      },
      req.t('genre:success.create'),
      req.t('genre:error.internal_server')
    )
  })

  updateGenre = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genreId = parseInt(req.params.id)
    const genres = await findListGenreById([genreId], GenreQueryType.BASIC, req, res)
    if (genres.length === 0) return
    const genreUpdate = plainToInstance(CreateGenreDto, req.body)
    this.genreRepository.merge(genres[0], genreUpdate)
    await handleDatabaseOperation(
      req,
      res,
      async () => {
        await this.genreRepository.save(genres[0])
        return { genre: genres[0] }
      },
      req.t('genre:success.update'),
      req.t('genre:error.internal_server')
    )
  })

  deleteGenre = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genreId = parseInt(req.params.id)
    const genres = await findListGenreById([genreId], GenreQueryType.BASIC, req, res)
    if (genres.length === 0) return
    await handleDatabaseOperation(
      req,
      res,
      async () => {
        const deleteResult = await this.genreRepository.delete(genreId)
        return deleteResult.affected
      },
      req.t('genre:success.delete'),
      req.t('genre:error.internal_server')
    )
  })
}

const genreService = new GenreService()

export default genreService
