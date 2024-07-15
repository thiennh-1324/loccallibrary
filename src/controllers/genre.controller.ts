import genreService from '@/services//genre.service'

class GenreController {
  // [GET] /api/genres
  getListGenres = genreService.getListGenres

  // [GET] /api/genres/:id
  getGenreById = genreService.getGenreById

  // [POST] /api/genres
  createGenre = genreService.createGenre

  // [PUT] /api/genres/:id
  updateGenre = genreService.updateGenre

  // [DELETE] /api/genres/:id
  deleteGenre = genreService.deleteGenre
}

const genreController = new GenreController()

export default genreController
