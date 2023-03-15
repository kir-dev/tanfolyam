// interfaces
interface Kitty {
  name: string
  age?: number
}

const array: Kitty[] = [
  { name: "Cirmos", age: 1 },
  { name: "Foltos" }
]

// functions
function funnyLog(element: Kitty, index: number): void {
  console.log(`${index} - ${element.name}: ${element.age ?? 'Újszülött'}.`)
}

const funnyConvert = (element: Kitty, index: number): string => {
  return `${index} - ${element.name}: ${element.age ?? 'Újszülött'}.`
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
  return funnyConvert(element, index)
})
console.log(newArray)
