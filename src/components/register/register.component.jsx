import { Apple, FacebookRounded, GitHub, Google } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/space.jpg";
import CommonStack from "../custom-styles/commonstack.component";
import CommonButton from "../custom-styles/custombutton.component";
/**
 * 
 * @param {*} setIsLogined - set to true if user has registered successfully
 * @param {*} setNotification - show notification for success or error
 * @param {*} setShowNotification - show hide notification 
 * @param {*} setUserAgreed - set userAgreed to true / false
 * 
 */
const Register = ({
  setIsLogined,
  setNotification,
  setShowNotification,
  setUserAgreed,
}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [userNameError, setUserNameError] = useState(false);
  const [userEmailError, setUserEmailError] = useState(false);
  const [userPasswordError, setUserPasswordError] = useState(false);

  useEffect(() => {
    setUserNameError(false);
    if (userName === "") {
      setUserNameError(true);
    }
  }, [userName]);

  useEffect(() => {
    setUserEmailError(false);
    if (userEmail === "") {
      setUserEmailError(true);
    }
  }, [userEmail]);

  useEffect(() => {
    setUserPasswordError(false);
    if (userPassword === "") {
      setUserPasswordError(true);
    }
  }, [userPassword]);

  useEffect(() => {
    setUserEmailError(false);
    setUserNameError(false);
    setUserPasswordError(false);
  }, []);
  /**
   * Save users login info to local storage
   * @param {*} event - submit event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const User = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    try {
      if (!userNameError && !userEmailError && !userPasswordError) {
        localStorage.clear();
        localStorage.setItem("User", JSON.stringify(User));
        setIsLogined( true);
        setUserAgreed( false);
        setNotification(() => {
          return { message: "Registration Successful", type: "success" };
        });
        setShowNotification( true);
        navigate("/");
      }
    } catch (error) {
      setNotification(() => {
        return { message: error?.message, type: "error" };
      });
      setShowNotification( true);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${Image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <CommonStack
        justifyContent="center"
        alignItems="center"
        component="form"
        onSubmit={handleSubmit}
      >
        <Card
          sx={{
            margin: " calc(100vh - 80vh) auto",
            boxShadow: "0px 0 30px #fefefe",
          }}
        >
          <CardHeader
            sx={{ paddingTop: "32px"}}
            title={<Typography variant="h5" fontWeight="600" fontFamily="Space Mono,monospace">
Register you account with us!
            </Typography>
          }
          ></CardHeader>
          <CardContent>
            <CommonStack spacing={2} sx={{color:"red"}}>
              <TextField
                name="Name"
                required
                placeholder="Enter name"
                value={userName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
                error={userNameError}
               label="Name"
               inputProps={{"data-testid":"userName", "maxlength":"25"}}
               color="success"
              
              />
              <TextField
                name="Email"
                required
                placeholder="Enter E-mail"
                type="email"
                value={userEmail}
                onChange={(event) => {
                  setUserEmail(event.target.value);
                }}
                error={userEmailError}
                inputProps={{"data-testid":"email"}}
                label="E-mail"
                color="success"
              />
              <TextField
                name="Password"
                required
                type="password"
                placeholder="Password"
                value={userPassword}
                onChange={(event) => {
                  setUserPassword(event.target.value);
                }}
                error={userPasswordError}
                inputProps={{ "data-testid": "password","minLength":3}}
                label="Password"
                color="success"
              />
              <CommonButton
                variant="outlined"
                type="submit"
                sx={{
                  borderColor: "#3cd458",
                  backgroundColor: "#fff",
                  color:"green",
                  ":hover": {
                    color: "#fefefe",
                    backgroundColor: "#3cd458",
                    borderColor: "#3cd458",
                    boxShadow: "0 1px 10px rgb(60 212 88 / 40%)",
                  },
                }}
              >
                REGISTER
              </CommonButton>
            </CommonStack>
            <Divider sx={{ paddingTop: "16px" }} variant="fullWidth">
              or Continue with
            </Divider>
            <Box textAlign="center" paddingTop="16px" paddingBottom="32px">
              <Apple fontSize="large"></Apple>
              <GitHub fontSize="large"></GitHub>
              <Google fontSize="large"></Google>
              <FacebookRounded fontSize="large"></FacebookRounded>
            </Box>
          </CardContent>
        </Card>
      </CommonStack>
    </Box>
  );
};

export default Register;
