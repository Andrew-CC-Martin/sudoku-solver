/**
 * Solves the whole board based on the current game state
 * And throws an error if it lacks a unique solution
 * @returns {Array} newState
 */
export const solveBoard = (oldState) => {
  const newState = [...oldState];
  return newState;
};

/**
 * Checks if the board follows the basic rules of sudoku
 * ie no digit may appear more than once per row, column, or 3x3 block
 * @param {Array} state
 * @returns {Boolean}
 */
export const validateBoard = (state) => {
  return true;
};

/**
 * Checks if the square follows the basic rules of sudoku
 * ie no digit may appear more than once per row, column, or 3x3 block
 * For performance reasons, only checks given square
 * againts its own row, column, and block
 * @param {Array} state
 * @returns {Boolean}
 */
export const validateSquare = (newSquare, state) => {
  /**
   * check square against its row
   * - find all squares with the same letter (except self)
   * - check if any have same value
   */
  const row = getRow(newSquare, state);

  const rowValid = validateRow(newSquare, row);
  if (!rowValid) {
    return false;
  }

  // check square against its column
  // check square against its block
  // if we pass all the validations, return true
  return true;
};

/**
 * gets the row for a given square
 */
export const getRow = (newSquare, state) =>
  state.filter(
    (square) =>
      square.location[0] === newSquare.location[0] &&
      square.location !== newSquare.location
  );

/**
 * Validates if a new square's value is already present in a row
 * use Array.prototype.findIndex
 * if it finds it, returns a number > 0 (return false)
 * if it doesn't find it, returns - 1 (return true)
 */
export const validateRow = (newSquare, row) =>
  row.findIndex((rowSquare) => rowSquare.value === newSquare.value) < 0;
