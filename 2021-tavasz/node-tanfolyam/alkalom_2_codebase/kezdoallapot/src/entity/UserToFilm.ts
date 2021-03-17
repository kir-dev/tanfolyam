import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, } from 'typeorm'
import { Film } from './Film'
import { User } from './User'

@Entity()
export class UserToFilm extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  liked: boolean;

  @Column()
  userId: string;

  @Column()
  filmId: number;

  @ManyToOne(() => User, user => user.films)
  user: User;

  @ManyToOne(() => Film, film => film.users)
  film: Film;
}