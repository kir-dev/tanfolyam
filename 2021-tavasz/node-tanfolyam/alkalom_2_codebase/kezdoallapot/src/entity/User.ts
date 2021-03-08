import { Entity, Column, BaseEntity, PrimaryColumn, AfterLoad, OneToMany } from 'typeorm'
import { UserToFilm } from './UserToFilm'

@Entity()
export class User extends BaseEntity {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => UserToFilm, u2f => u2f.user, { cascade: true, eager: true })
  films: UserToFilm[];

  @AfterLoad()
  setEmptyArray(): void {
    if (!this.films) {
      this.films = []
    }
  }

}