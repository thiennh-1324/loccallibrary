import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'

class GenreService {
  getListGenres = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('Get List Genres')
  })

  getGenreById = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`Get Genre By Id : ${req.params.id}`)
  })

  createGenre = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('Create Genre')
  })

  updateGenre = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`Update Genre: ${req.params.id}`)
  })

  deleteGenre = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`Delete Genre: ${req.params.id}`)
  })
}

const genreService = new GenreService()

export default genreService
