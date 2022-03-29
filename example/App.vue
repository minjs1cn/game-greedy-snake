<script setup lang="ts">
import { onMounted, reactive } from "vue";
import hotkeys from "hotkeys-js";

import {
  Game,
  Direction,
  Food,
  Obstacle,
  GameObstacle,
  GameSnakeNode,
} from "../src";
const game = new Game({
  map: {
    width: 20,
    height: 20,
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
    // 初始长度为3
    if (this.game.count > 3) {
      // 炸弹爆炸，蛇身长度减1
      this.game.snake.reduce();
      // 计数减1
      this.game.count--;
    }
    return true;
  }
}

game.addObstacle(new Food(game));
game.addObstacle(new Bomb(game));
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

const onUp = function () {
  game.setDirection(Direction.UP);
};

const onLeft = function () {
  game.setDirection(Direction.LEFT);
};

const onDown = function () {
  game.setDirection(Direction.DOWN);
};

const onRight = function () {
  game.setDirection(Direction.RIGHT);
};

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
  }, 200);

  hotkeys("w", onUp);
  hotkeys("a", onLeft);
  hotkeys("s", onDown);
  hotkeys("d", onRight);
});
</script>

<template>
  <div style="text-align: center">
    <h1>得分：{{ game.count }}</h1>
    <div
      :style="{
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        width: `${width * 20}px`,
        height: `${height * 20}px`,
        margin: '0 auto',
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
    <button style="margin-top: 16px" class="btn" @click="onUp">w</button>
    <div>
      <button class="btn" @click="onLeft">a</button>
      <button class="btn" @click="onDown">s</button>
      <button class="btn" @click="onRight">d</button>
    </div>
    <button class="btn" @click="onStart">restart</button>
    <section>
      <p>键盘 w a s d 控制移动</p>
      <p>蛇头黑色，蛇身蓝色</p>
      <p>绿色是食物，黄色为炸弹</p>
    </section>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.btn {
  background-color: #3498db;
  border: none;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
}
</style>
