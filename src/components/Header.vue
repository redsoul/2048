<template>
  <header class="header">
    <h1 class="title">2048</h1>
    <div class="score-container stat-container">
      <span class="stat-label">Score</span>
      <div class="score">
        <div class="stat-amount score-amount">{{score}}</div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  computed: {
    score() {
      return this.$store.getters.score;
    },
  },
};
</script>
<style scoped>
.header {
  display: flex;
  padding-bottom: 1vmin;
  margin-top: 2.5vmin;
  border-bottom: 1px solid var(--text-color);
  align-items: center;
  gap: 1vmin;
  color: var(--text-color);
  fill: var(--text-color);
}

.title {
  text-align: center;
  margin: 0;
  font-size: max(5vmin, 20px);
  flex-grow: 1;
}
.stat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex-basis: calc(max(10vmin, 70px) + 1vmin);
  flex-shrink: 0;
}
.stat-label {
  font-size: max(2vmin, 10px);
  color: var(--text-color-dark);
  text-align: center;
  line-height: 1.2;
  position: relative;
}
.score {
  position: relative;
}
.score-amount {
  transition: transform 100ms ease-in-out;
  font-size: max(3vmin, 15px);
  font-weight: bold;
  text-align: center;
}
</style>
