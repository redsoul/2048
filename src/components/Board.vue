<template>
  <div class="game-container">
    <div class="grid-container" v-on:keydown="keydown">
      <div class="grid-row" v-for="row in size" :key="row">
        <div class="grid-cell" v-for="column in size" :key="column"></div>
      </div>
    </div>
    <div class="tile-container">
      <div
        class="tile"
        :class="[
          'tile-' + tile.value,
          'tile-position-' + (tile.x + 1) + '-' + (tile.y + 1),
        ]"
        v-for="(tile, index) in tiles"
        :key="index"
      >
        {{ tile.value }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  position: absolute;
  z-index: 1;
}

.grid-row {
  margin-bottom: 15px;
}

.grid-row:last-child {
  margin-bottom: 0;
}

.grid-row:after {
  content: "";
  display: block;
  clear: both;
}

.grid-cell {
  width: 106.25px;
  height: 106.25px;
  margin-right: 15px;
  float: left;
  border-radius: 3px;
  background: rgba(238, 228, 218, 0.35);
}

.grid-cell:last-child {
  margin-right: 0;
}

.tile-container {
  position: absolute;
  z-index: 2;
}

.tile-container .tile {
  width: 106.25px;
  height: 106.25px;
  border-radius: 3px;
  background: #eee4da;
  text-align: center;
  font-weight: bold;
  z-index: 10;
  font-size: 55px;
  line-height: 106px;
  -webkit-transition: 100ms ease-in-out;
  -moz-transition: 100ms ease-in-out;
  -webkit-transition-property: top, left;
  -moz-transition-property: top, left;
}

.tile.tile-position-1-1 {
  position: absolute;
  left: 0;
  top: 0;
}

.tile.tile-position-2-1 {
  position: absolute;
  left: 0;
  top: 121px;
}

.tile.tile-position-3-1 {
  position: absolute;
  left: 0;
  top: 243px;
}

.tile.tile-position-4-1 {
  position: absolute;
  left: 0;
  top: 364px;
}

.tile.tile-position-1-2 {
  position: absolute;
  left: 121px;
  top: 0;
}

.tile.tile-position-2-2 {
  position: absolute;
  left: 121px;
  top: 121px;
}

.tile.tile-position-3-2 {
  position: absolute;
  left: 121px;
  top: 243px;
}

.tile.tile-position-4-2 {
  position: absolute;
  left: 121px;
  top: 364px;
}

.tile.tile-position-1-3 {
  position: absolute;
  left: 243px;
  top: 0;
}

.tile.tile-position-2-3 {
  position: absolute;
  left: 243px;
  top: 121px;
}

.tile.tile-position-3-3 {
  position: absolute;
  left: 243px;
  top: 243px;
}

.tile.tile-position-4-3 {
  position: absolute;
  left: 243px;
  top: 364px;
}

.tile.tile-position-1-4 {
  position: absolute;
  left: 364px;
  top: 0;
}

.tile.tile-position-2-4 {
  position: absolute;
  left: 364px;
  top: 121px;
}

.tile.tile-position-3-4 {
  position: absolute;
  left: 364px;
  top: 243px;
}

.tile.tile-position-4-4 {
  position: absolute;
  left: 364px;
  top: 364px;
}

.tile.tile-2 {
  background: #eee4da;
  box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0), inset 0 0 0 1px rgba(255, 255, 255, 0);
}

.tile.tile-4 {
  background: #eee1c9;
  box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0), inset 0 0 0 1px rgba(255, 255, 255, 0);
}

.tile.tile-8 {
  color: #f9f6f2;
  background: #f3b27a;
}

.tile.tile-16 {
  color: #f9f6f2;
  background: #f69664;
}

.tile.tile-32 {
  color: #f9f6f2;
  background: #f77c5f;
}

.tile.tile-64 {
  color: #f9f6f2;
  background: #f75f3b;
}

.tile.tile-128 {
  color: #f9f6f2;
  background: #edd073;
  box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.2380952381),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1428571429);
  font-size: 45px;
}

@media screen and (max-width: 480px) {
  .tile.tile-128 {
    font-size: 25px;
  }
}

.tile.tile-256 {
  color: #f9f6f2;
  background: #edcc62;
  box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.3174603175),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1904761905);
  font-size: 45px;
}

@media screen and (max-width: 480px) {
  .tile.tile-256 {
    font-size: 25px;
  }
}

.tile.tile-512 {
  color: #f9f6f2;
  background: #edc950;
  box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.3968253968),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2380952381);
  font-size: 45px;
}

@media screen and (max-width: 480px) {
  .tile.tile-512 {
    font-size: 25px;
  }
}

.tile.tile-1024 {
  color: #f9f6f2;
  background: #edc53f;
  box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.4761904762),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2857142857);
  font-size: 35px;
}

@media screen and (max-width: 480px) {
  .tile.tile-1024 {
    font-size: 15px;
  }
}

.tile.tile-2048 {
  color: #f9f6f2;
  background: #edc22e;
  box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.5555555556),
    inset 0 0 0 1px rgba(255, 255, 255, 0.3333333333);
  font-size: 35px;
}

@media screen and (max-width: 480px) {
  .tile.tile-2048 {
    font-size: 15px;
  }
}
</style>

<script>
const keyMap = {
  37: 3, // Left
  38: 0, // Up
  39: 1, // Right
  40: 2, // Down
};

export default {
  created() {
    this.$store.dispatch('setup');
    window.addEventListener('keydown', this.keydown);
  },
  computed: {
    size() {
      return this.$store.getters.size;
    },
    tiles() {
      return this.$store.getters.occupiedCells.filter((tile) => tile.value);
    },
  },
  methods: {
    // eslint-disable-next-line
    keydown(event) {
      const modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
      const direction = keyMap[event.which];

      if (!modifiers) {
        if (direction !== undefined) {
          event.preventDefault();
          this.$store.dispatch('move', direction);
        }

        if (event.which === 32) {
          this.$store.dispatch('setup');
        }
      }
    },
  },
};
</script>
