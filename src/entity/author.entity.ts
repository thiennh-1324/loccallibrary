import { Book } from '@/entity/book.entity'
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Author')
export class Author {
  constructor(data?: Partial<Author>) {
    data && Object.assign(this, data)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  familyName: string

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date

  @Column({ type: 'date', nullable: true })
  dateOfDeath: Date

  @Column({ nullable: true })
  url: string

  @OneToMany(() => Book, (book) => book.author)
  books: Book[]
}
