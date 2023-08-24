import React from "react";
import { BrowserRouter } from "react-router-dom";
import PublicCommentPage from "./PublicCommentPage";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { postPublicComment } from "./postPublicComment";

describe("PublicCommentFormPage", () => {
  // eslint-disable-next-line jest/no-disabled-tests
  it("has fields for PublicComment form", () => {
    render(
      <BrowserRouter>
        <PublicCommentPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/tdm calculator feedback form/i)).toBeVisible();
    expect(screen.getByPlaceholderText(/name/i)).toBeVisible();
    expect(screen.getByPlaceholderText(/email/i)).toBeVisible();
    expect(screen.getByPlaceholderText(/comment/i)).toBeVisible();
    expect(
      screen.getByRole("checkbox", /forward to ladot \/ developers/i)
    ).toBeVisible();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip("fills out form and saves public comment", async () => {
    render(
      <BrowserRouter>
        <PublicCommentPage />
      </BrowserRouter>
    );

    await userEvent.type(screen.getByPlaceholderText(/name/i), "some name");
    await userEvent.type(screen.getByPlaceholderText(/email/i), "some email");
    await userEvent.type(
      screen.getByPlaceholderText(/comment/i),
      "some comment"
    );
    // await userEvent.type(screen.getByRole('checkbox', /forward to ladot \/ developers/i))

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await new Promise(resolve => setImmediate(resolve));

    expect(postPublicComment).toHaveBeenCalledTimes(1);
    expect(postPublicComment).toHaveBeenCalledWith({
      name: "some name",
      email: "some email",
      comment: "some comment"
    });
  });
});
