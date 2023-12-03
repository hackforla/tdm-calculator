/* eslint-disable jest/no-disabled-tests */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import FeedbackPage from "./FeedbackPage";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ToastContext from "../../contexts/Toast/ToastContext";
import { ThemeProvider } from "react-jss";
import { jssTheme } from "../../styles/theme";

const add = jest.fn();
const remove = jest.fn();

jest.mock("../../services/feedback.service");

const account = {
  email: "some-email@somedomain.com"
};

describe("FeedbackPage", () => {
  let nameTextBox;
  let emailTextBox;
  let commentTextBox;
  let forwardToWebTeamCheckBox;
  let submitButton;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    render(
      <ThemeProvider theme={jssTheme}>
        <BrowserRouter>
          <ToastContext.Provider value={{ add, remove }}>
            <FeedbackPage account={account} />
          </ToastContext.Provider>
        </BrowserRouter>
      </ThemeProvider>
    );

    nameTextBox = screen.getByLabelText(/^Name/i);
    emailTextBox = screen.getByLabelText(/^Email Address/);
    commentTextBox = screen.getByLabelText(/^Would you like your comment/i);
    forwardToWebTeamCheckBox = screen.getByLabelText(
      /^Would you like your comment/i
    );
    submitButton = screen.getByText(/^Submit/);
  });

  it("has fields for Feedback form", async () => {
    expect(nameTextBox).toBeVisible();
    expect(emailTextBox).toBeVisible();
    expect(commentTextBox).toBeVisible();
    expect(forwardToWebTeamCheckBox).toBeVisible();
    expect(submitButton).toBeVisible();
  });
});
