# 经典贪吃蛇

抽象游戏逻辑，把渲染和玩法扩展交给其他开发者，毕竟核心逻辑是不变的，UI 是千变万化的。

## Usage

```vue
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import hotkeys from "hotkeys-js";

import {
  Game,
  Direction,
  Obstacle,
  GameObstacle,
  GameSnakeNode,
} from "@game/greedy-snake";
const game = new Game({
  map: {
    width: 30,
    height: 25,
  },
  snake: {
    bodyLength: 3,
  },
});
/**
 * 炸弹
 */
class Bomb extends Obstacle {
  public type = "bomb";

  public produce() {
    const point = this.getRandomPoint();
    this.x = point.x;
    this.y = point.y;
  }

  public consume() {
    // 炸弹爆炸，蛇身长度减1
    this.game.snake.reduce();
    // 计数减1
    this.game.count--;
    return true;
  }
}

// game.addObstacle(new Bomb(game));
game.init();

(window as any).game = game;

const { width, height } = game.map;

const map = new Array(width * height);

const g = reactive<{
  body: GameSnakeNode[];
  obstacles: GameObstacle[];
}>({
  body: [],
  obstacles: [],
});

let started = true;

const onStart = () => {
  game.init();
  started = true;
};

console.log(game);

onMounted(() => {
  setInterval(() => {
    if (!started) {
      return;
    }
    const success = game.update();
    if (!success) {
      started = false;
    }

    g.body = game.body;
    g.obstacles = game.obstacles;
  }, 300);

  hotkeys("w", function () {
    game.setDirection(Direction.UP);
  });
  hotkeys("s", function () {
    game.setDirection(Direction.DOWN);
  });
  hotkeys("a", function () {
    game.setDirection(Direction.LEFT);
  });
  hotkeys("d", function () {
    game.setDirection(Direction.RIGHT);
  });
});
</script>

<template>
  <div>
    <h1>{{ game.count }}</h1>
    <button @click="onStart">start</button>
    <div
      :style="{
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        width: `${width * 20}px`,
        height: `${height * 20}px`,
      }"
    >
      <div
        :key="index"
        v-for="(_, index) in map"
        style="width: 20px; border: 1px solid #ccc; box-sizing: border-box"
      ></div>
      <div
        :key="index"
        v-for="(item, index) in g.body"
        :style="{
          position: 'absolute',
          width: '20px',
          height: '20px',
          left: `${item.x * 20}px`,
          top: `${item.y * 20}px`,
          backgroundColor: index === 0 ? 'black' : 'blue',
        }"
      ></div>
      <div
        :key="index"
        v-for="(item, index) in game.obstacles"
        :style="{
          position: 'absolute',
          width: '20px',
          height: ' 20px',
          left: `${item.x * 20}px`,
          top: `${item.y * 20}px`,
          backgroundColor: item.type === 'food' ? 'green' : 'yellow',
        }"
      ></div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
```
