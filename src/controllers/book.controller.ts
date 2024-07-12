import bookService from '@/services/book.service'

class BookController {
  // [GET] /api/books
  getListBooks = bookService.getListBooks

  // [GET] /api/books/:id
  getBookById = bookService.getBookById

  // [POST] /api/books
  createBook = bookService.createBook

  // [PUT] /api/books/:id
  updateBook = bookService.updateBook

  // [DELETE] /api/books/:id
  deleteBook = bookService.deleteBook
}

const bookController = new BookController()

export default bookController
