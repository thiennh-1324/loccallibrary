import { Router } from 'express'
import authorController from '@/controllers/author.controller'

const router: Router = Router()

router.get('', authorController.getListAuthors)
router.get('/:id', authorController.getAuthorById)
router.post('', authorController.createAuthor)
router.put('/:id', authorController.updateAuthor)
router.delete('/:id', authorController.deleteAuthor)

export default router
