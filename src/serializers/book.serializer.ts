import { Book } from '@/entity/book.entity'

export enum BookResponseType {
  FOR_LIST,
  FOR_DETAIL
}

export const BookResponseField: { [key in BookResponseType]: string[] } = {
  [BookResponseType.FOR_LIST]: ['id', 'title'],
  [BookResponseType.FOR_DETAIL]: ['id', 'title', 'summary', 'url', 'author']
}

export class BookSerializer {
  private book: Book
  private fields: string[]

  constructor(book: Book, fields: string[]) {
    this.book = book
    this.fields = fields
  }

  static new(book: Book, type: BookResponseType) {
    const fields = BookResponseField[type]
    return new BookSerializer(book, fields)
  }

  serialize() {
    const bookSerialized: Partial<Book> = {}
    for (const field of this.fields) {
      if (this.book.hasOwnProperty(field)) {
        bookSerialized[field] = this.book[field]
      }
    }
    return bookSerialized
  }
}
