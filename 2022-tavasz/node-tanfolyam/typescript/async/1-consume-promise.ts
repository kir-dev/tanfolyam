import fetch, { Response } from 'node-fetch'

const promise: Promise<Response> = fetch('https://jsonplaceholder.typicode.com/todos/1')

promise
  .then(res => res.json())
  .then(todo => {
    // throw new Error('uh oh')
    return todo
  })
  .then(todo => console.log('😛', todo.title))
  .catch(err => console.error('😭', err))

console.log('🥪 Synchronous')
