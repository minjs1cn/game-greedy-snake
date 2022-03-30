import { Point } from './utils';

test('Point', () => {
  const point = Point.create(0, 0);
  expect(point.x).toBe(0);
});
