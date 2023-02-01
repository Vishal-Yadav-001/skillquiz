import { Box, Typography } from "@mui/material";
import React from "react";
import { useLocation, useRouteError } from "react-router-dom";
import NotFoundImage from "../assets/vecteezy_404-landing-page_6549647.jpg"
const NotFound = () => {
    const path = useLocation();
  return (
    <Box className="not_found_banner" sx={{position:"absolute",top:"25%"}}>
      <Typography align="center" className="title">Page Not Found</Typography>
<Typography align="center">
<img
        className="error_image"
        src={NotFoundImage}
        alt="error image"
        style={{width:"50%"}}
      ></img>
</Typography>
      <Typography align="center">
      {path?.pathname} <span>
        is not valid , Please check your path.
        </span> 
      </Typography>
    
 
    </Box>
  );
};

export default NotFound;
