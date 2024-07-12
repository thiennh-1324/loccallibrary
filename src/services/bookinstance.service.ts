import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'

class BookInstanceService {
  getListBookInstances = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('Get List BookInstances')
  })

  getBookInstanceById = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`Get BookInstance By Id : ${req.params.id}`)
  })

  createBookInstance = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('Create BookInstance')
  })

  updateBookInstance = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`Update BookInstance: ${req.params.id}`)
  })

  deleteBookInstance = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`Delete BookInstance: ${req.params.id}`)
  })
}

const bookInstanceService = new BookInstanceService()

export default bookInstanceService
