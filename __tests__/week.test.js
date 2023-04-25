import Week from '../src/week.js';
import Day from '../src/day.js';

describe('Week', () => {
  let newWeek;
  let monday;

  beforeEach(()=> {
    newWeek = new Week();
    monday = new Day("monday", 6);
  })
  test('it should create a new instance of week with keys that correspond to the days of the week', () => {
    expect(newWeek).toEqual({"monday":{"monday": {"activities": {}, "available": 24, "name": "monday"}},"tuesday":{},"wednesday":{},"thursday":{},"friday":{},"saturday":{},"sunday":{}});
  });

  // test('it should add monday to the monday key in the week object', () => {
  //   console.log(monday.name);
  //   newWeek.addDay(monday);
  //   expect(newWeek).toEqual({"monday": {"monday": {"activities": {}, "available": 24, "name": "monday"}}});
  // })
});