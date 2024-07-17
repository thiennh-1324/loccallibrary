import { IsOptional, IsString } from 'class-validator'

export class CreateGenreDto {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  url?: string
}
