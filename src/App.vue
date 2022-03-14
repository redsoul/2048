<template>
  <overlay v-if="gameOver || gameWon"></overlay>
  <board-header />
  <board />
</template>

<script>
import Board from './components/Board.vue';
import BoardHeader from './components/Header.vue';
// import Score from './components/Score.vue';
import Overlay from './components/Overlay.vue';

export default {
  name: 'app',
  computed: {
    gameOver() {
      return this.$store.getters.gameOver;
    },
    gameWon() {
      return this.$store.getters.gameWon;
    },
  },
  methods: {},
  components: {
    Board,
    BoardHeader,
    // Score,
    Overlay,
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: Arial;
}
:root {
  --modal-background-color: #111;
  --background-color: #333;
  --text-color: #ccc;
  --text-color-light: #fff;
  --text-color-dark: #aaa;
}

body {
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  height: 100vh;
  width: min-content;
  margin: 0 auto;
}
</style>
