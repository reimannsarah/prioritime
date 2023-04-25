import Activity from "../src/activity";
import Day from "../src/day";

describe('Day', () => {
  let monday;
  let activity;
  let available;

  beforeEach(() => {
    available = 5;
    monday = new Day("monday", available);
    activity = new Activity("salad");
    monday.addActivity(activity);
  });

  test('it should add an activity with a unique id to the Day object', () => {
    expect(monday.activities).toEqual({ "salad": { name: "salad", blocks: 0 } });
  });

  test('it should add one to activity block and subtract one from day availble', () => {
    monday.addActivityBlocks("salad");
    expect(monday.available).toEqual(19);
    expect(monday.activities["salad"].blocks).toEqual(1);
  });

  test('it should subtract one from activity block and add one to day available', () => {
    monday.addActivityBlocks("salad");
    monday.subtractActivityBlocks("salad");
    expect(monday.available).toEqual(20);
    expect(monday.activities["salad"].blocks).toEqual(0);
  });

  test('it should check if there are available blocks when addActivityBlocks()', () => {
    monday.available = 0;
    monday.addActivityBlocks("salad");
    expect(monday.available).toEqual(0);
  });

  test('it should check if there are available blocks when subtractActivityBlocks()', () => {
    monday.activities["salad"].blocks = 0;
    monday.subtractActivityBlocks("salad");
    expect(monday.activities["salad"].blocks).toEqual(0);
  });
});