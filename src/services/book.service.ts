import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'

class BookService {
  getListBooks = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('Get List Books')
  })

  getBookById = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`Get Book By Id : ${req.params.id}`)
  })

  createBook = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('Create Book')
  })

  updateBook = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`Update Book: ${req.params.id}`)
  })

  deleteBook = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`Delete Book: ${req.params.id}`)
  })
}

const bookService = new BookService()
export default bookService
