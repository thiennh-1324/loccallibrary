import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constant/pagination'
import { NextFunction, Request, Response } from 'express'

const paginationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || DEFAULT_PAGE
  const limit = parseInt(req.query.limit as string) || DEFAULT_PAGE_SIZE

  req.pagination = {
    page,
    limit,
    skip: (page - 1) * limit
  }
  next()
}

export default paginationMiddleware
