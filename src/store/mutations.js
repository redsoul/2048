class Cell {
  constructor(x, y, index, value = null) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.mergeCell = null;
    // this.id = Math.random().toString(36).replace('0.', '');
    this.index = index;
  }

  canAccept(value) {
    return (
      this.value == null
      || (this.mergeCell == null && this.value === value)
    );
  }
}

export default {
  reset(state) {
    state.grid = [];
    for (let i = 0; i < state.board.size * state.board.size; i++) {
      state.grid.push(
        new Cell(i % state.board.size, Math.floor(i / state.board.size), i),
      );
    }
    state.score = 0;
    state.gameOver = false;
    state.gameWon = false;
  },
  insertRandomTile(state, emptyCells) {
    if (emptyCells.length) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      state.grid[emptyCells[randomIndex].index].value = Math.random() > 0.5 ? 2 : 4;
    }
  },
  slideTiles(state, cells) {
    cells.flatMap((group) => {
      for (let i = 1; i < group.length; i++) {
        const cell = group[i];

        if (cell.value === null) {
          // eslint-disable-next-line no-continue
          continue;
        }

        let lastValidCell;
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group[j];
          if (!moveToCell.canAccept(cell.value)) {
            break;
          }
          lastValidCell = moveToCell;
        }

        if (lastValidCell != null) {
          if (lastValidCell.value != null) {
            state.grid[lastValidCell.index].mergeCell = { ...cell };
          } else {
            state.grid[lastValidCell.index].value = cell.value;
          }
          state.grid[cell.index].value = null;
        }
      }
    });
  },
  mergeCell(state, cell) {
    state.grid[cell.index].value += cell.mergeCell.value;
    state.grid[cell.index].mergeCell.value = null;
    state.grid[cell.index].mergeCell = null;
    state.score += state.grid[cell.index].value;
  },
  gameOver(state) {
    state.gameOver = true;
  },
  gameWon(state) {
    state.gameWon = true;
  },
};
