const deletePost = (id) => {
  if (confirm('Are you sure?')) {
    fetch(`/posts/${id}`, {
      method: 'DELETE',
    }).catch((err) => console.error(err)).then(() => {window.location.href = "/posts"})
  }
}

const upPost = (id) => {
  fetch(`/posts/${id}/up`, {
    method: 'POST'
  }).catch((err) => console.error(err)).then(() => {window.location.reload()})
}

const downPost = (id) => {
  fetch(`/posts/${id}/down`, {
    method: 'POST'
  }).catch((err) => console.error(err)).then(() => {window.location.reload()})
}

const url = window.location.pathname
const id = url.substring(url.lastIndexOf('/') + 1)

const thumbsUpBtn = document.querySelector('#thumbsUpBtn')
const thumbsDownBtn = document.querySelector('#thumbsDownBtn')
const deleteBtn = document.querySelector('#deleteBtn')

deleteBtn?.addEventListener('click', (e) => {
  deletePost(id)
})

thumbsUpBtn?.addEventListener('click', (e) => {
  upPost(id)
})

thumbsDownBtn?.addEventListener('click', (e) => {
  downPost(id)
})
