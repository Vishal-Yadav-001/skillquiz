import { Box, circularProgressClasses, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "../loading/loader.component";
/**
 * Shows Timer to show time progress for quiz
 * @param {string} questionsRange - no of the questions
 * @param {number} setTotalTimeTaken - total time taken to finish quiz
 * @param {boolean} setTimeOver - has allocated time exhausted
 * s 
 */
const Timer = ({
  questionsRange,
  setTotalTimeTaken,
  setTimeOver,
}) => {
  const userData = JSON.parse(localStorage.getItem("User"));
  const totalTime = userData?.accidentalClose
    ? userData?.totalTimeProvided - userData?.timeSpent
    : questionsRange * 20;
  const [seconds, setSeconds] = useState(totalTime % 60);
  const [minute, setMinute] = useState(Math.floor(totalTime / 60));
  const maxTimeAlloted = [
    {question:5,maxTime:120},
    {question:10,maxTime:240},
    {question:15,maxTime:300},
    {question:20,maxTime:420},
  ]
  const normalise = (value) => ((value - 0) * 100) / (maxTimeAlloted?.find(data=> data?.question === questionsRange )?.maxTime - 0);
  useEffect(() => {
    const Timer =
      seconds > 0 &&
      setInterval(() => {
        setSeconds((time) => time - 1);
      }, 1000);
    if (seconds === 0 && minute > 0) {
      setMinute(minute - 1);
      setSeconds(59);
    }
    if (minute === 0 && seconds === 0) {
      setSeconds(0);
      setTimeOver(true);
    }
    setTotalTimeTaken(() => totalTime - (seconds + minute * 60));
    return () => clearInterval(Timer);
  }, [seconds]);
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <Loader
        size="100px"
        variant="determinate"
        value={normalise((60*minute)+seconds)}
        color="warning"
        sx={{
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
            transition: "1s linear all",
          
          },
          borderRadius: "100%",
          boxShadow: "inset 0 0 0px 8px lightblue",
          backgroundColor: "transparent",
          
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" component="div" color="primary.dark" data-testid="time_duration">
          {minute < 10 ? `0${minute}`: minute} : {seconds < 10 ? `0${seconds}`: seconds}
        </Typography>
      </Box>
    </Box>
  );
};

export default Timer;
