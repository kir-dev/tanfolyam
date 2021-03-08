/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const likeFilm = (id) => {
  fetch(`/films/like/${id}`, {
    method: 'POST'
  }).catch((err) => console.error(err)).then(() => window.location.reload())
}

const dislikeFilm = (id) => {
  fetch(`/films/dislike/${id}`, {
    method: 'POST'
  }).catch((err) => console.error(err)).then(() => window.location.reload())
}

const deleteUserToFilm = (id) => {
  fetch(`/films/delete/${id}`, {
    method: 'DELETE'
  }).catch((err) => console.error(err)).then(() => window.location.reload())
}
