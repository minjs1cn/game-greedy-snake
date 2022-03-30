import { GameConfig } from './config';
import { GameMap } from './map';
import { Food, Obstacle, ObstacleManager } from './obstacle';
import { Snake, SnakeNode } from './snake';
import { Point } from './utils';

export type GameObstacle = Pick<Obstacle, 'x' | 'y' | 'type'>;
export type GameSnakeNode = Pick<SnakeNode, 'x' | 'y'>;
/**
 * 运动方向
 */
export class Direction extends Point {
  public static readonly UP = Direction.create(0, -1);
  public static readonly DOWN = Direction.create(0, 1);
  public static readonly LEFT = Direction.create(-1, 0);
  public static readonly RIGHT = Direction.create(1, 0);
  public static readonly LEFT_UP = Direction.create(-1, -1);
  public static readonly RIGHT_UP = Direction.create(1, -1);
  public static readonly LEFT_DOWN = Direction.create(-1, 1);
  public static readonly RIGHT_DOWN = Direction.create(1, 1);

  public static create(x: number, y: number) {
    const direction = new Direction();
    direction.x = x;
    direction.y = y;
    return direction;
  }
}

/**
 * 游戏类
 */
export class Game {
  /** 障碍物管理器 */
  private obstacleManager = new ObstacleManager();

  /** 贪吃蛇 */
  public snake: Snake;
  /** 地图 */
  public map: GameMap;
  /** 运动方向 */
  public direction!: Direction;
  /** 计数 */
  public count!: number;
  /** 配置 */
  private config: GameConfig;

  /** 不允许使用的位置 */
  public get forbiddenPoints() {
    return [...this.body, ...this.obstacles];
  }

  /**
   * 障碍物
   */
  public get obstacles() {
    return this.obstacleManager.obstacles.map((o) => ({
      x: o.x,
      y: o.y,
      type: o.type,
    }));
  }

  /**
   * 蛇身
   */
  public get body() {
    return this.snake.body.map((b) => Point.create(b.x, b.y));
  }

  /**
   * 分数
   */
  public get score() {
    return this.count;
  }

  public constructor(config: GameConfig) {
    this.config = config;
    this.snake = new Snake();
    this.map = new GameMap(this.config.map.width, this.config.map.height);
  }

  /**
   * 添加障碍物
   * @param obstacle
   */
  public addObstacle(obstacle: Obstacle) {
    this.obstacleManager.add(obstacle);
  }

  /**
   * 改变方向
   * @param direction
   */
  public setDirection(direction: Direction) {
    if (
      this.direction.x + direction.x === 0 &&
      this.direction.y + direction.y === 0
    ) {
      // 不允许前后操作方向相反
      return;
    }
    this.direction = direction;
  }

  /**
   * 游戏初始化
   */
  public init() {
    // 计分清零
    this.count = 0;
    // 贪吃蛇初始化
    this.snake.init(this.config.snake.bodyLength);
    // 默认方向
    this.direction = Direction.RIGHT;
    // 障碍物初始化
    if (this.obstacles.length === 0) {
      this.addObstacle(new Food(this));
    }
    this.obstacleManager.init();
  }

  /**
   * 每一帧更新
   * @returns {boolean} false: 游戏结束/true: 游戏继续
   */
  public update() {
    const nextPosition = this.snake.getNextPosition(this.direction);
    // 是否发生地图碰撞
    if (this.map.isCollision(nextPosition)) {
      return false;
    }
    // 是否发生蛇身碰撞
    if (this.snake.isCollision(nextPosition)) {
      return false;
    }
    // 是否发生障碍物碰撞
    const obstacles = this.obstacleManager.isCollision(nextPosition);
    if (obstacles.map((o) => o.consume()).filter((v) => !v).length > 0) {
      return false;
    }
    // 重置障碍物
    obstacles.forEach((o) => o.produce());
    // 移动
    this.snake.move(nextPosition);
    return true;
  }
}
