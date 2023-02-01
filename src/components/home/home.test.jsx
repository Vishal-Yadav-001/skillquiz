import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import Home from "./home.component";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
describe("Home component", () => {
  test("displays home component", () => {
    const home = renderHome(false);
    expect(screen.getByText("SkillScore")).toBeInTheDocument();
  });
  test("displays list of skill on  home component", () => {
    const home = renderHome(false);
    expect(screen.getByText("SkillScore")).toBeInTheDocument();
  });
  test("displays resume dialog ", async () => {
    const user = userEvent.setup();
    localStorage.clear();
    localStorage.setItem("User", JSON.stringify(accidentalCloseData));
    const homeScreen = await renderHome(true);
    await waitFor(() =>
      expect(screen.getByText("Attention!")).toBeInTheDocument()
    );
  });
  test("snapshot home component", async () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Home
            limit={limit}
            levels={levels}
            topics={listOfTopics}
            userAgreed={false}
            user={user}
            selectedTopic={""}
            questionLevel={""}
            questionsRange={""}
            questions={questions}
            setIsLogined={setIsLogined}
            setNotification={setNotification}
            setQuestionLevel={setQuestionLevel}
            setQuestions={setQuestions}
            setQuestionsRange={setQuestionsRange}
            setSelectedTopic={setSelectedTopic}
            setShowNotification={setShowNotification}
            setUserAgreed={setUserAgreed}
             showReturnDialog={false}
          />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

const renderHome = (showReturnDialog) => {
  return render(
    <Home
      limit={limit}
      levels={levels}
      topics={listOfTopics}
      userAgreed={false}
      user={user}
      selectedTopic={""}
      questionLevel={""}
      questionsRange={""}
      questions={questions}
      setIsLogined={setIsLogined}
      setNotification={setNotification}
      setQuestionLevel={setQuestionLevel}
      setQuestions={setQuestions}
      setQuestionsRange={setQuestionsRange}
      setSelectedTopic={setSelectedTopic}
      setShowNotification={setShowNotification}
      setUserAgreed={setUserAgreed}
      showReturnDialog={showReturnDialog}
      handleResume={handleResume}
      handleStartFresh={handleStartFresh}
    />,
    { wrapper: BrowserRouter }
  );
};

const user = { name: "gfg", email: "cccc@gmail.com", password: "ccc" };
const questions = [];
const levels = [
  { id: 0, label: "Easy" },
  { id: 1, label: "Medium" },
  { id: 2, label: "Hard" },
];

const limit = [
  { id: 0, range: 5 },
  { id: 1, range: 10 },
  { id: 2, range: 15 },
  { id: 3, range: 20 },
];

const listOfTopics = [
  {
    id: 0,
    topic: "HTML",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAABBTAAAQUwGKEV3UAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAwBQTFRF/////EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/EkL/E...",
  },
  {
    id: 1,
    topic: "JavaScript",
    src: "/static/media/js.3dfb665e058d08c99f28.png",
  },
  {
    id: 2,
    topic: "Sql",
    src: "/static/media/sql-server.86cdb54cc5fc9c392ebd.png",
  },
  {
    id: 3,
    topic: "DevOps",
    src: "/static/media/devops.6e9bb2987f60edc01514.png",
  },
];

const questionLevel = "";
const selectedTopic = "";

const setIsLogined = () => {
  return null;
};

const setNotification = () => {
  return null;
};
const setQuestionLevel = () => {
  return null;
};
const setQuestions = () => {
  return null;
};
const setQuestionsRange = () => {
  return null;
};
const setSelectedTopic = () => {
  return null;
};
const setShowNotification = () => {
  return null;
};
const setUserAgreed = () => {
  return null;
};
const handleResume = () => {
  return null;
};

const handleStartFresh = () => {
  return null;
};

const accidentalCloseData = {
  name: "xvxvxxv",
  email: "xvxvxcv@gmail.com",
  password: "vvcx",
  selectedTopic: "HTML",
  providedQuestions: [
    {
      id: 1,
      question:
        "All elements are identified by their __________ and are marked up using either start tags and end tags or self-closing tags",
      options: [
        { id: 1, value: "Attribute Names" },
        { id: 2, value: "Tag Names" },
        { id: 3, value: "Class Names" },
        { id: 4, value: "None of the mentioned" },
      ],
      answer: { id: 2, value: "answer_b_correct" },
    },
    {
      id: 2,
      question: "Choose the correct HTML element for the largest heading:",
      options: [
        { id: 1, value: "<heading>" },
        { id: 2, value: "<head>" },
        { id: 3, value: "<h1>" },
        { id: 4, value: "<h6>" },
      ],
      answer: { id: 3, value: "answer_c_correct" },
    },
    {
      id: 3,
      question: "What is the correct HTML element for playing video files?",
      options: [
        { id: 1, value: "<movie>" },
        { id: 2, value: "<media>" },
        { id: 3, value: '<type="video">' },
        { id: 4, value: "<video>" },
      ],
      answer: { id: 4, value: "answer_d_correct" },
    },
    {
      id: 4,
      question: "To create a blank line in your web page",
      options: [
        { id: 1, value: "press Enter two times" },
        { id: 2, value: ". insert <BLINE>" },
        { id: 3, value: "insert <BR> tag" },
        { id: 4, value: "press Shift + Enter" },
      ],
      answer: { id: 3, value: "answer_c_correct" },
    },
    {
      id: 5,
      question: "A homepage is __________",
      options: [
        { id: 1, value: "an index of encyclopedia articles" },
        { id: 2, value: "the first page of a website" },
        { id: 3, value: "required for access to the Internet" },
        { id: 4, value: "where all Internet data is stored" },
      ],
      answer: { id: 2, value: "answer_b_correct" },
    },
  ],
  provideQuestionsCount: 5,
  providedQuestionsLevel: "Easy",
  totalTimeProvided: 100,
  timeSpent: 12,
  userResponse: {
    1: { id: 4, value: "None of the mentioned" },
    2: { id: 3, value: "<h1>" },
  },
  questionAttempted: 2,
  score: 1,
  allAttempted: false,
  accidentalClose: true,
};
