import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Scores from "./scores.component";

describe("Scores", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("User", JSON.stringify(userData));
  });
  afterAll(() => {
    localStorage.clear();
  });
  test("snapshot Score", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Scores
            setUserAgreed={setUserAgreed}
            setRetry={setRetry}
            setUserResponse={setUserResponse}
            setQuestions={setQuestions}
          />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("Home button navigates to home page", async () => {
    const scoreComponent = render(
      <BrowserRouter>
        <Scores
          setUserAgreed={setUserAgreed}
          setRetry={setRetry}
          setUserResponse={setUserResponse}
          setQuestions={setQuestions}
        />
      </BrowserRouter>
    );
    const homeButton = screen.getAllByRole("button")[1];
    await act(async () => {
      fireEvent.click(homeButton);

      await waitFor(() => {
        expect(location?.pathname).toBe("/");
      });
    });
    const resetButton = screen.getAllByRole("button")[0];
   await act(async () => {
      fireEvent.click(resetButton);
      await waitFor(() => {
        expect(location?.pathname).toBe("/questions");
      });
    });
  });
});

const setUserAgreed = () => {
  return null;
};
const setRetry = () => {
  return null;
};
const setUserResponse = () => {
  return null;
};
const setQuestions = () => {
  return null;
};

const userData = {
  name: "xvxvxxv",
  email: "xvxvxcv@gmail.com",
  password: "xcvx",
  selectedTopic: "JavaScript",
  providedQuestions: [
    {
      id: 1,
      question: "Inside which HTML element do we put the JavaScript?",
      options: [
        { id: 1, value: "<javascript>" },
        { id: 2, value: "<script>" },
        { id: 3, value: "<js>" },
        { id: 4, value: "<scripting>" },
      ],
      answer: { id: 2, value: "answer_b_correct" },
    },
    {
      id: 2,
      question: 'How do you call a function named "myFunction"?',
      options: [
        { id: 1, value: "myFunction()" },
        { id: 2, value: "call myFunction()" },
        { id: 3, value: "call function myFunction()" },
      ],
      answer: { id: 1, value: "answer_a_correct" },
    },
    {
      id: 3,
      question: "How can you detect the client's browser name?",
      options: [
        { id: 1, value: "browser.name" },
        { id: 2, value: "navigator.appName" },
        { id: 3, value: "client.navName" },
      ],
      answer: { id: 2, value: "answer_b_correct" },
    },
    {
      id: 4,
      question: "How does a FOR loop start?",
      options: [
        { id: 1, value: "for i = 1 to 5" },
        { id: 2, value: "for (i = 0; i <= 5; i++)" },
        { id: 3, value: "for (i <= 5; i++)" },
        { id: 4, value: "for (i = 0; i <= 5)" },
      ],
      answer: { id: 2, value: "answer_b_correct" },
    },
    {
      id: 5,
      question: 'How do you write "Hello World" in an alert box?',
      options: [
        { id: 1, value: 'msgBox("Hello World");' },
        { id: 2, value: 'alert("Hello World");' },
        { id: 3, value: 'msg("Hello World");' },
        { id: 4, value: 'alertBox("Hello World");' },
      ],
      answer: { id: 2, value: "answer_b_correct" },
    },
  ],
  provideQuestionsCount: 5,
  providedQuestionsLevel: "Easy",
  totalTimeProvided: 100,
  timeSpent: 5,
  userResponse: { 1: { id: 2, value: "<script>" } },
  questionAttempted: 1,
  score: 1,
  allAttempted: false,
  accidentalClose: false,
};
