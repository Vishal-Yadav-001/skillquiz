import React from "react";
import { AppBar, Avatar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import CommonButton from "../custom-styles/custombutton.component";
/**
 * Navigation component
 * @param {Object} user - user details stored in local storage
 * @param {boolean} isLogined  - if user is logged in
 * @param {string} navbarHeight - height of the side menu
 * @param {@callback} handleDrawerToggle - open/close side menu
 * @param {@callback} setIsLogined - to change isLoggedin state
 * 
 * 
 */
const Navbar = ({
  user,
  isLogined,
  navbarHeight,
  handleDrawerToggle,
  setIsLogined,
}) => {
  const navigate = useNavigate();
  /**
   * Move user to register screen and clear user data from local storage
   */
  const handleLogout = () => {
    localStorage.clear();
    setIsLogined(false);
    navigate("/register",{replace:true});
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" sx={{ height: navbarHeight,'&.MuiAppBar-root':{boxShadow:"none"} }}>
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ marginRight: 2 }}
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,fontFamily:"monospace",fontSize:"2rem" }}>
            SkillScore
          </Typography>
          
          <Avatar src={require("../../assets/icons/young-man.png")} alt={"User Name"} sx={{bgcolor:"primary",margin:"16px",boxShadow:" inset 0 0  10px blue"}}  ></Avatar>
          <Typography margin={2}   sx={{display:{xs:"none",sm:"none",md:"block",lg:"block"}}} color="primary.dark" fontFamily="'Space Mono', monospace" fontWeight="700">{user?.name}</Typography>
          
          {isLogined ? (
            <CommonButton
              variant="text"
              onClick={handleLogout}
              sx={{
                color: "black",
                border: "2px solid black ",
                background:"#fefefe",
                "&:hover": {
                  color: "black",
                  border: "2px solid black ",
                  background:"#fefefe",
                },
              }}
            >
              Logout
            </CommonButton>
          ) : (
            <CommonButton
              variant="contained"
              onClick={handleLogout}
              sx={{
                color: "black",
                border: "2px solid black ",
                backgroundColor:"primary.main",
                "&:hover": {
                  color: "black",
                  border: "2px solid black ",
                  backgroundColor:"primary.main",
                },
              }}
            >
              Login
            </CommonButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
