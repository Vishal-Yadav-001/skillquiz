import { act, fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Skills from "./skills.component";

describe("Skills", () => {
  test("snapshot Skills", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Skills
            isLogined={isLogined}
            setUserAgreed={setUserAgreed}
            setQuestionLevel={setQuestionLevel}
            selectedTopic={selectedTopic}
            questionLevel={questionLevel}
            questionsRange={questionsRange}
            setQuestionsRange={setQuestionsRange}
            userAgreed={userAgreed}
            levels={levels}
            limit={limit}
            listOfTopics={listOfTopics}
            setSelectedTopic={setSelectedTopic}
          />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("Take a quiz button opens instructions dialog", async() => {
    const user = userEvent.setup();
    const skillsComponent = render(
      <BrowserRouter>
        <Skills
          isLogined={isLogined}
          setUserAgreed={setUserAgreed}
          setQuestionLevel={setQuestionLevel}
          selectedTopic={selectedTopic}
          questionLevel={questionLevel}
          questionsRange={questionsRange}
          setQuestionsRange={setQuestionsRange}
          userAgreed={userAgreed}
          levels={levels}
          limit={limit}
          listOfTopics={listOfTopics}
          setSelectedTopic={setSelectedTopic}
          
        />
      </BrowserRouter>
    );
    const takeQuizButton = screen.getAllByTestId("takeQuizButton")[0];
    act(async()=>{
      user.click(takeQuizButton);
     await waitFor(()=>{expect(screen.getByText("START")).toBeInTheDocument()}) 
    })
    
  });
});

const selectedTopic = "";
const questionLevel = "Easy";
const questionsRange = 10;
const userAgreed = false;
const isLogined = true;
const handleOpen = ()=>{return null;};
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

const setSelectedTopic = () => {
  return null;
};
const setQuestionLevel = () => {
  return null;
};
const setQuestionsRange = () => {
  return null;
};
const setUserAgreed = () => {
  return null;
};
