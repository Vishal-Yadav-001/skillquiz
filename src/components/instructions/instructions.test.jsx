import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Instructions from "./instructions.component";
import renderer from "react-test-renderer";
describe("Instructions", () => {
  test("Display Instructions", () => {
    const instructions = renderInstructions(false, true);
    expect(screen.getByTestId("Questions").innerHTML).toBe("Questions");
  });
  test("Start Button functionality", () => {
    const instructions = renderInstructions(false, true);
    const startButton = screen.getByText("Start");
    act(() => {
     fireEvent.click(startButton);
     expect(location?.pathname).toBe("/questions");
    });
  });
  // test("snapshot home component", async () => {
  //   const tree = renderer
  //     .create(
  //       <BrowserRouter>
  //         <Instructions
  //           open={true}
  //           handleClose={handleClose}
  //           levels={levels}
  //           limit={limit}
  //           questionLevel={questionLevel}
  //           setQuestionLevel={setQuestionLevel}
  //           questionsRange={questionsRange}
  //           setQuestionsRange={setQuestionsRange}
  //           userAgreed={false}
  //           setUserAgreed={setUserAgreed}
  //           isLogined={true}
  //         />
  //       </BrowserRouter>
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});

const renderInstructions = (userAgreed, isLogined) => {
  return render(
    <Instructions
      open={true}
      handleClose={handleClose}
      handleOpen={handleOpen}
      levels={levels}
      limit={limit}
      questionLevel={questionLevel}
      setQuestionLevel={setQuestionLevel}
      questionsRange={questionsRange}
      setQuestionsRange={setQuestionsRange}
      userAgreed={userAgreed}
      setUserAgreed={setUserAgreed}
      isLogined={isLogined}
    />,
    { wrapper: BrowserRouter }
  );
};

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
const questionLevel = "Easy";
const questionsRange = 5;
const handleClose = () => {
  return null;
};
const handleOpen = () => {
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
