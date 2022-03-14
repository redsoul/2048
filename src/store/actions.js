export default {
  setup({ commit, dispatch }) {
    commit('reset');
    dispatch('insertRandomTile');
    dispatch('insertRandomTile');
  },
  insertRandomTile({ getters, commit }) {
    commit('insertRandomTile', getters.emptyCells);
  },
  moveUp({ getters, commit, dispatch }) {
    commit('slideTiles', getters.cellsByColumn);
    dispatch('mergeCells');
  },
  moveDown({ getters, commit, dispatch }) {
    commit('slideTiles', getters.cellsByColumnReversed);
    dispatch('mergeCells');
  },
  moveLeft({ getters, commit, dispatch }) {
    commit('slideTiles', getters.cellsByRow);
    dispatch('mergeCells');
  },
  moveRight({ getters, commit, dispatch }) {
    commit('slideTiles', getters.cellsByRowReversed);
    dispatch('mergeCells');
  },
  mergeCells({ getters, commit }) {
    getters.cells.forEach((cell) => {
      if (cell.value == null || cell.mergeCell?.value == null) {
        return;
      }
      commit('mergeCell', cell);
    });
  },
  gameOver({ commit }) {
    commit('gameOver');
  },
  gameWon({ commit }) {
    commit('gameWon');
  },
};
