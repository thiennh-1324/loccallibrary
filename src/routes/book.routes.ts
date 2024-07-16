import bookController from '@/controllers/book.controller'
import paginationMiddleware from '@/middleware/pagination.middleware'
import validateRequest from '@/middleware/validate-request.middleware'
import { CreateBookDto } from '@/view-models/book/createBookDto'
import { Router } from 'express'

const router: Router = Router()

router.get('', paginationMiddleware, bookController.getListBooks)
router.get('/:id', bookController.getBookById)
router.post('', validateRequest(CreateBookDto), bookController.createBook)
router.put('/:id', validateRequest(CreateBookDto), bookController.updateBook)
router.delete('/:id', bookController.deleteBook)

export default router
