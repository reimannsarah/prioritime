export default class Day {
  // available is entered in hours and transposed into 15 minute segments
  constructor(available) {
    this.available = available * 4;
    this.activities = {};
  }

  addActivity(activity) {
    this.activities[activity.name] = activity;
  }

  addActivityBlocks(name) {
    this.available--;
    this.activities[name].blocks++;
  }

  subtractActivityBlocks(name) {
    this.available++;
    this.activities[name].blocks--;
  }
}
