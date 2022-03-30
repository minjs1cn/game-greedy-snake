import { Point } from './utils';

export class GameMap {
  constructor(public readonly width: number, public readonly height: number) {}

  public isCollision(point: Point) {
    const isCollision =
      point.x < 0 ||
      point.y < 0 ||
      point.x >= this.width ||
      point.y >= this.height;
    if (isCollision) {
      console.error('撞墙了');
    }
    return isCollision;
  }
}
