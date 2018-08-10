import Tile from './models/tile';
import GameInitState from './models/game';

export default {
    reset(state) {
        state.game = Object.assign({}, GameInitState);
        for (let x = 0; x < state.game.size; x++) {
            state.grid.push([]);
            for (let y = 0; y < state.game.size; y++) {
                state.grid[x].push(null);
            }
        }
    },
    insertRandomTile(state, availableCells) {
        let randomAvailableCell = (availableCells.length) ? availableCells[Math.floor(Math.random() * availableCells.length)] : null;

        if (availableCells.length) {
            let value = Math.random() < 0.9 ? 2 : 4;

            state.grid[randomAvailableCell.x].splice(randomAvailableCell.y, 1, new Tile(randomAvailableCell, value));
        }
    },
    insertTile(state, tile) {
        if (tile) {
            state.grid[tile.x].splice(tile.y, 1, tile);
        }
    },
    removeTile(state, {x, y}) {
        state.grid[x].splice(y, 1, null);
    },
    // Save all tile positions and remove merger info
    prepareTiles(state) {
        let tile;

        for (let x = 0; x < state.game.size; x++) {
            for (let y = 0; y < state.game.size; y++) {
                tile = state.grid[x][y];

                if (tile) {
                    tile.mergedFrom = null;
                    tile.previousPosition = {x: tile.x, y: tile.y};
                }
            }
        }
    },
    // Move a tile and its representation
    moveTile(state, {tile, position}) {
        const tileClone = Object.assign({}, tile);
        state.grid[tileClone.x].splice(tileClone.y, 1, null);
        state.grid[position.x].splice(position.y, 1, tileClone);
        tileClone.x = position.x;
        tileClone.y = position.y;
    },
    incrementScore(state, score) {
        state.game.score += score;
    },
    setGameWon(state, won) {
        state.game.won = won;
    },
    setGameOver(state, over) {
        state.game.over = over;
    }
};