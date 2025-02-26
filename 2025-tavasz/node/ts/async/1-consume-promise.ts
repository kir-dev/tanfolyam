import fetch, { Response } from 'node-fetch';

const promise: Promise<Response> = fetch(
  'https://jsonplaceholder.typicod.com/todos/2'
);

promise
  .then((res) => res.json())
  // .then((todo) => {
  //   throw new Error('uh oh');
  // })
  .then((todo) => console.log('😛', todo.title));
// .catch((err) => console.error('😭', err));

console.log('🥪 Synchronous');
