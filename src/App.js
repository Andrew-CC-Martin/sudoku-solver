import { useState } from 'react'

import initialStates from "./constants/initial-states.json"
import { digits } from "./constants/constants"
import { solveBoard, validateBoard } from './utils'
import './App.css'

// const { blank } = initialStates
const { game1 } = initialStates

export const App = () => {
  const [squares, setSquares] = useState(game1)

  const updateSquare = (e, _location, index) => {
    // get number from the input
    let newValue = e.target.value.trim()

    // if the field is already filled, only take the new value
    if (newValue.length > 1) {
      newValue = newValue[1]
    }
    // check it's a digit 1-9
    if (!digits.includes(newValue)) {
      // if not, reject
      return null
    }

    // set value in state, pending validation
    setSquares((prevState) => {
      const newState = [...prevState]
      // update the square by creating a new object, so we don't mutate the old nested object
      newState[index] = {
        location: prevState[index].location,
        value: newValue,
      }
      const isValid = validateBoard(newState)

      // if the new square is valid, then allow it
      if (isValid) {
        return (newState)
      }

      // else, just return the previous state
      return prevState
    })
  }

  return (
    <>
      <h1>Sudoku Solver</h1>
      <div className="board">
        {squares.map(({ location, value }, index) => (
          <input className={`square ${location[0]}`} key={location} type="text" value={value} onChange={(e, location) => updateSquare(e, location, index)} />
        ))}
      </div>
      <button onClick={solveBoard}>Solve</button>
    </>
  )
}
