import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany, AfterLoad } from 'typeorm'
import { UserToFilm } from './UserToFilm'

@Entity()
export class Film extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imdbID: string;

  @Column()
  Title: string;

  @Column()
  Year: string;

  @Column()
  Poster: string;

  @OneToMany(() => UserToFilm, u2f => u2f.film, { cascade: true, eager: true })
  users: UserToFilm[];

  @AfterLoad()
  setEmptyArray(): void {
    if (!this.users) {
      this.users = []
    }
  }

}