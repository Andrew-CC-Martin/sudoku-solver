import {
  solveBoard,
  validateBoard,
  validateSquare,
  getRow,
  validateRow,
} from ".";
import { game1 } from "../constants/game-states.json";

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

describe("validateSquare", () => {
  xtest("It returns false if the square has a digit already present in its row, column, or box", () => {
    const testState = game1;
    expect(validateSquare(testState)).toBe(false);
  });

  xtest("It returns true for a compliant square", () => {
    const newSquare = {
      location: "A3",
      value: "1",
    };
    const testState = game1;

    expect(validateSquare(newSquare, testState)).toBe(true);
  });
});

xdescribe("validateBoard", () => {
  test("It returns false if the board has a digit twice in any row, column, or box", () => {
    const testState = game1;
    expect(validateBoard(testState)).toBe(true);
  });

  xtest("It returns true for a compliant game board", () => {
    const testState = [];
    expect(validateBoard(testState)).toBe(false);
  });
});

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
