import { StatusCode } from '@/constant/statusCode'
import { Response } from 'express'

export class BaseResponse {
  private res: Response
  private statusCode: StatusCode
  private message: string
  private data: any

  constructor(res: Response, statusCode: StatusCode, message: string, data: any) {
    this.res = res
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }
  static new(res: Response, statusCode: StatusCode, message: string, data: any) {
    return new BaseResponse(res, statusCode, message, data)
  }
  send() {
    return this.res.status(this.statusCode).json({ message: this.message, data: this.data })
  }
}
