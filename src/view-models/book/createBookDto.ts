import { IsInt, IsOptional, IsString, IsArray, ArrayNotEmpty } from 'class-validator'

export class CreateBookDto {
  @IsString()
  title: string

  @IsString()
  summary: string

  @IsString()
  isbn: string

  @IsString()
  @IsOptional()
  url?: string

  @IsInt()
  authorId: number

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  genres: number[]
}
