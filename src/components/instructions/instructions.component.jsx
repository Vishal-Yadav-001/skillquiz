import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Fade, MenuItem, Select } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "../custom-styles/custom.component";
import { Stack } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {xs:"300px",sm:"400px",md:"500px",lg:"600px"},
  bgcolor: "#fff",
  border: "2px solid #f7f0f0",
  borderRadius:"10px",
  boxShadow: "5px 5px 20px #fefefe",
  p: 2,
};
/**
 *  Shows  Instructions Screen with quiz related instruction
 * @param {*} props - passed by paren component(Skill)
 */
const Instructions = (props) => {
  const {
    open,
    handleClose,
    handleOpen,
    children,
    levels,
    limit,
    questionsRange,
    setQuestionsRange,
    questionLevel,
    setQuestionLevel,
    userAgreed,
    setUserAgreed,
    isLogined,
  } = props;
  const navigate = useNavigate();
  /**
   * After reading instructions and selecting question level and no of questions.User click start button 
   * it redirects user to question screen.
   */
  const onStart = () => {
    handleClose();
    navigate("/questions",{replace:true});
    setUserAgreed(true);
   
  };
  return (
    <div>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style} component="form">
            {isLogined ? (
              <Box>
                <Box id="modal-title"   sx={{display:"flex",justifyContent:"center",gap:".5rem"}}>
                  <Typography variant="h6" color="primary.dark" fontFamily="'Space Mono', monospace">
                  Level
                  </Typography>
                  <Select
                    variant="standard"
                    value={questionLevel}
                    onChange={(event) => {
                      setQuestionLevel(event.target.value);
                    }}
                    sx={{color:"secondary.main",fontFamily:"'Space Mono', monospace"}}
                    data-testid="questionLevel"
                  >
                    {levels?.map((difficulty) => {
                      return (
                        <MenuItem key={difficulty?.id} value={difficulty.label}>
                          {difficulty.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Typography data-testid="Questions" color="primary.dark" variant="h6" fontFamily="'Space Mono', monospace">Questions</Typography>
                  <Select
                    variant="standard"
                    sx={{color:"secondary.main",fontFamily:"'Space Mono', monospace"}}
                    value={questionsRange}
                    defaultValue={5}
                    onChange={(event) => {
                      setQuestionsRange(event.target?.value);
                    }}
                    data-testid="noOfQuestions"
                  >
                    {limit?.map((noOfQuestions) => {
                      return (
                        <MenuItem
                          key={noOfQuestions?.id}
                          value={noOfQuestions.range}
                        >
                          {noOfQuestions.range}
                        </MenuItem>
                      );
                    })}
                  </Select>
                 
                </Box>
                <Typography
                  component="div"
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  lineHeight={2}
                  color="black"
                  fontFamily="'Space Mono', monospace"
                >
                  <ul>
                    <li>Select no of question to attempt</li>
                    <li>Select difficulty of topic</li>
                    <li>Time limit per question: 20 seconds</li>
                    <li>Total time : (time limit x no of questions)</li>
                    <li>Correct : +1 , Incorrect: 0</li>
                    <li>User can resume the quiz if browser shutdown or tab closed accidentally</li>
                  </ul>
                </Typography>

                <CustomButton
                  variant="outlined"
                  color="success"
                  onClick={() => {
                    onStart();
                  }}
                  fullWidth
                >
                  Start
                </CustomButton>
              </Box>
            ) : (
              <Box>
                <Typography variant="h5" color="green">
                  To continue please register{" "}
                  <Link color="success" to="/register" sx={{ color: " green" }}>
                    Register
                  </Link>{" "}
                </Typography>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Instructions;
