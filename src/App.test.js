import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("inputs should be initially empty", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

test("should be able to type an email", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  userEvent.type(emailInputElement, "selena@gmail.com");
  expect(emailInputElement.value).toBe("selena@gmail.com");
});

test("should be able to type a password", () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText("Password");
  userEvent.type(passwordInputElement, "Password123");
  expect(passwordInputElement.value).toBe("Password123");
});

test("should be able to type a confirmed password", () => {
  render(<App />);
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  userEvent.type(confirmPasswordInputElement, "Password123");
  expect(confirmPasswordInputElement.value).toBe("Password123");
});

test("should show email error message on invalid email", () => {
  render(<App />);

  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "selenagmail.com");
  userEvent.click(submitBtnElement);

  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i
  );
  // This test seems to fail for some reason.
  expect(emailErrorElementAgain).toBeInTheDocument();
});

test("if we input a correct email but enter a password less than 5 characters, should show error message", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });

  userEvent.type(emailInputElement, "laith@hotmail.com");

  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(passwordInputElement, "123");
  userEvent.click(submitBtnElement);

  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  // This test seems to fail for some reason.
  expect(passwordErrorElement).toBeInTheDocument();
});

test("if we input a correct email but enter an appropriate password that doesn't match the confirmed password, should show error message", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords don't match. try again./i
  );
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });

  userEvent.type(emailInputElement, "laith@hotmail.com");
  userEvent.type(passwordInputElement, "12345");

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  userEvent.type(confirmPasswordInputElement, "123456");

  userEvent.click(submitBtnElement);

  const confirmPasswordErrorElementAgain = screen.queryByText(
    /the passwords don't match. try again./i
  );

  // This test seems to fail for some reason.
  expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
});

// test("renders learn react link", () => {
//   // 1) Rendering the component we want to test.
//   render(<App />);

//   // 2) Finding the elements.
//   const linkElement = screen.getByText(/learn react/i);

//   // 3) Assertion.
//   expect(linkElement).toBeInTheDocument();
// });

// test("description", () => {});
