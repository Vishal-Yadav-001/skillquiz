import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./navbar.component";
import renderer from "react-test-renderer";

describe("Navbar", () => {
  test("should display Navbar", () => {
    const navbar = renderScreen();
    screen.debug();
    expect(screen.getByText("SkillScore").innerHTML).toBe("SkillScore");
  });
  test("should display login button when user is new", () => {
    localStorage.clear();
    const navbar = renderScreen();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
  test("should display logout button when user is has registered", () => {
    const navbar = render(<Navbar isLogined={true} />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
  test("should  logout  when user choose to logout", () => {
    const navbar = render(
      <Navbar
        navbarHeight={navbarHeight}
        handleDrawerToggle={handleDrawerToggle}
        setIsLogined={setIsLogined}
        user={user}
        isLogined={true}
      />,
      {
        wrapper: BrowserRouter,
      }
    );
    const button = screen.getAllByText("Logout")[0];
    act(() => {
      fireEvent.click(button);
    });
    expect(localStorage.getItem("User")).toBeNull();
  });

  test("snapshot", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
        <Navbar
          navbarHeight={navbarHeight}
          handleDrawerToggle={handleDrawerToggle}
          setIsLogined={setIsLogined}
          user={user}
          isLogined={true}
        />
        </BrowserRouter>
       
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

const renderScreen = () => {
  return render(<Navbar />, { wrapper: BrowserRouter });
};

const user = { name: "gfg", email: "cccc@gmail.com", password: "ccc" };
const navbarHeight = 65;
const handleDrawerToggle = () => {
  return null;
};
const setIsLogined = () => {
  return null;
};
