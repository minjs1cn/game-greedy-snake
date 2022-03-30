import { Direction } from './game';
import { Point } from './utils';

/**
 * 蛇身节点
 */
export class SnakeNode extends Point {
  public static create(x: number, y: number) {
    const node = new SnakeNode();
    node.x = x;
    node.y = y;
    return node;
  }
}

/**
 * 贪吃蛇
 */
export class Snake {
  /**
   * 蛇身节点数组
   */
  public body!: SnakeNode[];

  /**
   * 蛇头
   */
  public get head() {
    return this.body[0];
  }

  /**
   * 蛇身长度
   */
  public get size() {
    return this.body.length;
  }

  /**
   * 初始化
   * @param bodyLength 初始蛇身长度
   */
  public init(bodyLength: number) {
    this.body = [];
    for (let i = 0; i < bodyLength; i++) {
      this.prepend(SnakeNode.create(i, 0));
    }
  }

  /**
   * 蛇头下一个位置
   * @param direction
   * @returns
   */
  public getNextPosition(direction: Direction) {
    const { head } = this;
    const nextPosition = new Point();
    nextPosition.x = head.x + direction.x;
    nextPosition.y = head.y + direction.y;
    return nextPosition;
  }

  /**
   * 蛇身生长
   * @param x
   * @param y
   */
  public grow(x: number, y: number) {
    this.append(SnakeNode.create(x, y));
  }

  /**
   * 蛇身减小
   */
  public reduce() {
    this.body.pop();
  }

  /**
   * 尾部增加
   * @param node
   */
  private append(node: SnakeNode) {
    this.body.push(node);
  }

  /**
   * 头部增加
   * @param node
   */
  private prepend(node: SnakeNode) {
    this.body.unshift(node);
  }

  /**
   * 判断是否会发生身体碰撞
   * @param nextPosition
   * @returns
   */
  public isCollision(nextPosition: Point) {
    for (let i = 0; i < this.body.length; i++) {
      const point = this.body[i];
      if (point.x === nextPosition.x && point.y === nextPosition.y) {
        console.error('撞自己了');
        return true;
      }
    }
    return false;
  }

  /**
   * 移动到下一个位置
   * @param nextPosition
   */
  public move(nextPosition: Point) {
    // 加入头
    this.prepend(SnakeNode.create(nextPosition.x, nextPosition.y));
    // 去掉尾
    this.body.pop();
  }
}
