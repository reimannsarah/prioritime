import { Week } from '../src/week.js';

describe('Week', () => {
  test('it should create a new instance of week with keys that correspond to the days of the week', () => {
    let newWeek = new Week();
    expect(newWeek).toEqual({"monday":{},"tuesday":{},"wednesday":{},"thursday":{},"friday":{},"saturday":{},"sunday":{}});
  })
});