import { BookInstance } from '@/entity/book-instance.entity'

export enum BookInstanceResponseType {
  FOR_LIST,
  FOR_DETAIL
}

export const BookInstanceResponseField: { [key in BookInstanceResponseType]: string[] } = {
  [BookInstanceResponseType.FOR_LIST]: ['id', 'imprint', 'status'],
  [BookInstanceResponseType.FOR_DETAIL]: ['id, imprint', 'status', 'dueDate', 'url', 'book']
}

export class BookInstanceSerializer {
  private bookInstance: BookInstance
  private fields: string[]

  constructor(bookInstance: BookInstance, fields: string[]) {
    this.bookInstance = bookInstance
    this.fields = fields
  }

  static new(bookInstance: BookInstance, type: BookInstanceResponseType) {
    const fields = BookInstanceResponseField[type]
    return new BookInstanceSerializer(bookInstance, fields)
  }

  serializer() {
    const bookInstanceSerialized: Partial<BookInstance> = {}
    for (const field of this.fields) {
      if (this.bookInstance.hasOwnProperty(field)) {
        bookInstanceSerialized[field] = this.bookInstance[field]
      }
    }
    return bookInstanceSerialized
  }
}
