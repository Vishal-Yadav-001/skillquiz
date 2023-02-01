import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import ResponsiveDrawer from "./drawer.component";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("snapshot test",()=>{
    // beforeAll(() => {
    //     ReactDOM.createPortal = jest.fn((element, node) => {
    //       return element
    //     })
    //   })
    
    //   afterEach(() => {
    //     ReactDOM.createPortal.mockClear()
    //   })
    
    test(" drawer", () => {
      render(
        <ResponsiveDrawer
          questions={questions}
          navbarHeight={navbarHeight}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          handleClick={handleClick}
          attempts={attempts}
          window={() => {
            return window;
          }}
        />
      );
      const drawerButton = screen.getAllByRole("button")[0];
      expect(drawerButton).toHaveStyle("color: rgb(255, 255, 255); background-color: rgb(240, 101, 67); border-color: #f06543; transition: ease-in .75s;");
     
    });
})



const window = null;
 const questions = [
    {
      id: 1,
      question: "How do you round the number 7.25, to the nearest integer?",
      options: [
        {
          id: 1,
          value: "Math.round(7.25)",
        },
        {
          id: 2,
          value: "round(7.25)",
        },
        {
          id: 3,
          value: "rnd(7.25)",
        },
        {
          id: 4,
          value: "Math.rnd(7.25)",
        },
      ],
      answer: {
        id: 1,
        value: "answer_a_correct",
      },
    },
    {
      id: 2,
      question: 'How do you call a function named "myFunction"?',
      options: [
        {
          id: 1,
          value: "myFunction()",
        },
        {
          id: 2,
          value: "call myFunction()",
        },
        {
          id: 3,
          value: "call function myFunction()",
        },
      ],
      answer: {
        id: 1,
        value: "answer_a_correct",
      },
    },
    {
      id: 3,
      question: "How do you declare a JavaScript variable?",
      options: [
        {
          id: 1,
          value: "v carName;",
        },
        {
          id: 2,
          value: "variable carName;",
        },
        {
          id: 3,
          value: "var carName;",
        },
      ],
      answer: {
        id: 3,
        value: "answer_c_correct",
      },
    },
    {
      id: 4,
      question: "Which event occurs when the user clicks on an HTML element?",
      options: [
        {
          id: 1,
          value: "onchange",
        },
        {
          id: 2,
          value: "onmouseclick",
        },
        {
          id: 3,
          value: "onmouseover",
        },
        {
          id: 4,
          value: "onclick",
        },
      ],
      answer: {
        id: 4,
        value: "answer_d_correct",
      },
    },
    {
      id: 5,
      question:
        "What is the correct JavaScript syntax to change the content of the HTML element below?",
      options: [
        {
          id: 1,
          value: '#demo.innerHTML = "Hello World!";',
        },
        {
          id: 2,
          value: 'document.getElementById("demo").innerHTML = "Hello World!";',
        },
        {
          id: 3,
          value: 'document.getElement("p").innerHTML = "Hello World!";',
        },
        {
          id: 4,
          value: 'document.getElementByName("p").innerHTML = "Hello World!";',
        },
      ],
      answer: {
        id: 2,
        value: "answer_b_correct",
      },
    },
  ];
const navbarHeight = 64;
const mobileOpen = false;
const setMobileOpen = ()=>{
    return !mobileOpen;
}
const handleDrawerToggle = ()=>{
    return null;
}
const handleClick = ()=>{return null;}
const attempts = ["1"];