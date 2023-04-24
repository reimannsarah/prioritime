export default class Day {
  constructor(available) {
    this.available = available;
    this.sections = {};
    this.sectionId = 0;
  }

  addActivity(activity) {
    this.sections[this.assignSectionId()] = activity;
  }

  assignSectionId() {
    this.sectionId++;
    return this.sectionId;
  }

}
