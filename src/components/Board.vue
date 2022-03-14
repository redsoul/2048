<template>
  <div id="game-board" :style="boardStyle">
    <cell v-for="index in gridSize * gridSize" :key="index" />
    <tile
      v-for="tile in tiles"
      :key="tile.index"
      :xCord="tile.x"
      :yCord="tile.y"
      :value="tile.value"
    />
  </div>
</template>

<script>
import Cell from './Cell.vue';
import Tile from './Tile.vue';

export default {
  components: { Cell, Tile },
  data() {
    return {
      cellSize: 20,
      cellGap: 2,
    };
  },
  created() {
    // this.$store.dispatch("setup");
    // window.addEventListener("keydown", this.keydown);
    this.setupInput();
    this.$store.dispatch('setup');
  },
  computed: {
    boardStyle() {
      return {
        '--grid-size': this.gridSize,
        '--cell-size': `${this.cellSize}vmin`,
        '--cell-gap': `${this.cellGap}vmin`,
      };
    },
    gridSize() {
      return this.$store.getters.gridSize;
    },
    tiles() {
      return this.$store.getters.occupiedCells;
    },
    canMoveUp() {
      return this.$store.getters.canMoveUp;
    },
    canMoveDown() {
      return this.$store.getters.canMoveDown;
    },
    canMoveLeft() {
      return this.$store.getters.canMoveLeft;
    },
    canMoveRight() {
      return this.$store.getters.canMoveRight;
    },
  },
  methods: {
    setupInput() {
      window.addEventListener('keydown', this.handleInput, { once: true });
    },
    handleInput(e) {
      switch (e.key) {
        case 'ArrowUp':
          if (this.canMoveUp) {
            this.$store.dispatch('moveUp');
          }
          break;
        case 'ArrowDown':
          if (this.canMoveDown) {
            this.$store.dispatch('moveDown');
          }
          break;
        case 'ArrowLeft':
          if (this.canMoveLeft) {
            this.$store.dispatch('moveLeft');
          }
          break;
        case 'ArrowRight':
          if (this.canMoveRight) {
            this.$store.dispatch('moveRight');
          }
          break;
        default:
          this.setupInput();
      }

      setTimeout(() => {
        this.$store.dispatch('insertRandomTile');
        this.setupInput();
      }, 500);

      if (!this.canMoveUp && !this.canMoveDown && !this.canMoveLeft && !this.canMoveRight) {
        this.$store.dispatch('gameOver');
      }
    },
  },
};
</script>

<style scoped>
#game-board {
  margin: auto 0;
  font-size: calc(var(--cell-size) / 8 * 3);
  background-color: #ccc;
  border-radius: 1vmin;
  display: grid;
  grid-template-rows: repeat(var(--grid-size), var(--cell-size));
  grid-template-columns: repeat(var(--grid-size), var(--cell-size));
  gap: var(--cell-gap);
  padding: var(--cell-gap);
  position: relative;
  user-select: none;
}
</style>
