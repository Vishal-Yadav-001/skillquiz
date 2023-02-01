import { createTheme } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    primary: {
     main:"#fefefe",
     dark:"#03256C",
     light:"#2541B2",
     common:"#1768AC"
    },
    secondary: {
    main:"#DF2935"
    },
  },
  // typography: {
  //   fontFamily: [
  //     "'Roboto',sans-serif",
  //     "'Space Mono', monospace",
  //   ]
  // }
});

export default defaultTheme;
