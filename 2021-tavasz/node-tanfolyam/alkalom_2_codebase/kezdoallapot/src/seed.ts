import { createConnection } from 'typeorm'
import * as faker from 'faker'
import { Film } from './entity/Film'
import { UserToFilm } from './entity/UserToFilm'
import { User } from './entity/User'


createConnection().then(async conn =>{

  const imdbid = ['tt1345836','tt1375666','tt6723592']
  const films:Film[] = []

  for(let i = 0; i < 3; i++){

    const film = new Film()
    film.Title = faker.name.title()
    film.Year = '2010'
    film.Poster = 'https://image.shutterstock.com/image-photo/sad-cat-he-sits-rests-260nw-565582708.jpg'
    film.imdbID = imdbid[i]
    await film.save()
    films.push(film)
  }


  for(let i = 0; i < 10; i++){

    const user = new User()
    user.id = faker.random.uuid()
    user.name = faker.name.firstName()
    user.email = faker.internet.email()

    await user.save()

    const op = new UserToFilm()
    op.film = films[faker.random.number(2)]
    op.user = user
    op.liked = faker.random.boolean()
    await op.save()
        
  }



})