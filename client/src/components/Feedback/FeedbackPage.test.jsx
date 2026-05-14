/* eslint-disable jest/no-disabled-tests */
import React from "react";
// import { Route } from "react-router-dom";
import FeedbackPage from "./FeedbackPage";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ToastContext from "../../contexts/Toast/ToastContext";
import { ThemeProvider } from "react-jss";
import { jssTheme } from "../../styles/theme";
import TdmAuthProvider from "../Layout/TdmAuthProvider";
import ConfigContext from "../../contexts/ConfigContext";

const add = jest.fn();
const remove = jest.fn();

jest.mock("../../services/feedback.service");

const account = {
  email: "some-email@somedomain.com"
};

describe("FeedbackPage", () => {
  let commentLabel;
  let commentTextBox;
  let forwardToWebTeamCheckBox;
  let submitButton;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    render(
      <ThemeProvider theme={jssTheme}>
        <ConfigContext.Provider value={{ CURRENT_CALCULATION_ID: 1 }}>
          <TdmAuthProvider>
            <ToastContext.Provider value={{ add, remove }}>
              <FeedbackPage account={account} />
            </ToastContext.Provider>
          </TdmAuthProvider>
        </ConfigContext.Provider>
      </ThemeProvider>
    );

    commentLabel = screen.getByLabelText(/^Comment/i);
    commentTextBox = screen.getByLabelText(/^Would you like your comment/i);
    forwardToWebTeamCheckBox = screen.getByLabelText(
      /^Would you like your comment/i
    );
    submitButton = screen.getByText(/^Submit/);
  });

  it("has fields for Feedback form", async () => {
    expect(commentLabel).toBeVisible();
    expect(commentTextBox).toBeVisible();
    expect(forwardToWebTeamCheckBox).toBeVisible();
    expect(submitButton).toBeVisible();
  });
});
