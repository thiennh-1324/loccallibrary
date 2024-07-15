import bookInstanceService from '@/services/bookinstance.service'

class BookInstanceController {
  // [GET] /api/book-instances'
  getListBookInstances = bookInstanceService.getListBookInstances

  // [GET] /api/book-instances/:id
  getBookInstanceById = bookInstanceService.getBookInstanceById

  // [POST] /api/book-instances
  createBookInstance = bookInstanceService.createBookInstance

  // [PUT] /api/book-instances/:id
  updateBookInstance = bookInstanceService.updateBookInstance

  // [DELETE] /api/book-instances/:id
  deleteBookInstance = bookInstanceService.deleteBookInstance
}

const bookInstanceController = new BookInstanceController()

export default bookInstanceController
