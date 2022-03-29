export type GameConfig = {
  /** 地图配置 */
  map: {
    /** 地图宽度 */
    width: number;
    /** 地图高度 */
    height: number;
  };
  /** 贪吃蛇配置 */
  snake: {
    /** 蛇身初始长度 */
    bodyLength: number;
  };
};
