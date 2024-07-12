import bookController from '@/controllers/book.controller'
import { Router } from 'express'

const router: Router = Router()

router.get('', bookController.getListBooks)
router.get('/:id', bookController.getBookById)
router.post('', bookController.createBook)
router.put('/:id', bookController.updateBook)
router.delete('/:id', bookController.deleteBook)

export default router
