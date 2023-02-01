import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from "./App";

describe("<App />", () => {
  const server = setupServer(
    rest.get(
      "https://quizapi.io/api/v1/questions?apiKey=V7RxLSLo3E2DHXbKsRe3e6PLFsvCtlOg2GI8lJSh&tags=HTML&difficulty=Easy&limit=5",
      (req, res, ctx) => res(ctx.json(apiResponse))
    )
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test("show attention popup when user is bac after not finishing quiz ", () => {
    localStorage.setItem("User", JSON.stringify(userData));
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText("Attention!")).toBeInTheDocument();
  });

  test("snapshot App", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("call api for response ", () => {
    localStorage.setItem("User", JSON.stringify(userData));
   const app =  render(
      <BrowserRouter>
        <App userAgreed={true} />
      </BrowserRouter>
    );
    console.log(app)
  
  });
});

const userData = {
  name: "xvxvxxv",
  email: "xvxvxcv@gmail.com",
  password: "vxvxcv",
  selectedTopic: "HTML",
  providedQuestions: [
    {
      id: 1,
      question: "What is the correct HTML for making a text area?",
      options: [
        { id: 1, value: '<input type="textbox">' },
        { id: 2, value: "<textarea>" },
        { id: 3, value: '<input type="textarea">' },
        { id: 4, value: "<textbox>" },
      ],
      answer: { id: 2, value: "answer_b_correct" },
    },
    {
      id: 2,
      question: "Which tag creates a check box for a form in HTML?",
      options: [
        { id: 1, value: "<checkbox>" },
        { id: 2, value: "<input checkbox>" },
        { id: 3, value: "<input=checkbox>" },
        { id: 4, value: '<input type="checkbox">' },
      ],
      answer: { id: 4, value: "answer_d_correct" },
    },
    {
      id: 3,
      question: "HTML supports",
      options: [
        { id: 1, value: "ordered lists" },
        { id: 2, value: "unordered lists" },
        { id: 3, value: "both type of lists" },
        { id: 4, value: "does not support those types" },
      ],
      answer: { id: 3, value: "answer_c_correct" },
    },
    {
      id: 4,
      question: "How can you make A bulleted list with numbers?",
      options: [
        { id: 1, value: "<dl>" },
        { id: 2, value: "<ul>" },
        { id: 3, value: "<ol>" },
        { id: 4, value: "<list>" },
      ],
      answer: { id: 3, value: "answer_c_correct" },
    },
    {
      id: 5,
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
  ],
  provideQuestionsCount: 5,
  providedQuestionsLevel: "Easy",
  totalTimeProvided: 100,
  timeSpent: 44,
  userResponse: {
    1: { id: 2, value: "<textarea>" },
    2: { id: 2, value: "<input checkbox>" },
    3: { id: 2, value: "unordered lists" },
  },
  questionAttempted: 3,
  score: 1,
  allAttempted: false,
  accidentalClose: true,
};

const apiResponse = [
  {
    id: 527,
    question: "HTML supports",
    description: null,
    answers: {
      answer_a: "ordered lists",
      answer_b: "unordered lists",
      answer_c: "both type of lists",
      answer_d: "does not support those types",
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "false",
      answer_b_correct: "false",
      answer_c_correct: "true",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false",
    },
    correct_answer: "answer_a",
    explanation: null,
    tip: null,
    tags: [{ name: "HTML" }],
    category: "Linux",
    difficulty: "Easy",
  },
  {
    id: 476,
    question: "What should be the first tag in any HTML Document?",
    description: null,
    answers: {
      answer_a: "<html>",
      answer_b: "<!doctype html>",
      answer_c: "<title>",
      answer_d: "<head>",
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "false",
      answer_b_correct: "true",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false",
    },
    correct_answer: "answer_a",
    explanation: null,
    tip: null,
    tags: [{ name: "HTML" }],
    category: "Code",
    difficulty: "Easy",
  },
  {
    id: 162,
    question:
      "Which HTML element is used to specify a header for a document or section?",
    description: null,
    answers: {
      answer_a: "<top>",
      answer_b: "<header>",
      answer_c: "<head>",
      answer_d: "<section>",
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "false",
      answer_b_correct: "true",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false",
    },
    correct_answer: "answer_b",
    explanation: null,
    tip: null,
    tags: [{ name: "HTML" }],
    category: "Linux",
    difficulty: "Easy",
  },
  {
    id: 533,
    question: "In HTML document the tags",
    description: null,
    answers: {
      answer_a: "Should be written in upper case",
      answer_b: "can be written in both uppercase or lowercase",
      answer_c: "should be written in propercase",
      answer_d: "should be written in lower case",
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "false",
      answer_b_correct: "true",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false",
    },
    correct_answer: "answer_a",
    explanation: null,
    tip: null,
    tags: [{ name: "HTML" }],
    category: "Code",
    difficulty: "Easy",
  },
  {
    id: 543,
    question: "What is cite tag in HTML5?",
    description: null,
    answers: {
      answer_a: '<cite title"value">Some Text Here</cite>',
      answer_b: '<cite title:"value">Some Text Here</cite>',
      answer_c: '<cite title="value">Some Text Here</cite>',
      answer_d: null,
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "false",
      answer_b_correct: "false",
      answer_c_correct: "true",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false",
    },
    correct_answer: "answer_a",
    explanation: null,
    tip: null,
    tags: [{ name: "HTML" }],
    category: "Code",
    difficulty: "Easy",
  },
];
