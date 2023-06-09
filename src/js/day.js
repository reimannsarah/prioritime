export default class Day {
  constructor(name, available) {
    this.name = name;
    this.available = available * 4;
    this.activities = {};
  }

  addActivity(activity) {
    this.activities[activity.name] = activity;
  }

  addActivityBlocks(name) {
    if (this.available > 0) {
      this.available--;
      this.activities[name].blocks++;
    } else {
      return "oh you bad";
    }
  }

  subtractActivityBlocks(name) {
    if (this.activities[name].blocks >0) {
      this.available++;
      this.activities[name].blocks--;
    } else {
      return "aint nobody got time for dat";
    }
  }
}
