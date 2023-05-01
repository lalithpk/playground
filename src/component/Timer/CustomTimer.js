import { Button, Grid, InputLabel, TextField } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

function CustomerTimer() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

  const handleHoursChange = (event) => {
    setTime((prevTime) => ({
      ...prevTime,
      hours: parseInt(event.target.value),
    }));
  };

  const handleMinutesChange = (event) => {
    setTime((prevTime) => ({
      ...prevTime,
      minutes: parseInt(event.target.value),
    }));
  };

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          let hours = prevTime.hours;
          let minutes = prevTime.minutes;
          let seconds = prevTime.seconds;
          if (seconds === 0) {
            if (minutes === 0) {
              if (hours === 0) {
                stop();
                return { hours: 0, minutes: 0, seconds: 0 };
              } else {
                hours--;
                minutes = 59;
                seconds = 59;
              }
            } else {
              minutes--;
              seconds = 59;
            }
          } else {
            seconds--;
          }
          return { hours, minutes, seconds };
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (time) => {
    return (
      String(time.hours).padStart(2, "0") +
      ":" +
      String(time.minutes).padStart(2, "0") +
      ":" +
      String(time.seconds).padStart(2, "0")
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
      <div>
        <InputLabel htmlFor="hours">Hours:</InputLabel>
        <TextField
          type="number"
          id="hours"
          min="0"
          max="99"
          value={time.hours}
          onChange={handleHoursChange}
        />
      </div>
      <div>
        <InputLabel htmlFor="minutes">Minutes:</InputLabel>
        <TextField
          type="number"
          id="minutes"
          min="0"
          max="59"
          value={time.minutes}
          onChange={handleMinutesChange}
        />
      </div>
      <Button onClick={start}>Start</Button>
      <Button onClick={stop}>stop</Button>
      <Button onClick={reset}>reset</Button>
      <h1>{formatTime(time)}</h1>
    </Grid>
  );
}

export default CustomerTimer;
