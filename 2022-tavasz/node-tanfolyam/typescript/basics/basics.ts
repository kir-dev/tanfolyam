// interfaces
interface Kitty {
  name: string
  age: number
}

const array: Kitty[] = [
  { name: "Cirmos", age: 1 },
  { name: "Foltos", age: 3 }
]

// functions
const funnyLog = (element: Kitty, index: number): void => {
  const logText = `${index} - ${element.name}: ${element.age}.`
  console.log(logText)
}

const funnyConvert = (element: Kitty, index: number): string => {
  return `${index} - ${element.name}: ${element.age}.`
}

console.log('Old way:')
for (let i = 0; i < array.length; ++i) {
  funnyLog(array[i], i)
}

console.log('\nArray function way:')
array.forEach((element, index) => {
  funnyLog(element, index)
})

console.log('\nMapping way: (common method in React!)')
const newArray = array.map((element, index) => {
  funnyLog(element, index)
})
