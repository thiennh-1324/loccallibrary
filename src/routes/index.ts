import { Router } from 'express'
import AuthorRoutes from '@/routes/author.routes'
import BookRoutes from '@/routes/book.routes'
import GenreRoutes from '@/routes/genre.routes'
import BookInstanceRoutes from '@/routes/bookinstance.routes'

const router: Router = Router()

router.use('/authors', AuthorRoutes)
router.use('/books', BookRoutes)
router.use('/genres', GenreRoutes)
router.use('/book-instances', BookInstanceRoutes)

export default router
