import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Sudoku.css";
import { generateRandomSudoku } from "./SudokuServics";
const SudoKu = () => {
  let value = "";
  const ALPHA_NUMERIC_DASH_REGEX = /^[0-9]+$/;
  const [initialVales, setInitialValues] = useState(
    [...Array(9)].map((e) => Array(9).fill(value))
  );
  const [status, setStatus] = useState(false);
  const [gameStatus, setGameStatus] = useState(false);
  const handleChange = (event, row, col) => {
    console.log(event, row, col);
    let clonedInititalvalue = [...initialVales];
    clonedInititalvalue[row][col] = event.target.value;
    setInitialValues(clonedInititalvalue);
    console.log(clonedInititalvalue, gameStatus);
  };
  const validateSudoku = (board) => {
    let row = new Map();
    let col = new Map();
    let box = new Map();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        let value = board[i][j];
        if (value !== "") {
          const boxId = Math.floor(i / 3) * 3 + Math.floor(j / 3);
          if (
            row.has(`${i}-${value}`) ||
            col.has(`${j}-${value}`) ||
            box.has(`${boxId}-${value}`)
          ) {
            return false;
          } else {
            row.set(`${i}-${value}`);
            col.set(`${j}-${value}`);
            box.set(`${boxId}-${value}`);
          }
        }
      }
    }
    return true;
  };
  const isGameCompleted = () => {
    for (let i = 0; i < initialVales.length; i++) {
      for (let j = 0; j < initialVales[0].length; j++) {
        if (initialVales[i][j] === "") {
          return false;
        }
      }
    }
    return true;
  };

  useEffect(() => {
    setGameStatus(validateSudoku(initialVales));
    setStatus(isGameCompleted());
  }, [initialVales]);
  useEffect(() => {}, []);
  // useEffect(() => {
  //   setInitialValues(generateDefaultBoard());
  // }, [gameMode]);
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    setInitialValues(generateRandomSudoku());
    setStatus(false);
  }, []);
  return (
    <React.Fragment>
      <h1>SudoKu</h1>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <div className="input-container">
          {initialVales &&
            initialVales.map((el, inx) =>
              initialVales[inx].map((el, l) => (
                <TextField
                  value={initialVales[inx][l]}
                  onKeyDown={(event) => {
                    if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                      if (event.keyCode === 8) {
                        return;
                      }
                      event.preventDefault();
                    }
                  }}
                  InputProps={{ inputProps: { maxLength: 1 } }}
                  key={`${inx}-${l}`}
                  size="small"
                  className="square-input "
                  name={`${inx}-${l}`}
                  onChange={(e, inx, l) =>
                    handleChange(
                      e,
                      Number(e.target.name.split("-")[0]),
                      Number(e.target.name.split("-")[1])
                    )
                  }
                />
              ))
            )}
        </div>
        {!gameStatus && <h1>Not a Valid Sudoku</h1>}
        {status && gameStatus && (
          <h1>Congradulations You Have Completed The Game</h1>
        )}
        <div style={{ margin: "10px" }}>
          <Button
            color="warning"
            onClick={() => setInitialValues(generateRandomSudoku())}
          >
            Generate New Combinations
          </Button>
        </div>
        {/* <div className="">
          <Button color="success" onClick={() => setGameMode(4)}>
            Easy
          </Button>
          <Button color="warning" onClick={() => setGameMode(6)}>
            Medium
          </Button>
          <Button color="error" onClick={() => setGameMode(8)}>
            Hard
          </Button>
        </div> */}
      </Grid>
    </React.Fragment>
  );
};

export default SudoKu;
