/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const myModal = new bootstrap.Modal(document.getElementById('msg-modal'), {})
const myBody = document.getElementById('msg-modal-body')

const showModal = (msg) => {
  myBody.innerHTML = msg
  myModal.toggle()
}

const likeFilm = (id) => {
  fetch(`/films/like/${id}`, {
    method: 'POST'
  }).catch((err) => console.error(err)).then((res) => {
    switch (res.status) {
    case 200:
      showModal('Sikeres lájkolás!')
      break
    case 405:
      showModal('Ezt a filmet már lájkoltad!')
      break
    }
  })
}

const dislikeFilm = (id) => {
  fetch(`/films/dislike/${id}`, {
    method: 'POST'
  }).catch((err) => console.error(err)).then((res) => {
    switch (res.status) {
    case 200:
      showModal('Sikeres dislájkolás!')
      break
    case 405:
      showModal('Ezt a filmet már dislájkoltad!')
      break
    }
  })
}