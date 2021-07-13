import {
  solveBoard,
  validateBoard,
  validateSquare,
  getRow,
  getColumn,
  validateRow,
  validateColumn,
  getBlock,
  validateBlock,
} from ".";
import { game1 } from "../constants/game-states.json";

xdescribe("solveBoard", () => {
  test("It solves a solvable board", () => {
    const testState = [];
    const finalState = [];
    expect(solveBoard(testState)).toEqual(finalState);
  });

  test("It returns 'false' when there aren't enough squares filled to give a unique solution", () => {
    const testState = [];
    expect(solveBoard(testState)).toBe(false);
  });
});

describe("validateBoard", () => {
  test("It returns true for a compliant game board", () => {
    const testState = game1;
    expect(validateBoard(testState)).toBe(true);
  });

  test("It returns false if the board has a digit twice in any row, column, or box", () => {
    const testState = [...game1];
    testState[2] = {
      location: "A3",
      value: "5",
      initial: false,
    };
    expect(validateBoard(testState)).toBe(false);
  });
});

describe("validateSquare", () => {
  test("It returns false if the square has a digit already present in its row, column, or box", () => {
    const newSquare = {
      location: "A3",
      value: "8",
    };
    const testState = game1;
    expect(validateSquare(newSquare, testState)).toBe(false);
  });

  test("It returns true for a compliant square", () => {
    const newSquare = {
      location: "A3",
      value: "1",
    };
    const testState = game1;

    expect(validateSquare(newSquare, testState)).toBe(true);
  });
});

describe("getRow", () => {
  test("It gets the row for a given square (less itself)", () => {
    const testState = game1;
    const newSquare = {
      location: "A3",
      value: "1",
    };
    const row = getRow(newSquare, testState);
    // expect length 8, as row doesn't include the new square
    expect(row.length).toBe(8);
    // expect newSquare to not be in row
    const filtered = row.filter(
      (square) => square.location === newSquare.location
    );
    expect(filtered.length).toBe(0);
  });
});

describe("validateRow", () => {
  test("It returns false if the square's value matches any in the row", () => {
    const newSquare = {
      location: "A3",
      value: "5",
    };

    const testRow = getRow(newSquare, game1);

    expect(validateRow(newSquare, testRow)).toBe(false);
  });

  test("It returns true if the square's value doesn't match any in the row", () => {
    const newSquare = {
      location: "A3",
      value: "1",
    };
    const testRow = getRow(newSquare, game1);

    expect(validateRow(newSquare, testRow)).toBe(true);
  });
});

describe("getColumn", () => {
  test("It gets the column for a given square (less itself)", () => {
    const testState = game1;
    const newSquare = {
      location: "A3",
      value: "1",
    };
    const column = getColumn(newSquare, testState);
    // expect length 8, as row doesn't include the new square
    expect(column.length).toBe(8);
    // expect newSquare to not be in row
    const filtered = column.filter(
      (square) => square.location === newSquare.location
    );
    expect(filtered.length).toBe(0);
  });
});

describe("validateColumn", () => {
  test("It returns false if the square's value matches any in the column", () => {
    const newSquare = {
      location: "A3",
      value: "8",
    };

    const testColumn = getColumn(newSquare, game1);

    expect(validateColumn(newSquare, testColumn)).toBe(false);
  });

  test("It returns true if the square's value doesn't match any in the column", () => {
    const newSquare = {
      location: "A3",
      value: "1",
    };
    const testColumn = getColumn(newSquare, game1);

    expect(validateColumn(newSquare, testColumn)).toBe(true);
  });
});

describe("getBlock", () => {
  test("It gets an Array, representing the block for a given square", () => {
    const testState = game1;
    const newSquare = {
      location: "A3",
      value: "1",
    };
    const block = getBlock(newSquare, testState);
    // expect length 8, as row doesn't include the new square
    expect(block.length).toBe(8);
    // expect newSquare to not be in row
    const filtered = block.filter(
      (square) => square.location === newSquare.location
    );
    expect(filtered.length).toBe(0);
  });
});

describe("validateBlock", () => {
  test("It returns false if a square's value is already present in its block", () => {
    const newSquare = {
      location: "A3",
      value: "6",
    };
    const testBlock = getBlock(newSquare, game1);

    expect(validateBlock(newSquare, testBlock)).toBe(false);
  });

  test("It returns true if a square's value is not present in its block", () => {
    const newSquare = {
      location: "A3",
      value: "1",
    };
    const testBlock = getBlock(newSquare, game1);

    expect(validateBlock(newSquare, testBlock)).toBe(true);
  });
});
