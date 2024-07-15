import { Author } from '@/entity/author.entity'

export enum AuthorResponseType {
  FOR_LIST,
  FOR_DETAIL
}

export const AuthorResponseField: { [key in AuthorResponseType]: string[] } = {
  [AuthorResponseType.FOR_LIST]: ['id', 'firstName', 'familyName'],
  [AuthorResponseType.FOR_DETAIL]: ['id', 'firstName', 'familyName', 'url', 'books']
}

export class AuthorSerializer {
  private author: Author
  private fields: string[]

  constructor(author: Author, fields: string[]) {
    this.author = author
    this.fields = fields
  }

  static new(author: Author, type: AuthorResponseType) {
    const fields = AuthorResponseField[type]
    return new AuthorSerializer(author, fields)
  }

  serialize() {
    const serializedData: Partial<Author> = {}
    for (const field of this.fields) {
      if (this.author.hasOwnProperty(field)) {
        serializedData[field] = this.author[field]
      }
    }
    return serializedData
  }
}
