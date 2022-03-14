<template>
  <div class="tile" :style="tileStyle">{{value}}</div>
</template>
<script>
export default {
  props: {
    value: {
      type: [Number, null],
      required: true,
      validator(value) {
        return value === null || Number.isInteger(Math.log2(value));
      },
    },
    xCord: {
      type: [Number],
      required: true,
      validator(value) {
        return value >= 0;
      },
    },
    yCord: {
      type: [Number],
      required: true,
      validator(value) {
        return value >= 0;
      },
    },
  },
  computed: {
    backgroundLightness() {
      return 100 - Math.log2(this.value) * 9;
    },
    tileStyle() {
      return {
        '--background-lightness': `${this.backgroundLightness}%`,
        '--text-lightness': `${this.backgroundLightness <= 50 ? 90 : 10}%`,
        '--x': this.xCord,
        '--y': this.yCord,
        '--pop-duration': '200ms',
        '--pop-magnitude': Math.log2(this.value),
      };
    },
  },
};
</script>
<style scoped>
.tile {
  --color-offset: calc(var(--power) * 7%);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsl(200, 50%, var(--background-lightness));
  color: hsl(200, 25%, var(--text-lightness));
  border-radius: 1vmin;
  transition: top 100ms ease-in-out, left 100ms ease-in-out, right 100ms ease-in-out,
    bottom 100ms ease-in-out;
  top: calc(var(--y) * (var(--cell-size) + var(--cell-gap)) + var(--cell-gap));
  left: calc(var(--x) * (var(--cell-size) + var(--cell-gap)) + var(--cell-gap));
  width: var(--cell-size);
  height: var(--cell-size);
  font-weight: bold;
}

.tile[data-animation=show] {
    animation: show 200ms ease-in-out
}

.tile[data-animation=pop] {
    --pop-scale: calc(1 + .03 * var(--pop-magnitude));
    animation: pop var(--pop-duration, 0ms) ease-in-out alternate 2
}

@keyframes show {
  0% {
    opacity: 0.5;
    transform: scale(0);
  }
}

@keyframes pop {
    to {
        transform: scale(var(--pop-scale))
    }
}
</style>
