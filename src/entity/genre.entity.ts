import { Book } from '@/entity/book.entity'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Genre')
export class Genre {
  constructor(data?: Partial<Genre>) {
    data && Object.assign(this, data)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  url: string

  @ManyToMany(() => Book)
  books: Book[]
}
