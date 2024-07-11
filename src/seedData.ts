import 'reflect-metadata'
import { AppDataSource } from '@/config/data-source'
import { faker } from '@faker-js/faker'
import { Author } from '@/entity/author.entity'
import { Genre } from '@/entity/genre.entity'
import { Book } from '@/entity/book.entity'
import { BookInstance } from '@/entity/book-instance.entity'

async function seed() {
  try {
    await AppDataSource.initialize()
    console.log('Connected to the database.')

    const authors = await seedAuthors()
    const genres = await seedGenres()
    const books = await seedBooks(authors, genres)
    await seedBookInstances(books)

    await AppDataSource.destroy()
    console.log('Seed data successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

async function seedAuthors(): Promise<Author[]> {
  const authorRepository = AppDataSource.getRepository(Author)
  const authors: Author[] = []

  for (let i = 0; i < 5; i++) {
    const author = new Author({
      firstName: faker.person.firstName(),
      familyName: faker.person.lastName(),
      dateOfBirth: faker.date.past(),
      dateOfDeath: faker.date.future(),
      url: faker.image.avatarLegacy()
    })

    await authorRepository.save(author)
    authors.push(author)
  }

  console.log(`Seeded ${authors.length} authors.`)
  return authors
}

async function seedGenres(): Promise<Genre[]> {
  const genreRepository = AppDataSource.getRepository(Genre)
  const genres: Genre[] = []

  for (let i = 0; i < 3; i++) {
    const genre = new Genre({
      name: faker.word.adverb(),
      url: faker.internet.url()
    })

    await genreRepository.save(genre)
    genres.push(genre)
  }

  console.log(`Seeded ${genres.length} genres.`)
  return genres
}

async function seedBooks(authors: Author[], genres: Genre[]): Promise<Book[]> {
  const bookRepository = AppDataSource.getRepository(Book)
  const books: Book[] = []

  for (let i = 0; i < 10; i++) {
    // Kiểm tra và thêm thể loại
    const uniqueGenres = new Set<Genre>()
    while (uniqueGenres.size < 2) {
      uniqueGenres.add(faker.helpers.arrayElement(genres))
    }

    const book = new Book({
      title: faker.lorem.words(5),
      summary: faker.lorem.paragraph(),
      isbn: faker.string.alpha(5),
      url: faker.image.urlLoremFlickr(),
      author: faker.helpers.arrayElement(authors),
      genres: Array.from(uniqueGenres)
    })

    try {
      await bookRepository.save(book)
      books.push(book)
      console.log(`Seeded book ${book.title}.`)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        console.warn(`Skipping duplicate entry for book ${book.title}.`)
      } else {
        console.error(`Error saving book ${book.title}:`, error)
      }
    }
  }

  console.log(`Seeded ${books.length} books.`)
  return books
}

async function seedBookInstances(books: Book[]): Promise<void> {
  const bookInstanceRepository = AppDataSource.getRepository(BookInstance)

  for (let i = 0; i < 20; i++) {
    const bookInstance = new BookInstance({
      imprint: faker.company.buzzVerb(),
      status: faker.helpers.arrayElement(['Available', 'Borrowed', 'Reserved']),
      dueDate: faker.date.future(),
      url: faker.internet.url(),
      book: faker.helpers.arrayElement(books)
    })

    await bookInstanceRepository.save(bookInstance)
  }

  console.log('Seeded book instances.')
}

seed()
