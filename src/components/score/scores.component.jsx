import { Home, Replay } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  circularProgressClasses,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/annie-spratt-0ZPSX_mQ3xI-unsplash.jpg";
import CommonStack from "../custom-styles/commonstack.component";
import {
  CustomButton1,
  CustomButton2,
} from "../custom-styles/custom.component";
import CommonButton from "../custom-styles/custombutton.component";
import Loader from "../loading/loader.component";
import Space from "../../assets/space.jpg";
/**
 * Shows user score based on correct answers provided by User,fetches score from local storage.
 * @param {*} setUserAgreed -  set to true if user has registered successfully
 * @param {*} setRetry - set to true if user has decide to retake Quiz
 * @param {*} setUserResponse - set user response for questions
 * @param {*} setQuestions - set questions 
 *  screen with user Result
 */
const Scores = ({ setUserAgreed, setRetry, setUserResponse, setQuestions }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("User"));
    setUserData(() => {
      return getData;
    });
    setRetry(false);
  }, []);
  /**
   * Method for conversion of custom values (numbers) to scale of 0 to 100 for progress bar/circle.
   * @param {number} value - number
   * @returns {number} value number between 0 and 100
   */
  const normalise = (value) =>
    ((value - 0) * 100) / (userData?.provideQuestionsCount - 0);
  /**
   * When user click home button , redirects user to Home.
   */
  const handleHomeButton = () => {
    setUserAgreed( false);
    setRetry( false);
    setUserResponse(null);
    setQuestions([]);
    navigate("/", { replace: true });
  };
  /**
   * If user want to give re-test, user click Retest button,this redirect user to question tab with the same question which were provided earlier
   */
  const handleResetButton = () => {
    setUserAgreed( true); // todo replace with normal boolean value
    setRetry(true); // 
    setUserResponse(null);
  
      navigate("/questions", { replace: true });
  
    
  };
  return (
    <Fragment>
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `url(${Space})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <CommonStack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          height="100vh"
        >
          <Card
            sx={{
              padding: "16px",
              width: { xs: "350px", sm: "450px", md: "500px", lg: "500px" },
              textAlign: "center",
              backgroundColor: "primary.dark",
              color: "#E8E9EB",
              boxShadow: " 0px 0px 25px 0px  #fefefe",
              border: "5px solid #fefefe"
            }}
          >
            <CardHeader title={`Congratulation  ${userData?.name}`} />

            <CardContent>
              <CommonStack direction="row" justifyContent="center">
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-flex",
                    padding: "1rem",
                  }}
                >
                  <Loader
                    size="150px"
                    variant="determinate"
                    value={normalise(userData?.score)}
                    color="warning"
                    sx={{
                      [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: "round",
                        transition: "1.8s linear all",
                        animationDuration:"1s"
                        
                      },
                      borderRadius: "100%",
                      boxShadow: "inset 0 0 0px 11px #fefefe",
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
                    <Typography variant="h6" component="div" color="#E8E9EB">
                     <Typography variant="span" fontSize="1.8rem">
                     {userData?.score}
                      </Typography> / {userData?.provideQuestionsCount}
                    </Typography>
                  </Box>
                </Box>
              </CommonStack>

              <CommonStack direction="column">
                <Typography variant="h6">
                  Topic for quiz : {userData?.selectedTopic}{" "}
                </Typography>

                <Typography>
                  Level : {userData?.providedQuestionsLevel}{" "}
                </Typography>

                <Typography>
                  {" "}
                  Time Spent : {userData?.timeSpent} seconds{" "}
                </Typography>
                <Typography>
                  {" "}
                  Question attempted : {userData?.questionAttempted}{" "}
                </Typography>
              </CommonStack>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <CommonButton
                variant="contained"
                onClick={() => {
                  handleResetButton();
                }}
                sx={{
                  backgroundColor: "secondary.main",
                  color: "#E8E9EB",
                  "&:hover": {
                    background: "#E8E9EB",
                    color: "#38618C",
                  },
                }}
                startIcon={<Replay />}
              >
                Retest
              </CommonButton>
              <CommonButton
                variant="outlined"
                endIcon={<Home />}
                onClick={() => {
                  handleHomeButton();
                }}
                sx={{
                  background: "#E8E9EB",
                  color: "primary.light",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "primary.main",
                    borderColor: "#F06543",
                  },
                }}
              >
                Home
              </CommonButton>
            </CardActions>
          </Card>
        </CommonStack>
      </Box>
    </Fragment>
  );
};

export default Scores;
