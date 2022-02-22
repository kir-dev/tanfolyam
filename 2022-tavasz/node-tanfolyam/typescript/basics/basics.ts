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
const funnyLog = (element, index): string => {
  const logText = `${index} ${element} 🥳`
  console.log(logText)
  return logText
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

const anotherArray = array.map(funnyLog)

// classes
interface ITimeInterval {
  startDate: Date
  endDate: Date
  toFunnyString(): string
}

class TimeInterval implements ITimeInterval {
  private _startDate: Date = new Date()
  private _endDate: Date = new Date()

  get startDate() {
    return this._startDate
  }
  get endDate() {
    return this._startDate
  }

  constructor(date: Date, days: number) {
    this._startDate = date
    this._endDate.setDate(this._startDate.getDate() + days)
  }

  toFunnyString(): string {
    return this._startDate.toString() +
      ' 🤡 ' + this._endDate.toString()
  }
}

const interval = new TimeInterval(new Date(), 10)
console.log(interval.toFunnyString())

// promise


