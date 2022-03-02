let foo: number = 5

function bar(param: string): void {
  console.log(param)
}

async function baz() {
  return 'hello world'
}

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
  const logText = `${index} ${element.name}: ${element.age} 🥳`
  console.log(logText)
}

const funnyConvert = (element: Kitty, index: number): string => {
  return `${index} ${element.name}: ${element.age}.`
}

for (let i = 0; i < array.length; ++i) {
  funnyLog(array[i], i)
}

array.forEach((element, index) => {
  funnyLog(element, index)
})

const newArray = array.map((element, index) => {
  funnyLog(element, index)
})

const anotherArray = array.map(funnyConvert)

