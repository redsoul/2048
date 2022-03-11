<template>
  <div class="game-message" :class="{ 'game-over': gameOver, 'game-won': gameWon }">
    <p v-if="gameOver">Game Over</p>
    <p v-if="gameWon">You Won</p>
    <div class="lower">
      <a class="retry-button" v-on:click="tryAgain">Try again</a>
    </div>
  </div>
</template>
<style scoped>
.game-message {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(238, 228, 218, 0.5);
  z-index: 100;
  text-align: center;
  -webkit-animation: fade-in 800ms ease 1200ms;
  -moz-animation: fade-in 800ms ease 1200ms;
  -webkit-animation-fill-mode: both;
  -moz-animation-fill-mode: both;
}

.game-message p {
  font-size: 60px;
  font-weight: bold;
  height: 60px;
  line-height: 60px;
  margin-top: 380px;
}

.game-message .lower {
  display: block;
  margin-top: 59px;
}

.game-message a {
  display: inline-block;
  background: #8f7a66;
  border-radius: 3px;
  padding: 0 20px;
  text-decoration: none;
  color: #f9f6f2;
  height: 40px;
  line-height: 42px;
  margin-left: 9px;
}

.game-message.game-won {
  background: rgba(237, 194, 46, 0.5);
  color: #f9f6f2;
}

.game-message.game-won,
.game-message.game-over {
  display: block;
}
</style>
<script>
export default {
  methods: {
    tryAgain() {
      this.$store.dispatch('setup');
    },
  },
  computed: {
    gameOver() {
      return this.$store.getters.gameOver;
    },
    gameWon() {
      return this.$store.getters.gameWon;
    },
  },
};
</script>
