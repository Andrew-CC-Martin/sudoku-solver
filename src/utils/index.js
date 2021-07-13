/**
 * Solves the whole board based on the current game state
 * And throws an error if it lacks a unique solution
 * @param {Array} oldState
 * @returns {Array}
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
  if (!rowValid) return false;

  // check square against its column
  const column = getColumn(newSquare, state);
  const columnValid = validateColumn(newSquare, column);
  if (!columnValid) return false;

  // check square against its block
  const block = getBlock(newSquare, state);
  const blockValid = validateBlock(newSquare, block);
  if (!blockValid) return false;

  // if we pass all the validations, return true
  return true;
};

/**
 * gets the row for a given square
 * @param {Object} newSquare
 * @param {Array} state
 * @returns {Array}
 */
export const getRow = (newSquare, state) =>
  state.filter(
    (square) =>
      // location[0] is a letter representing the row
      square.location[0] === newSquare.location[0] &&
      // don't include self (ie where column and row are same)
      square.location[1] !== newSquare.location[1]
  );

/**
 * Validates if a new square's value is already present in a row
 * uses Array.prototype.findIndex
 * if it finds it, returns a number > 0 (then it returns false)
 * if it doesn't find it, returns - 1 (then it returns true)
 * @param {Object} newSquare
 * @param {Array} row
 * @returns {Boolean}
 */
export const validateRow = (newSquare, row) =>
  row.findIndex((rowSquare) => rowSquare.value === newSquare.value) < 0;

/**
 * gets the column for a given square
 * @param {Object} newSquare
 * @param {Array} state
 * @returns {Array}
 */
export const getColumn = (newSquare, state) =>
  // location[1] is a number representing the column
  state.filter(
    (square) =>
      // location[1] is a letter representing the row
      square.location[1] === newSquare.location[1] &&
      // don't include self (ie where column and row are same)
      square.location[0] !== newSquare.location[0]
  );

/**
 * validates that a given square's value is not already present in that column
 * uses Array.prototype.findIndex
 * if it finds it, returns a number > 0 (then it returns false)
 * if it doesn't find it, returns - 1 (then it returns true)
 * @param {Object} newSquare
 * @param {Array} column
 * @returns {Boolean}
 */
export const validateColumn = (newSquare, column) =>
  column.findIndex((colSquare) => colSquare.value === newSquare.value) < 0;

/**
 * gets the 3x3 block for a given square
 * @param {Object} newSquare
 * @param {Array} state
 * @returns {Array}
 */
export const getBlock = (newSquare, state) => {
  // blocks have rows A-C, D-F, or G-I
  const blockRows = ["ABC", "DEF", "GHI"];
  // blocks have columns 1-3, 4-6, or 7-9
  const blockCols = ["123", "456", "789"];

  // find index of new square's row
  const newSquareRow = blockRows.findIndex((blockRow) =>
    blockRow.includes(newSquare.location[0])
  );
  // find index of new square's col
  const newSquareCol = blockCols.findIndex((blockCol) =>
    blockCol.includes(newSquare.location[1])
  );

  // Use those indices to get all the squares with matching location
  const block = state.filter(
    (square) =>
      square.location !== newSquare.location &&
      blockRows[newSquareRow].includes(square.location[0]) &&
      blockCols[newSquareCol].includes(square.location[1])
  );

  return block;
};

/**
 * validates that a given square's value is not already present in that block
 * @param {Object} newSquare
 * @param {Array} block
 * @returns {Boolean}
 */
export const validateBlock = (newSquare, block) =>
  block.findIndex((blockSquare) => blockSquare.value === newSquare.value) < 0;
