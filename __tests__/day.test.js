import Day from "../src/day";

describe('Day', () => {

  test('it should add an activity with a unique id to the Day object', () => {
    let monday = new Day(6);
    monday.addActivity("salad");
    expect(monday.sections).toEqual({ 1: "salad" });
  });
});