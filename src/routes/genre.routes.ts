import genreController from '@/controllers/genre.controller'
import paginationMiddleware from '@/middleware/pagination.middleware'
import validateRequest from '@/middleware/validate-request.middleware'
import { CreateGenreDto } from '@/view-models/genre/createGenreDto'
import { Router } from 'express'

const router: Router = Router()

router.get('', paginationMiddleware, genreController.getListGenres)
router.get('/:id', genreController.getGenreById)
router.post('', validateRequest(CreateGenreDto), genreController.createGenre)
router.put('/:id', validateRequest(CreateGenreDto), genreController.updateGenre)
router.delete('/:id', genreController.deleteGenre)

export default router
