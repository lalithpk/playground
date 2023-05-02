import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { color } from "./ColorService";
const WordCounter = () => {
  const [words, setWords] = useState("");
  const reverseTheContentHandle = () => {
    let temp = words;
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        minHeight: "100vh",
        width: "100vh",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <p>Tell me somthing about you untill my box become green</p>
      <textarea
        className="large "
        id="outlined-textarea"
        label="Multiline Placeholder"
        placeholder="Placeholder"
        value={words}
        onChange={(e) => setWords(e.target.value)}
        style={{ backgroundColor: `${color[words.split(" ").length - 1]}` }}
      />
      <h3>No Of Words:{words.split(" ").length - 1}</h3>
      <h3>Number Of letters:{words.split(" ").join("").split("").length}</h3>
      <div>
        <Button onClick={reverseTheContentHandle}>Reverse The Content</Button>
      </div>
    </Grid>
  );
};

export default WordCounter;
