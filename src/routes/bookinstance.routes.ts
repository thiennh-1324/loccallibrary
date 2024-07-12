import bookInstanceController from '@/controllers/bookinstance.controller'
import { Router } from 'express'

const router: Router = Router()

router.get('', bookInstanceController.getListBookInstances)
router.get('/:id', bookInstanceController.getBookInstanceById)
router.post('', bookInstanceController.createBookInstance)
router.put('/:id', bookInstanceController.updateBookInstance)
router.delete('/:id', bookInstanceController.deleteBookInstance)

export default router
