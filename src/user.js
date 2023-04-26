export default class User {
  constructor(name) {
    this.name = name;
    this.weeks = {};
  }
  addWeek(week) {
    this.weeks[week.name] = week;
  }
}