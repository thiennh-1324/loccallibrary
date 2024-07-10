import { Author } from '@/entity/author.entity'
import { BookInstance } from '@/entity/book-instance.entity'
import { Genre } from '@/entity/genre.entity'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity('Book')
export class Book {
  constructor(data?: Partial<Book>) {
    data && Object.assign(this, data)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  summary: string

  @Column()
  isbn: string

  @Column({ nullable: true })
  url: string

  @ManyToOne(() => Author, (author) => author.books, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: Author

  @OneToMany(() => BookInstance, (instance) => instance.book)
  bookInstances: BookInstance[]

  @ManyToMany(() => Genre, (genre) => genre.books)
  @JoinTable()
  genres: Genre[]
}
