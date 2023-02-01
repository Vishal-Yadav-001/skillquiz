import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Register from "./register.component";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("<Register/>", () => {
  test("snapshot <Register/>", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Register
            setIsLogined={setIsLogined}
            setNotification={setNotification}
            setShowNotification={setShowNotification}
            setUserAgreed={setUserAgreed}
          />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("Name field validations", async() => {
   
    render(
      <BrowserRouter>
        <Register
          setIsLogined={setIsLogined}
          setNotification={setNotification}
          setShowNotification={setShowNotification}
          setUserAgreed={setUserAgreed}
        />
      </BrowserRouter>
    );
    const nameInput = screen.getByTestId("userName");
    expect(nameInput).toBeInTheDocument();
   await act(async () => {
      fireEvent.change(nameInput, { target: { value: "bruce" } });
      await waitFor(() => {
        expect(nameInput.value).toBe("bruce");
      });
    });
        //Email
        const emailInput = screen.getByTestId("email");
        expect(emailInput).toBeInTheDocument();
        act(async () => {
          fireEvent.change(emailInput, { target: { value: "bruce123@gmail.com" } });
          await waitFor(() => {
            expect(emailInput.value).toBe("bruce123@gmail.com");
          });
        });
        //Password
        const passwordInput = screen.getByTestId("password");
        expect(passwordInput).toBeInTheDocument();
       await act(async () => {
          fireEvent.change(passwordInput, { target: { value: "bruce123" } });
          await waitFor(() => {
            expect(passwordInput.value).toBe("bruce123");
          });
        });

        const submitButton = screen.getByRole("button");
      await  act(async () => {
          fireEvent.click(submitButton);
          await waitFor(() => {
           expect(localStorage.getItem("User")).toBe(JSON.stringify(User));
          });
        });
  });

});

const setIsLogined = () => {
  return null;
};
const setNotification = () => {
  return null;
};
const setShowNotification = () => {
  return null;
};
const setUserAgreed = () => {
  return null;
};

const User = {
  name: "bruce",
  email: "bruce123@gmail.com",
  password: "bruce123",
};