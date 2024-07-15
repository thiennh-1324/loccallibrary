import { Book } from '@/entity/book.entity'
import { IsDateString, IsOptional, IsString } from 'class-validator'


export class CreateAuthorDto {
  @IsString()
  firstName: string

  @IsString()
  familyName: string

  @IsDateString()
  @IsOptional()
  dateOfBirth: Date

  @IsDateString()
  @IsOptional()
  dateOfDeath: Date

  @IsString()
  @IsOptional()
  url?: string
}
