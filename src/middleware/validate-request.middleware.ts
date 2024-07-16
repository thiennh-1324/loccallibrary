import { StatusCode } from '@/constant/statusCode'
import { BaseResponse } from '@/utils/base-response'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

const validateRequest = (DtoClass) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtoObject = plainToInstance(DtoClass, req.body)
      const errors = await validate(dtoObject)

      if (errors.length > 0) {
        return BaseResponse.new(res, StatusCode.BadRequest, req.t('validation:error'), errors).send()
      }

      next()
    } catch (error) {
      return BaseResponse.new(res, StatusCode.InternalServerError, req.t('internal_server_error'), error).send()
    }
  }
}

export default validateRequest
