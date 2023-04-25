export default class Week {
  constructor() {
    this.aMonday = {};
    this.bTuesday = {};
    this.cWednesday = {};
    this.dThursday = {};
    this.eFriday = {};
    this.fSaturday = {};
    this.gSunday = {};
  }

  addDay(day) {
    if (day.name === "monday") {
      this.aMonday = day;
    }else if (day.name === "tuesday") {
      this.bTuesday = day;
    }else if (day.name === "wednesday") {
      this.cWednesday = day;
    }else if (day.name === "thursday") {
      this.dThursday = day;
    }else if (day.name === "friday") {
      this.eFriday = day;
    }else if (day.name === "saturday") {
      this.fSaturday = day;
    }else if (day.name === "sunday") {
      this.gSunday = day;
    }
  }
}