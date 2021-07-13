import { useEffect, useState } from "react";

import initialStates from "./constants/game-states.json";
import { digits } from "./constants/constants";
import { solveBoard, validateBoard, validateSquare } from "./utils";
import "./App.css";

// const { blank } = initialStates
const { game1 } = initialStates;

export const App = () => {
  const [squares, setSquares] = useState(game1);

  // on component load, initialise using local storage if it's available
  useEffect(() => {
    const saved = localStorage.getItem("sudokuBoard");
    if (saved) {
      // setSquares(saved)
      setSquares(JSON.parse(saved));
    }
  }, []);

  // whenever the board game updates, save it to local storage
  useEffect(() => {
    localStorage.setItem("sudokuBoard", JSON.stringify(squares));
  }, [squares]);

  const reset = () => setSquares(game1);

  const updateSquare = (e, _location, index) => {
    // get number from the input
    let newValue = e.target.value.trim();

    // if the field is already filled, only take the new value
    if (newValue.length > 1) {
      newValue = newValue[1];
    }
    // allow empty newValue (so squares can be deleted)
    // and check it's a digit 1-9
    if (newValue.length !== 0 && !digits.includes(newValue)) {
      // if not, reject
      return null;
    }

    // set value in state, pending validation
    setSquares((prevState) => {
      const newState = [...prevState];
      // update the square by creating a new object, so we don't mutate the old nested object
      const newSquare = {
        location: prevState[index].location,
        value: newValue,
      };
      const isValid = validateSquare(newSquare, newState);

      // if the new square is valid, then add it
      if (isValid) {
        newState[index] = newSquare;
        return newState;
      }

      // else, just return the previous state
      return prevState;
    });
  };

  return (
    <>
      <h1>Sudoku Solver</h1>
      <div className="board">
        {squares.map(({ location, value }, index) => (
          <input
            className={`square ${location[0]}`}
            key={location}
            type="text"
            value={value}
            onChange={(e, location) => updateSquare(e, location, index)}
          />
        ))}
      </div>

      <div>
        <button onClick={reset}>Reset</button>
        <button onClick={solveBoard}>Solve</button>
      </div>
    </>
  );
};
