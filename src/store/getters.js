export default {
  size(state) {
    return state.game.size;
  },
  score(state) {
    return state.game.score;
  },
  gameOver(state) {
    return state.game.over;
  },
  gameWon(state) {
    return state.game.won;
  },
  availableCells(state, getters) {
    const cells = [];

    for (let x = 0; x < getters.size; x++) {
      for (let y = 0; y < getters.size; y++) {
        if (!state.grid[x][y]) {
          cells.push({ x, y });
        }
      }
    }

    return cells;
  },
  occupiedCells(state, getters) {
    const cells = [];

    for (let x = 0; x < getters.size; x++) {
      for (let y = 0; y < getters.size; y++) {
        if (state.grid[x][y]) {
          cells.push(state.grid[x][y]);
        }
      }
    }

    return cells;
  },
  // Check if there are any cells available
  cellsAvailable(state, getters) {
    return !!getters.availableCells.length;
  },
  // Check if the specified cell is taken
  cellAvailable: (state, getters) => (cell) => !getters.cellOccupied(cell),
  cellOccupied: (state, getters) => (cell) => !!getters.cellContent(cell),
  cellContent: (state, getters) => (cell) => {
    if (getters.withinBounds(cell)) {
      return state.grid[cell.x][cell.y];
    }
    return null;
  },
  withinBounds: (state, getters) => (position) => position.x >= 0 && position.x < getters.size
    && position.y >= 0 && position.y < getters.size,
  // Get the vector representing the chosen direction
  getVector: () => (direction) => {
    // Vectors representing tile movement
    const map = {
      3: { x: 0, y: -1 }, // up
      1: { x: 0, y: 1 }, // down
      2: { x: 1, y: 0 }, // right
      0: { x: -1, y: 0 }, // left
    };

    return map[direction];
  },
  // Build a list of positions to traverse in the right order
  buildTraversals: (state) => (vector) => {
    const traversals = { x: [], y: [] };

    for (let pos = 0; pos < state.game.size; pos++) {
      traversals.x.push(pos);
      traversals.y.push(pos);
    }

    // Always traverse from the farthest cell in the chosen direction
    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();

    return traversals;
  },
  findFarthestPosition: (state, getters) => (cell, vector) => {
    let previous;

    // Progress towards the vector direction until an obstacle is found
    do {
      previous = cell;
      // eslint-disable-next-line no-param-reassign
      cell = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (getters.withinBounds(cell) && getters.cellAvailable(cell));

    return {
      farthest: previous,
      next: cell, // Used to check if a merge is required
    };
  },
  positionsEqual: () => (first, second) => first.x === second.x && first.y === second.y,
  movesAvailable(state, getters) {
    return getters.cellsAvailable || getters.tileMatchesAvailable;
  },
  // Check for available matches between tiles (more expensive check)
  tileMatchesAvailable(state, getters) {
    let tile;

    for (let x = 0; x < state.game.size; x++) {
      for (let y = 0; y < state.game.size; y++) {
        tile = getters.cellContent({ x, y });

        if (tile) {
          for (let direction = 0; direction < 4; direction++) {
            const vector = getters.getVector(direction);
            const cell = { x: x + vector.x, y: y + vector.y };
            const other = getters.cellContent(cell);

            if (other && other.value === tile.value) {
              return true; // These two tiles can be merged
            }
          }
        }
      }
    }

    return false;
  },
};
