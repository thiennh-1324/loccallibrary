import authorService from '@/services/author.service'

class AuthorController {
  // [GET] /api/authors
  getListAuthors = authorService.getListAuthors

  // [GET] /api/authors/:id
  getAuthorById = authorService.getAuthorById

  // [POST] /api/authors
  createAuthor = authorService.createAuthor

  // [PUT] /api/authors/:id
  updateAuthor = authorService.updateAuthor

  // [DELETE] /api/authors/:id
  deleteAuthor = authorService.deleteAuthor
}

const authorController = new AuthorController()

export default authorController
