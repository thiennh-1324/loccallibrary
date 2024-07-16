import bookInstanceController from '@/controllers/bookinstance.controller'
import paginationMiddleware from '@/middleware/pagination.middleware'
import validateRequest from '@/middleware/validate-request.middleware'
import { CreateBookInstanceDto } from '@/view-models/book-instance/createBookInstanceDto'
import { Router } from 'express'

const router: Router = Router()

router.get('', paginationMiddleware, bookInstanceController.getListBookInstances)
router.get('/:id', bookInstanceController.getBookInstanceById)
router.post('', validateRequest(CreateBookInstanceDto), bookInstanceController.createBookInstance)
router.put('/:id', validateRequest(CreateBookInstanceDto), bookInstanceController.updateBookInstance)
router.delete('/:id', bookInstanceController.deleteBookInstance)

export default router
