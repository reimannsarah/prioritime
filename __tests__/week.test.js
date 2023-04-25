import { Week } from '../src/week.js';

describe('Week', () => {
  test('it should create a new instance of week one key of Monday', () => {
    let newWeek = new Week();
    expect(newWeek).toEqual({"monday":{}});
  })
});