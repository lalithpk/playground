import { Button, Grid } from "@mui/material";
import React, { useRef, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

  const start = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        let ms = prevTime.ms + 10;
        let s = prevTime.s;
        let m = prevTime.m;
        let h = prevTime.h;
        if (ms === 1000) {
          ms = 0;
          s++;
        }
        if (s === 60) {
          s = 0;
          m++;
        }
        if (m === 60) {
          m = 0;
          h++;
        }
        return { ms, s, m, h };
      });
    }, 10);
  };

  const stop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const formatTime = (time) => {
    return (
      String(time.h).padStart(2, "0") +
      ":" +
      String(time.m).padStart(2, "0") +
      ":" +
      String(time.s).padStart(2, "0") +
      ": " +
      String(time.ms).padStart(2, "0")
    );
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <h1>{formatTime(time)}</h1>
      {!isRunning && <Button onClick={start}>Start</Button>}
      {isRunning && <Button onClick={stop}>Stop</Button>}
      <Button onClick={reset}>Reset</Button>
    </Grid>
  );
};

export default Timer;
