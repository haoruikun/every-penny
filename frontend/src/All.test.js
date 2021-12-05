import { render, screen } from "@testing-library/react";
import Login from "./pages/login.jsx";
import SignUp from "./pages/signup.jsx";
import React from "react";
import Dashboard from "./pages/dashboard.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import Error from "./pages/Error.jsx";
import Copyright from "./components/copyright";

test("Login: renders sign in title", () => {
  render(
    <Login
      setLogin={() => {}}
      setSignUp={() => {}}
      setLoggedInUser={() => {}}
    />
  );
  const text = screen.getByText("Sign in");
  expect(text).toBeInTheDocument();
});

test("Login: renders sign up option", () => {
  render(
    <Login
      setLogin={() => {}}
      setSignUp={() => {}}
      setLoggedInUser={() => {}}
    />
  );
  const text = screen.getByText("Don't have an account? Sign Up");
  expect(text).toBeInTheDocument();
});

test("SignUp: renders sign up title", () => {
  render(
    <SignUp
      setLogin={() => {}}
      setSignUp={() => {}}
      setLoggedInUser={() => {}}
    />
  );
  const text = screen.getByText("Sign up");
  expect(text).toBeInTheDocument();
});

test("SignUp: renders login option", () => {
  render(
    <SignUp
      setLogin={() => {}}
      setSignUp={() => {}}
      setLoggedInUser={() => {}}
    />
  );
  const text = screen.getByText("Already have an account? Sign in");
  expect(text).toBeInTheDocument();
});

test("Dashboard: renders dashboard title", () => {
  render(
    <ThemeProvider theme={{}}>
      <BrowserRouter>
        <Dashboard
          login={true}
          username={"haoruikun"}
          currentPage={"Dashboard"}
          setLogin={() => {}}
          setLoggedInUser={() => {}}
          handleDrawerToggle={() => {}}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
  const text = screen.getByText("Dashboard");
  expect(text).toBeInTheDocument();
});

test("Dashboard: renders user's id", () => {
  const username = "haoruikun";
  render(
    <ThemeProvider theme={{}}>
      <BrowserRouter>
        <Dashboard
          login={true}
          username={username}
          currentPage={"Dashboard"}
          setLogin={() => {}}
          setLoggedInUser={() => {}}
          handleDrawerToggle={() => {}}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
  const text = screen.getByText(username);
  expect(text).toBeInTheDocument();
});

test("Error: renders error title", () => {
  render(
    <BrowserRouter>
      <Error />
    </BrowserRouter>
  );
  const text = screen.getByText("404: The page you are looking for isn’t here");
  expect(text).toBeInTheDocument();
});

test("Error: renders error description", () => {
  render(
    <BrowserRouter>
      <Error />
    </BrowserRouter>
  );
  const text = screen.getByText(
    "You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation"
  );
  expect(text).toBeInTheDocument();
});

test("Error: renders button to go back to dashboard", () => {
  render(
    <BrowserRouter>
      <Error />
    </BrowserRouter>
  );
  const text = screen.getByText("Go back to dashboard");
  expect(text).toBeInTheDocument();
});

test("Copyright: renders my name", () => {
  render(<Copyright />);
  const text = screen.getByText("Ruikun Hao");
  expect(text).toBeInTheDocument();
});
