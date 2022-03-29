import { Game } from "./game";
import { getRandomPoint, Point } from "./utils";

/**
 * 障碍物抽象类
 */
export abstract class Obstacle extends Point {
  /**
   * 障碍物类型
   */
  public abstract type: string;
  /**
   * 障碍物生成，一般是设置障碍物的位置
   */
  public abstract produce(): void;
  /**
   * 障碍物消费，一般是障碍物和蛇头发生碰撞之后，要做的事情；
   * 返回值决定了是否继续游戏，true表示继续，false表示结束游戏
   */
  public abstract consume(): boolean;

  public constructor(protected game: Game) {
    super();
  }

  /**
   * 随机生成一个合法的位置
   * @returns
   */
  public getRandomPoint() {
    const { game } = this;
    const points = game.forbiddenPoints;
    const point = getRandomPoint(game.map.width, game.map.height, points);
    return point;
  }
}

/**
 * 食物
 */
export class Food extends Obstacle {
  public type = "food";

  public produce() {
    const point = this.getRandomPoint();
    this.x = point.x;
    this.y = point.y;
  }

  public consume() {
    // 吃掉食物，蛇身长度加1
    this.game.snake.grow(this.x, this.y);
    // 计数加1
    this.game.count++;
    return true;
  }
}

/**
 * 障碍物管理器
 */
export class ObstacleManager {
  public obstacles: Obstacle[] = [];

  /**
   * 添加障碍物
   * @param obstacle
   */
  public add(obstacle: Obstacle) {
    this.obstacles.push(obstacle);
  }

  /**
   * 发生碰撞的障碍物
   * @param point
   * @returns
   */
  public isCollision(point: Point) {
    return this.obstacles.filter((o) => o.x === point.x && o.y === point.y);
  }

  public init() {
    this.obstacles.forEach((o) => o.produce());
  }
}
