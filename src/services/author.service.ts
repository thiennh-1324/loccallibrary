import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'

class AuthorService {
  getListAuthors = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('Get List Authors')
  })

  getAuthorById = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`Get Author By Id : ${req.params.id}`)
  })

  createAuthor = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('Create Author')
  })

  updateAuthor = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`Update author: ${req.params.id}`)
  })

  deleteAuthor = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`Delete author: ${req.params.id}`)
  })
}

const authorService = new AuthorService()

export default authorService
