const timeInterval = {
    startDate: new Date(),
    endDate: new Date()
};
console.log(`Hihi: ${this._startDate.toISOString()}
${this._endDate.toISOString()}`);
class TimeInterval {
    _startDate = new Date();
    _endDate = new Date();
    get startDate() {
        return this._startDate;
    }
    get endDate() {
        return this._startDate;
    }
    constructor(date, days) {
        this._startDate = date;
        this._endDate.setDate(this._startDate.getDate() + days);
    }
    toFunnyString() {
        return `Hihi: ${this._startDate.toISOString()}
      ${this._endDate.toISOString()}`;
    }
}
const interval = new TimeInterval(new Date(), 10);
// console.log(interval.toFunnyString())
