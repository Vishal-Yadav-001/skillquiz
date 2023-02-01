import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import renderer, { act } from "react-test-renderer";
import Timer from "./timer.component";

describe(" <Timer/>", () => {
  test("snapshot Timer", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Timer
            questionsRange={questionsRange}
            setTotalTimeTaken={setTotalTimeTaken}
            setTimeOver={setTimeOver}
          />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("construct timer", () => {
   localStorage.clear();
   localStorage.setItem("User",JSON.stringify(getUserData(false)));
    const timerComponent = render(
      <BrowserRouter>
          <Timer
            questionsRange={questionsRange}
            setTotalTimeTaken={setTotalTimeTaken}
            setTimeOver={setTimeOver}
            setSeconds={()=>seconds -1}
            seconds={seconds}
          />
        </BrowserRouter>
    );
  waitFor(()=> expect(screen.getByTestId("time_duration")).toBe("1:40"));
  });
});



const seconds = 40;
const setSeconds = ()=>{seconds -1}

const questionsRange = 5;
const setTotalTimeTaken = () => {
  return null;
};
const setTimeOver = () => {
  return null;
};

const getUserData = (accidentalClose)=> {
  return{
    name: "xvxvxxv",
    email: "xvxvxcv@gmail.com",
    password: "vvv",
    selectedTopic: "HTML",
    providedQuestions: [
      {
        id: 1,
        question: "Choose the correct HTML element to define important text",
        options: [
          { id: 1, value: "<b>" },
          { id: 2, value: "<i>" },
          { id: 3, value: "<important>" },
          { id: 4, value: "<strong>" },
        ],
        answer: { id: 4, value: "answer_d_correct" },
      },
      {
        id: 2,
        question: "Which of the following is an attribute of the <Table> tag?",
        options: [
          { id: 1, value: "SRC" },
          { id: 2, value: "BOLD" },
          { id: 3, value: "CELLPADDING" },
          { id: 4, value: "LINK" },
        ],
        answer: { id: 3, value: "answer_c_correct" },
      },
      {
        id: 3,
        question: "Which HTML element defines navigation links?",
        options: [
          { id: 1, value: "<nav>" },
          { id: 2, value: "<navigate>" },
          { id: 3, value: "<navigation>" },
          { id: 4, value: "<navlink>" },
        ],
        answer: { id: 1, value: "answer_a_correct" },
      },
      {
        id: 4,
        question: "Which tag inserts a line horizontally on your web page?",
        options: [
          { id: 1, value: "<hr>" },
          { id: 2, value: '<line direction="horizontal">' },
          { id: 3, value: "<tr>" },
          { id: 4, value: "<line>" },
        ],
        answer: { id: 1, value: "answer_a_correct" },
      },
      {
        id: 5,
        question: "Which HTML element defines the title of a document?",
        options: [
          { id: 1, value: "<title>" },
          { id: 2, value: "<head>" },
          { id: 3, value: "<meta>" },
          { id: 4, value: "<start>" },
        ],
        answer: { id: 1, value: "answer_a_correct" },
      },
    ],
    provideQuestionsCount: 5,
    providedQuestionsLevel: "Easy",
    totalTimeProvided: 100,
    timeSpent: 0,
    userResponse: {},
    questionAttempted: 0,
    score: 0,
    allAttempted: false,
    accidentalClose: accidentalClose,
  }
 
};
