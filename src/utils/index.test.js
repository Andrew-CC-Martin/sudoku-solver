import { solveBoard, validateBoard } from "."

xdescribe("validateBoard", () => {
  test("It returns false if the board has a digit twice in any row, column, or box", () => {
    const testState = []
    expect(validateBoard(testState)).toBe(false)
  })
})

xdescribe("solveBoard", () => {
  test("It solves a solvable board", () => {
    const testState = []
    const finalState = []
    expect(solveBoard(testState)).toEqual(finalState)
  })

  test("It returns 'false' when there aren't enough squares filled to give a unique solution", () => {
    const testState = []
    expect(solveBoard(testState)).toBe(false)
  })
})
