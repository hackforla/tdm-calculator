import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { useNavigate, useParams } from "react-router-dom";
import * as accountService from "../../services/account.service";
import { useToast } from "../../contexts/Toast";
import ResetPassword from "./ResetPassword";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useParams: jest.fn()
}));
jest.mock("../../services/account.service", () => ({
  resetPassword: jest.fn()
}));
jest.mock("../../contexts/Toast", () => ({ useToast: jest.fn() }));

describe("ResetPassword", () => {
  const navigate = jest.fn();
  const addToast = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    useNavigate.mockReturnValue(navigate);
    useParams.mockReturnValue({ token: "reset-token" });
    useToast.mockReturnValue({ add: addToast });
    accountService.resetPassword.mockResolvedValue({
      data: { isSuccess: true, email: "user@example.com" }
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  const submitPassword = async () => {
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "NewPassword123!" }
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "NewPassword123!" }
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() =>
      expect(accountService.resetPassword).toHaveBeenCalled()
    );
  };

  it("focuses the password on mount without stealing focus on rerender", async () => {
    const { rerender } = render(<ResetPassword />);
    expect(screen.getByPlaceholderText("Password")).toHaveFocus();
    await act(async () => {
      screen.getByPlaceholderText("Confirm Password").focus();
    });

    rerender(<ResetPassword />);

    expect(screen.getByPlaceholderText("Confirm Password")).toHaveFocus();
    act(() => jest.advanceTimersByTime(2000));
    expect(navigate).not.toHaveBeenCalled();
  });

  it("shows confirmation and redirects once after two seconds", async () => {
    const { rerender } = render(<ResetPassword />);
    await submitPassword();

    expect(accountService.resetPassword).toHaveBeenCalledWith({
      token: "reset-token",
      password: "NewPassword123!"
    });
    expect(
      screen.getByRole("heading", { name: "Password Reset Successful!" })
    ).toBeInTheDocument();
    expect(addToast).toHaveBeenCalledWith(
      "Your password has been reset. Please log in."
    );
    act(() => jest.advanceTimersByTime(1000));
    rerender(<ResetPassword />);
    act(() => jest.advanceTimersByTime(999));
    expect(navigate).not.toHaveBeenCalled();
    act(() => jest.advanceTimersByTime(1));
    expect(navigate).toHaveBeenCalledWith("/login/user@example.com");
    act(() => jest.advanceTimersByTime(2000));
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it("cancels the redirect when unmounted", async () => {
    const { unmount } = render(<ResetPassword />);
    await submitPassword();

    unmount();
    act(() => jest.advanceTimersByTime(2000));

    expect(navigate).not.toHaveBeenCalled();
  });

  it("keeps the form and shows the server error when the reset fails", async () => {
    accountService.resetPassword.mockResolvedValue({
      data: { isSuccess: false, message: "Reset token has expired" }
    });
    render(<ResetPassword />);
    await submitPassword();

    expect(screen.getByText("Reset token has expired")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(2000));
    expect(navigate).not.toHaveBeenCalled();
    expect(addToast).not.toHaveBeenCalled();
  });
});
