

const _state = {

  settimgs: {
    gridSize: {
      rowsCount: 4,
      columnsCount: 4
    }
  },
  positions: {
    google: {
      x: 1, y: 1
    },
    players: [
      {},
      {}
    ]
  },
  points: {
    google: 33,
    players: [11,22]
  }
}

export function getGooglePoints () {
  return _state.points.google
}


/**
 *@param {number} playerNumber - one-based index of player
 *@returns {Promise<number>} number of points

 */
export async function getPlayerPoints (playerNumber) {
  const playerIndex = playerNumber  - 1;

  // if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
  //   alert ('Bullshit!')
  // }

  return _state.points.players[playerNumber]
}


export async function getGridSize () {
  return {..._state.settimgs.gridSize}
}