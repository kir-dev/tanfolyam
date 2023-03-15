// Basic
export const getFruit = async (name): Promise<string> => {
  const fruits = {
    pineapple: '🍍',
    peach: '🍑',
    strawberry: '🍓'
  }
   //throw Error("hiba")
   return fruits[name]
}

getFruit('peach').then(console.log)


// Promise
const makeSmoothiePromise = () => {
  let a
  return getFruit('pineapple')
    .then(v => {
      a = v
      return getFruit('strawberry')
    })
    .then(v => [a, v])
    //.catch(e => console.error("Hiba a promiseban"))
}

// Async + Await
export const makeSmoothieAwait = async () => {
  const a = await getFruit('pineapple')
  const b = await getFruit('strawberry')
  return [a, b]

}

makeSmoothiePromise().then(console.log)
