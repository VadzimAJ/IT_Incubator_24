

const _state = {

  settimgs: {
    gridSize: {
      rowsCount: 4,
      columnsCount: 4
    }
  },
  positions: {
    google: {x: 0, y: 1},
    players: [
      { x: 2, y: 2},
      { x: 3, y: 3}
    ]
  },
  points: {
    google: 33,
    players: [11, 22]
  }
}

function _getPlayerIndexByNumber (playerNumber) {
  const playerIndex = playerNumber - 1;

  if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
    throw new Error ('Incorrect player number')
  }

  return playerIndex
}

//INTERFECE|ADAPTER
export function getGooglePoints () {
  return _state.points.google
}


/**
 *@param {number} playerNumber - one-based index of player
 *@returns {Promise<number>} number of points

 */

  export async function getPlayerPoints (playerNumber) {
    const playerIndex = _getPlayerIndexByNumber(playerNumber)

    return _state.points.players[playerIndex]
}


export async function getGridSize () {
  return {..._state.settimgs.gridSize}
}

export async function getGooglePosition() {
  return {..._state.positions.google}
}


export async function getPlayerPosition(playerNumber) {
  const playerIndex = _getPlayerIndexByNumber(playerNumber)

  return {..._state.positions.players[playerIndex]}
}

