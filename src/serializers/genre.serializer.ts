import { Genre } from '@/entity/genre.entity'

export enum GenreResponseType {
  FOR_ID,
  FOR_DETAIL
}

export const GenreResponseField: { [key in GenreResponseType]: string[] } = {
  [GenreResponseType.FOR_ID]: ['id'],
  [GenreResponseType.FOR_DETAIL]: ['id', 'name', 'url']
}

export class GenreSerializer {
  private genre: Genre
  private fields: string[]

  constructor(genre: Genre, fields: string[]) {
    this.genre = genre
    this.fields = fields
  }

  static new(genre: Genre, type: GenreResponseType) {
    const fields = GenreResponseField[type]
    return new GenreSerializer(genre, fields)
  }

  serializer() {
    const genreSerialized: Partial<Genre> = {}
    for (const field of this.fields) {
      if (this.genre.hasOwnProperty(field)) {
        genreSerialized[field] = this.genre[field]
      }
    }
    return genreSerialized
  }
}
