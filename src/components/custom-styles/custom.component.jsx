import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const CustomButton1 = styled(Button)({
  borderColor: "#3cd458",
  backgroundColor: "#fff",
  ":hover": {
    color: "#fff",
    backgroundColor: "#3cd458",
    borderColor: "#3cd458",
    boxShadow: "0 1px 10px rgb(60 212 88 / 40%)",
  },
});
export const CustomButton2 = styled(Button)({
  borderColor: "#fff",
  backgroundColor: "#3cd458",
  ":hover": {
    color: "#3cd458",
    backgroundColor: "#fff",
    borderColor: "#3cd458",
    boxShadow: "0 1px 10px rgb(60 212 88 / 40%)",
  },
});

export const CustomButton = styled(Button)({
  borderColor: "green",
  backgroundColor: "#fefefe",
  color:"green",
  ":hover": {
    color: "#fefefe",
    backgroundColor: "#DF2935",
    borderColor: "#DF2935",
    boxShadow: "0 1px 10px #DF2935",
  },
});
