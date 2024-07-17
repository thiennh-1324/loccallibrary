import { BookInstanceStatus } from '@/entity/book-instance.entity'
import { IsDateString, IsEnum, IsInt, IsOptional, IsString } from 'class-validator'

export class CreateBookInstanceDto {
  @IsString()
  imprint: string

  @IsEnum(BookInstanceStatus, { message: 'Status must be one of the following values: Available, Borrowed, Reserved' })
  status: BookInstanceStatus

  @IsDateString()
  dueDate: Date

  @IsString()
  @IsOptional()
  url: string

  @IsInt()
  bookId: number
}
