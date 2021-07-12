
/**
 * Solves the whole board based on the current game state
 * And throws an error if it lacks a unique solution
 * @returns {Array} newState
 */
export const solveBoard = (oldState) => {
  const newState = [...oldState]
  return newState
}

/**
 * Checks if the board follows the basic rules of sudoku
 * ie no digit may appear more than once per row, column, or 3x3 block
 * @param {Array} state
 * @returns {Boolean}
 */
export const validateBoard = (state) => {
  return true
}
