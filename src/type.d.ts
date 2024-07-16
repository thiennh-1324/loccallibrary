import { Request } from 'express'

declare module 'express-serve-static-core' {
  interface Request {
    pagination?: {
      page: number
      limit: number
      skip: number
    }
  }
}
