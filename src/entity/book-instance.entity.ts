import { Book } from '@/entity/book.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

export enum BookInstanceStatus {
  Available = 'Available',
  Borrowed = 'Borrowed',
  Reserved = 'Reserved'
}

@Entity('BookInstance')
export class BookInstance {
  constructor(data?: Partial<BookInstance>) {
    data && Object.assign(this, data)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  imprint: string

  @Column({ type: 'enum', enum: BookInstanceStatus, default: BookInstanceStatus.Available })
  status: BookInstanceStatus

  @Column({ type: 'date', nullable: true })
  dueDate: Date

  @Column({ nullable: true })
  url: string

  @ManyToOne(() => Book, (book) => book.bookInstances, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  book: Book
}
