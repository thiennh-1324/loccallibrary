import genreController from '@/controllers/genre.controller'
import { Router } from 'express'

const router: Router = Router()

router.get('', genreController.getListGenres)
router.get('/:id', genreController.getGenreById)
router.post('', genreController.createGenre)
router.put('/:id', genreController.updateGenre)
router.delete('/:id', genreController.deleteGenre)

export default router
