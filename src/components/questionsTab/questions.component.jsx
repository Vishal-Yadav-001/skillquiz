import { ArrowLeft } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Pagination,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import { useNavigate } from "react-router-dom";
import CommonStack from "../custom-styles/commonstack.component";

import CommonButton from "../custom-styles/custombutton.component";
import ResponsiveDrawer from "../drawer/drawer.component";
import Loader from "../loading/loader.component";
import Timer from "../timer/timer.component";

let count = {};
/**
 * @param {Array.<Object>}  questions - list of questions
 * @param {string}  questionsRange - no of questions
 * @param {string | number}  navbarHeight - height of side menu
 * @param { string}  selectedTopic - selected topic
 * @param {string}  questionLevel - level of question
 * @param {Array.<Object>}  userResponse - user response for questions
 * @param {boolean}  errorOccurred - true if errorOccurred while fetching question
 * @param {Array.<Object>} previousUserResponse - user previous response
 * @param {boolean}  isLoading - true if questions are loading
 * @param {@callback}  handleDrawerToggle - open/close side menu
 * @param {@callback}  setUserResponse - set user Response
 * @param {@callback}  setUserAgreed - set user Agreed
 * @param {@callback}  setIsLoading -  set questions loading state
 * @param {@callback}  setErrorOccurred - set errorOccurred
 * @param {@callback}  setPreviousUserResponse - set PreviousUserResponse
 */
