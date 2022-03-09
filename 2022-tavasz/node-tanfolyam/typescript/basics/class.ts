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
    return `Hihi: ${this._startDate.toISOString()}
      ${this._endDate.toISOString()}`
  }
}

const interval = new TimeInterval(new Date(), 10)
console.log(interval.toFunnyString())
