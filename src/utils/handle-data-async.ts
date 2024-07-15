import { Request, Response } from 'express'
import { BaseResponse } from '@/utils/base-response'
import { StatusCode } from '@/constant/statusCode'

const handleDatabaseOperation = async (
  req: Request,
  res: Response,
  callback: () => Promise<any>,
  successMessage: string,
  errorMessage: string
) => {
  try {
    const result = await callback()
    BaseResponse.new(res, StatusCode.Success, successMessage, result).send()
  } catch (error) {
    BaseResponse.new(res, StatusCode.InternalServerError, errorMessage, error).send()
  }
}

export default handleDatabaseOperation