const Questions = ({
  questions,
  questionsRange,
  navbarHeight,
  mobileOpen,
  setMobileOpen,
  handleDrawerToggle,
  selectedTopic,
  questionLevel,
  userResponse,
  setUserResponse,
  setUserAgreed,
  setIsLoading,
  isLoading,
  errorOccurred,
  setErrorOccurred,
  previousUserResponse,
  setPreviousUserResponse,
  setIsLogined,
  setQuestions,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentOption, setCurrentOption] = useState("response");
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [timeOver, setTimeOver] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();
  const countScore = { score: 0 };
  const userData = JSON.parse(localStorage.getItem("User"));
  /**
   *  Logout user if users press back button of browser in middle of quiz
   * @param {*} event - popstate event
   */
  const handleBackButton = (event) => {
    const keys = Object.keys(count)?.length;
    if (keys) {
      try {
        localStorage.removeItem("User");
        setUserAgreed(false);
        setIsLogined(false);
        setQuestions([]);
        setAttempts([]);
        setUserResponse(null);
        count = {};
      } finally {
        navigate("/register", { replace: true });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("popstate", handleBackButton());
    return () => window.removeEventListener("popstate", handleBackButton());
  }, []);
  /**
   * Handles browser close/ tab close action when quiz has not been submitted
   */
  useBeforeunload((event) => {
    if (attempts.length > 0) {
      calculateScores("closeTab");
      event.returnValue = "";
    }
  });

  useEffect(() => {
    if (userData?.accidentalClose) {
      count = previousUserResponse ? previousUserResponse : {};
      const firstResponse = Object.keys(count);
      setCurrentOption(count[firstResponse[0]]?.value || "");
    }
    setUserResponse(count);
  }, [previousUserResponse]);

  useEffect(() => {
    if (timeOver) {
      calculateScores("timeover");
    }
  }, [timeOver]);

  useEffect(() => {
    for (const key in userResponse) {
      if (attempts.indexOf(key) === -1) {
        setAttempts((prev) => [...prev, key]);
      }
    }
  }, [currentOption]);
  /**
   * Handles Pagination - Page change action
   * @param {*} event - click event
   * @param {*} value - number - Page no.
   */
  const handleClick = (event, value) => {
    if (value <= questions.length) {
      setCurrentQuestion(value - 1);
      handlePageMovement(value);
    }
  };
  /**
   *  Stores the option chosen by user
   * @param {*} value -Page no
   */
  const handlePageMovement = (value) => {
    if (value - currentQuestion + 1 === 1) {
      setCurrentOption(count[currentQuestion]?.value);
    } else {
      setCurrentOption(count[value]?.value);
    }
  };
  /**
   *  Help in selecting radio button option selected by user as response of question
   * @param {*} e -click event
   */
  const handleOptionsSelection = (e) => {
  //  if (count[currentQuestion + 1]) {
      count[currentQuestion + 1] = {
        id: questions[currentQuestion].options.find(
          (data) => data.value === e.target.value
        )?.id,
        value: e.target.value,
      };
   // } else {
      // count[currentQuestion + 1] = {
      //   id: questions[currentQuestion].options.find(
      //     (data) => data.value === e.target.value
      //   )?.id,
      //   value: e.target.value,
      // };
   // }
    setCurrentOption(count[currentQuestion + 1]?.value);
    setUserResponse(count);
  };
  /**
   * Handel the Quiz submission.
   * @param {*} event - submit event
   */
  const onQuizSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    count = {};
    calculateScores();
  };
  /**
   * Calculate the score of user.
   * @param {*} source - string - place from where the function is called
   */
  const calculateScores = (source) => {
    count = {};
    for (const key in userResponse) {
      questions?.map((data) => {
        if (data.id === Number(key)) {
          if (data.answer?.id === userResponse[key]?.id) {
            if (countScore["score"]) {
              countScore["score"] = Number(countScore["score"]) + 1;
            } else {
              countScore["score"] = 1;
            }
          }
        }
      });
    }

    submitDataToLocalStorage(source);
  };
  /**
   * Submit user data to local storage and move user to score screen
   * @param {*} source - string - place from where the function is called
   */
  const submitDataToLocalStorage = (source) => {
    setPreviousUserResponse(null);

    const userResponseObj = {
      ...userData,
      selectedTopic: selectedTopic,
      providedQuestions: questions,
      provideQuestionsCount: questionsRange,
      providedQuestionsLevel: questionLevel,
      totalTimeProvided: questionsRange * 20,
      timeSpent: totalTimeTaken,
      userResponse: userResponse,
      questionAttempted: attempts?.length,
      score: countScore?.score,
      allAttempted: attempts?.length === questions?.length,
      accidentalClose: source ? true : false,
    };
    localStorage.clear();
    localStorage.setItem("User", JSON.stringify(userResponseObj));
    if (source !== "closeTab") {
      setUserAgreed(false);
      navigate("/score", { replace: true });
    }
  };

  return (
    <Fragment>
      {errorOccurred ? (
        <Box width="100%" textAlign="center">
          <CommonStack justifyContent="center" alignItems="center">
            <Card
              sx={{
                padding: "16px",
                width: { xs: "250px", sm: "350px", md: "500px", lg: "500px" },
                marginTop: "150px",
                bgcolor: "primary.main",
                border:"3px solid #03256C"
              }}
            >
              <CardHeader
                title={
                  <img
                    style={{ width: "50px",boxShadow:" 0 0 20px blue",borderRadius:"50%" }}
                    src={require("../../assets/icons/sorry.png")}
                    alt="Sorry Icon"
                  />
                }
              />
              <CardContent>
                <Typography>
                  Sorry we are unable to fetch question at this moment!
                </Typography>
              </CardContent>
              <CardContent>
                <CommonButton
                  startIcon={<ArrowLeft />}
                  fullWidth={false}
                  sx={{
                    backgroundColor: "secondary.main",
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.common",
                      color: "primary.main",
                    },
                    width: {
                      xs: "100%",
                      sm: "100%",
                      md: "40%",
                      lg: "30%",
                      xl: "30%",
                    },
                  }}
                  onClick={() => {
                    setUserAgreed(false);
                    setErrorOccurred(false);
                    navigate("/", { replace: true });
                  }}
                >
                  Home
                </CommonButton>
              </CardContent>
            </Card>
          </CommonStack>
        </Box>
      ) : isLoading ? (
        <Box textAlign="center" sx={{paddingTop:"20%"}}>
          <Typography>Please wait...</Typography>
          <Loader sx={{ color: "#F06543" }} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "block",
                xl: "block",
              },
            }}
          >
            <ResponsiveDrawer
              questions={questions}
              navbarHeight={navbarHeight}
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
              handleDrawerToggle={handleDrawerToggle}
              handleClick={handleClick}
              attempts={attempts}
              window={()=>{return window}}
            ></ResponsiveDrawer>
          </Box>
          <Box
            component="form"
            onSubmit={onQuizSubmit}
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "90%",
                xl: "80%",
                lg: "80%",
              },
            }}
          >
            <Card
              sx={{
                boxShadow: "5px 5px 30px blue",
                background: "#fff",
              }}
            >
              <CardContent>
                <CommonStack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography variant="h5">{selectedTopic}</Typography>
                    <Typography>{questionLevel}</Typography>
                  </Box>
                  {questions?.length > 0 && (
                    <CommonStack direction="row" alignItems="center">
                      <Timer
                        questionsRange={questionsRange}
                        totalTimeTaken={totalTimeTaken}
                        setTotalTimeTaken={setTotalTimeTaken}
                        setTimeOver={setTimeOver}
                      ></Timer>
                    </CommonStack>
                  )}
                </CommonStack>
              </CardContent>
              <Divider></Divider>
              <CardContent>
                <Box>
                  <CommonStack spacing={2} alignItems="self-start">
                    <Typography variant="h6" data-testid="questions">
                      {`${currentQuestion + 1} . ${
                        questions[currentQuestion]?.question
                      }`}
                    </Typography>
                    <CommonStack direction="column" textAlign="left">
                      <FormControl data-testid="options">
                        {/* <FormLabel id="radio-options" sx={{color:"#F06543"}}>
                          Options
                        </FormLabel> */}
                        <RadioGroup
                          value={currentOption || ""}
                          onChange={(e) => handleOptionsSelection(e)}
                        >
                          {questions[currentQuestion]?.options?.map(
                            (optionList) => {
                              return (
                                <FormControlLabel
                                  key={optionList?.id}
                                  value={optionList?.value}
                                  control={<Radio sx={{color:"secondary.main", '&.Mui-checked': {
                                    color:"secondary.main",
                                  }}}  />}
                                  label={optionList?.value}
                                />
                              );
                            }
                          )}
                        </RadioGroup>
                      </FormControl>
                    </CommonStack>
                  </CommonStack>
                  <CommonStack direction="row" justifyContent="center">
                    <Pagination
                      count={questionsRange}
                      page={currentQuestion + 1}
                      onChange={handleClick}
                    />
                  </CommonStack>
                </Box>
              </CardContent>
            </Card>
            <Divider style={{ padding: "16px" }}>Finish Quiz</Divider>

            <Box textAlign="end">
              <CommonButton variant="contained" color="success" type="submit" data-testid="submit">
                SUBMIT
              </CommonButton>
            </Box>
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export default Questions;
