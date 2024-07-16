import { Router } from 'express'
import authorController from '@/controllers/author.controller'
import paginationMiddleware from '@/middleware/pagination.middleware'
import { CreateAuthorDto } from '@/view-models/author/createAuthorDto'
import validateRequest from '@/middleware/validate-request.middleware'

const router: Router = Router()

router.get('', paginationMiddleware, authorController.getListAuthors)
router.get('/:id', authorController.getAuthorById)
router.post('', validateRequest(CreateAuthorDto), authorController.createAuthor)
router.put('/:id', validateRequest(CreateAuthorDto), authorController.updateAuthor)
router.delete('/:id', authorController.deleteAuthor)

export default router
