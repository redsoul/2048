import Tile from './models/tile'

export default {
    // Set up the initial tiles to start the game with
    setup({state, getters, commit}) {
        commit('reset');

        for (let i = 0; i < state.game.startTiles; i++) {
            commit('insertRandomTile', getters.availableCells);
        }
    },
    move({state, getters, commit}, direction) {
        // 0: up, 1: right, 2:down, 3: left
        if (state.game.over || state.game.won) return; // Don't do anything if the game's over

        let cell;
        let tile;

        const vector = getters.getVector(direction);
        const traversals = getters.buildTraversals(vector);
        let moved = false;

        commit('prepareTiles');

        // Traverse the grid in the right direction and move tiles
        traversals.x.forEach((x) => {
            traversals.y.forEach((y) => {
                cell = {x: x, y: y};
                tile = getters.cellContent(cell);

                if (tile) {
                    let positions = getters.findFarthestPosition(cell, vector);
                    let next = getters.cellContent(positions.next);

                    // Only one merger per row traversal?
                    if (next && next.value === tile.value && !next.mergedFrom) {
                        let merged = new Tile(positions.next, tile.value * 2);
                        merged.mergedFrom = [tile, next];

                        commit('insertTile', merged);
                        commit('removeTile', tile);

                        moved = true;

                        // Update the score
                        commit('incrementScore', merged.value);

                        // The mighty 2048 tile
                        if (merged.value === 2048) {
                            commit('setGameWon', true);
                            return false;
                        }
                    } else if (!getters.positionsEqual(positions.farthest, tile)) {
                        commit('moveTile', {tile, position: positions.farthest});
                        moved = true;
                    }
                }
            });
        });

        if (moved) {
            commit('insertRandomTile', getters.availableCells);

            if (!getters.movesAvailable) {
                commit('setGameOver', true);
            }
        }
    }
};