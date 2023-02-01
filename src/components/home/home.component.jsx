import { Container } from "@mui/system";
import React, { Fragment } from "react";
import Navbar from "../navbar/navbar.component";
import Skills from "../skill_category/skills.component";
import { Outlet } from "react-router-dom";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

import CommonStack from "../custom-styles/commonstack.component";
import CommonButton from "../custom-styles/custombutton.component";
import { FavoriteOutlined } from "@mui/icons-material";
/**
 *  Act as parent Container for application components
 * @param {boolean}  isLogined - check if user is logged in
 * @param {string}  selectedTopic - user selected topic for quiz
 * @param {string}  questionLevel - check if user is logged in
 * @param {string}  questionsRange - check if user is logged in
 * @param {Array.<Object>} topics Topics
 * @param {Array.<Object>}  limit -No  of questions
 * @param {boolean}  userAgreed - check if user has read instruction and ready to start quiz
 * @param {string}  navbarHeight - height of navbar
 * @param {object}  user - user object stored in local storage
 * @param {@callback} setIsLogined - to change if user is logged in
 * @param {@callback} setSelectedTopic - to change user selected topic
 * @param {@callback} setQuestionLevel - to change user selected question level
 * @param {@callback} setQuestionsRange - to change user selected questions range
 * @param {@callback} setUserAgreed - to change user agreed
 * @param {@callback} handleDrawerToggle - to open / close drawer /side menu
 * @param {@callback} showReturnDialog - shows up user a dialog if he wants to resume left out quiz
 * @param {@callback} handleResume - resumes quiz
 * @param {@callback} handleStartFresh - start quiz as if new user user is taking quiz
 *
 */
const Home = ({
  setIsLogined,
  isLogined,
  selectedTopic,
  setSelectedTopic,
  questionLevel,
  setQuestionLevel,
  questionsRange,
  setQuestionsRange,
  topics,
  limit,
  levels,
  userAgreed,
  setUserAgreed,
  navbarHeight,
  user,
  handleDrawerToggle,
  showReturnDialog,
  handleResume,
  handleStartFresh,
}) => {
  return (
    <Box sx={{ height: "100vh" }} bgcolor="primary.main">
      <Navbar
        user={isLogined ? user : { name: "User name" }}
        navbarHeight={navbarHeight}
        isLogined={isLogined}
        setIsLogined={setIsLogined}
        handleDrawerToggle={handleDrawerToggle}
        data-testid="Navbar"
      ></Navbar>

      <Container
        sx={{
          paddingBottom: "1rem",
          bgColor: "#E8E9EB",
          overflowX: "hidden",
          overflowY: "auto",
          minHeight: "calc(100vh - 112px)",
          backgroundColor: "primary.main",
        }}
      >
        {showReturnDialog ? (
          <CommonStack justifyContent="center" alignItems="center">
            <Card
              sx={{
                padding: "16px",
                width: { xs: "250px", sm: "350px", md: "500px", lg: "500px" },
                marginTop: "150px",
                bgcolor: "primary",
                boxShadow: "0px 0px 20px blue",
                border: "4px solid #03256C",
              }}
            >
              <CardHeader
                title={
                  <Typography variant="h5" color="primary.dark">
                    Attention!
                  </Typography>
                }
                subheader={
                  <Typography color="primary.light">
                    You were not able to complete quiz previously
                  </Typography>
                }
              />
              <CardContent>
                <Typography color="primary.light">
                  Do you wish to resume from where you left ?
                </Typography>
              </CardContent>
              <CardContent>
                <CommonButton
                  onClick={() => handleResume()}
                  sx={{
                    background: "#2F4858",
                    color: "#fefefe",
                    "&:hover": {
                      background: "#fefefe",
                      color: "#e91e63",
                    },
                    width: {
                      xs: "100%",
                      sm: "100%",
                      md: "40%",
                      lg: "30%",
                      xl: "30%",
                    },
                  }}
                >
                  Resume
                </CommonButton>
                <CommonButton
                  variant="outlined"
                  onClick={() => handleStartFresh()}
                  sx={{
                    background: "#fefefe",
                    color: "#2F4858",
                    borderColor: "#fefefe",
                    marginLeft: {
                      xs: "0rem",
                      sm: "0rem",
                      md: ".5rem",
                      lg: "1rem",
                      xl: "1rem",
                    },
                    marginTop: {
                      xs: "1rem",
                      sm: "1rem",
                      md: "0rem",
                      lg: "0rem",
                      xl: "0rem",
                    },
                    "&:hover": {
                      background: "#2F4858",
                      color: "#fefefe",
                      borderColor: "#2F4858",
                    },
                    width: {
                      xs: "100%",
                      sm: "100%",
                      md: "40%",
                      lg: "30%",
                      xl: "30%",
                    },
                  }}
                >
                  Start Fresh
                </CommonButton>
              </CardContent>
            </Card>
          </CommonStack>
        ) : (
          <Box padding={2}>
            {!userAgreed && (
              <Skills
                listOfTopics={topics}
                levels={levels}
                limit={limit}
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                questionLevel={questionLevel}
                setQuestionLevel={setQuestionLevel}
                questionsRange={questionsRange}
                setQuestionsRange={setQuestionsRange}
                userAgreed={userAgreed}
                setUserAgreed={setUserAgreed}
                isLogined={isLogined}
              ></Skills>
            )}
            {userAgreed && <Outlet></Outlet>}
          </Box>
        )}
      </Container>
      <Box
        className="footer"
        sx={{
          color: "primary.main",
          backgroundColor: "primary.light",
          width: "100%",
          minHeight: "3rem",
          textAlign: "center",
          paddingTop: "1rem",
        }}
      >
        <span>Made in 2022 by Vishal Yadav</span>
      </Box>
    </Box>
  );
};

export default Home;
