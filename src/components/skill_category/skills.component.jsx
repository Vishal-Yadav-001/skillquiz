import React, { Fragment, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Instructions from "../instructions/instructions.component";
import CommonStack from "../custom-styles/commonstack.component";
import CommonButton from "../custom-styles/custombutton.component";
/**
 * Shows List Topics to take Quiz
 * @param {Array.<Object>} listOfTopics 
 * @param {Array.<Object>} levels  questions levels 
 * @param {Array.<Object>} limit no of questions
 * @param {string} selectedTopic - selected topic
 * @param {string}stringquestionLevel -question leveboolean
 * @param {string} questionsRange -no of questions
 * @param {boolean} userAgreed - user agreed to instructions and ready to start quiz
 * @param {boolean} isLogined - is user logged in
 * @param {@callback} setSelectedTopic - set selectedTopic
 * @param {@callback} setQuestionsRange -set no of questions
 * @param {@callback} setQuestionLevel - setQuestionLevel
 * @param {@callback} setUserAgreed - set userAgreed
 * 
 */
const Skills = ({
  listOfTopics,
  levels,
  limit,
  selectedTopic,
  setSelectedTopic,
  questionLevel,
  questionsRange,
  setQuestionsRange,
  setQuestionLevel,
  userAgreed,
  setUserAgreed,
  isLogined,
}) => {
  const [open, setOpen] = useState(false);
  /**
   * Control modal pop up action -open
   */
  const handleOpen = () => {
    setOpen(true);
    setQuestionLevel("Easy");
    setQuestionsRange(5);
  };
  /**
   * Control modal pop up action - close
   * @returns - none.
   */
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <Box textAlign="center" padding={4}>
        <Typography variant="h4" fontWeight="700" fontSize="1.8rem">
          Choose a topic
        </Typography>
        <Typography
          varient="h6"
          fontWeight="300"
          sx={{
            fontSize: { xs: "1rem", sm: "1rem", md: "1rem", lg: "1.5rem" },
          }}
        >
          Test you knowledge on various topics
        </Typography>
      </Box>
      <CommonStack direction={{ xs: "column", sm: "row" }} flexWrap="wrap" justifyContent="center">
        {listOfTopics?.map((listOfTopic) => {
          return (
            <Card
              key={listOfTopic.id}
              sx={{
                margin: "1rem",
                padding: "1.5rem",
                backgroundColor: "primary.dark",
                 boxShadow:"5px 5px 20px #2541B2"

              }}
            >
              <CardContent>
                <Box textAlign="center">
                  <img
                    width="auto"
                    height="75px"
                    src={listOfTopic.src}
                    alt={listOfTopic.topic}
                  ></img>
                  <Typography
                    padding="16px"
                    fontWeight="300"
                    color="primary"
                    sx={{
                      fontSize: {
                        xs: "1rem",
                        sm: "1rem",
                        md: "1.2rem",
                        lg: "1.5rem",
                      },
                    }}
                  >
                    {listOfTopic.topic}
                  </Typography>
                  {/* Button which will check if user has registered or not */}
                  <Instructions
                    open={open}
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                    levels={levels}
                    limit={limit}
                    questionLevel={questionLevel}
                    setQuestionLevel={setQuestionLevel}
                    questionsRange={questionsRange}
                    setQuestionsRange={setQuestionsRange}
                    userAgreed={userAgreed}
                    setUserAgreed={setUserAgreed}
                    isLogined={isLogined}
                  ></Instructions>
                  <Button onClick={handleOpen}   data-testid="takeQuizButton">
                    <Typography
                      fontWeight="600"
                      fontFamily="monospace"
                      sx={{
                        "&:hover": {
                          background: "#E8E9EB",
                          color: "#F06543",
                          borderColor: "#E8E9EB",
                          borderRadius: "10px",
                        },
                      }}
                      padding="16px"
                      variant="body"
                      onClick={() => {
                        setSelectedTopic(listOfTopic?.topic);
                      }}
                    >
                      Take a quiz
                    </Typography>
                  </Button>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </CommonStack>
    </Box>
  );
};

export default Skills;
