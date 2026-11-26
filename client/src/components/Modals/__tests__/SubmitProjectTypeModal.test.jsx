import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReactModal from "react-modal";
import SubmitProjectTypeModal from "../SubmitProjectTypeModal";
import * as projectService from "../../../services/project.service";
import { ThemeProvider } from "react-jss";
import { jssTheme } from "../../../styles/theme";

const mockToastAdd = jest.fn();

jest.mock("../../../services/project.service", () => ({
  submit: jest.fn(),
  verifyReplacement: jest.fn(),
  replaceByProject: jest.fn()
}));

jest.mock("../../../contexts/Toast", () => ({
  useToast: () => ({
    add: mockToastAdd,
    remove: jest.fn()
  })
}));

describe("SubmitProjectTypeModal Component", () => {
  const mockOnClose = jest.fn();
  const mockProject = {
    id: 999,
    name: "Replacement Snapshot Project"
  };

  let rootEl;

  beforeAll(() => {
    rootEl = document.createElement("div");
    rootEl.setAttribute("id", "root");
    document.body.appendChild(rootEl);
    ReactModal.setAppElement(rootEl);
  });

  afterAll(() => {
    document.body.removeChild(rootEl);
  });

  const renderComponent = (props = {}) => {
    return render(
      <ThemeProvider theme={jssTheme}>
        <SubmitProjectTypeModal
          mounted={true}
          onClose={mockOnClose}
          project={mockProject}
          {...props}
        />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it("renders correctly with submission options and disabled submit button", () => {
    renderComponent();

    expect(screen.getByText("Select Submission Type")).toBeInTheDocument();
    expect(screen.getByLabelText("New TDM Plan")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Replacement for previously submitted TDM Plan")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "CANCEL" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SUBMIT" })).toBeDisabled();
  });

  it("dismisses modal when CANCEL is clicked", () => {
    renderComponent();

    const cancelButton = screen.getByRole("button", { name: "CANCEL" });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledWith();
  });

  it("handles New TDM Plan submission workflow", async () => {
    projectService.submit.mockResolvedValueOnce({ status: 204 });
    renderComponent();

    const newPlanRadio = screen.getByLabelText("New TDM Plan");
    fireEvent.click(newPlanRadio);

    const submitButton = screen.getByRole("button", { name: "SUBMIT" });
    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(projectService.submit).toHaveBeenCalledWith({ id: 999 });
      expect(mockOnClose).toHaveBeenCalledWith("ok");
    });
  });

  it("displays Previous TDM Plan ID input and validates 10 digits when Replacement is selected", () => {
    renderComponent();

    const replacementRadio = screen.getByLabelText(
      "Replacement for previously submitted TDM Plan"
    );
    fireEvent.click(replacementRadio);

    expect(screen.getByText("Previous TDM Plan ID")).toBeInTheDocument();
    expect(
      screen.getByText("Previous TDM Plan must have been withdrawn by LADOT.")
    ).toBeInTheDocument();

    const input = screen.getByPlaceholderText("00000-00000");
    const submitButton = screen.getByRole("button", { name: "SUBMIT" });

    // Incomplete input (< 10 digits) keeps button disabled
    fireEvent.change(input, { target: { value: "12345" } });
    expect(input.value).toBe("12345");
    expect(submitButton).toBeDisabled();

    // 10 digits formatted properly enables button
    fireEvent.change(input, { target: { value: "0000000123" } });
    expect(input.value).toBe("00000-00123");
    expect(submitButton).toBeEnabled();
  });

  it("reports 'Unable to find TDM Plan ID' error when plan is not found in database", async () => {
    projectService.verifyReplacement.mockRejectedValueOnce({
      response: {
        status: 404,
        data: { error: "Unable to find TDM Plan ID" }
      }
    });

    renderComponent();

    const replacementRadio = screen.getByLabelText(
      "Replacement for previously submitted TDM Plan"
    );
    fireEvent.click(replacementRadio);

    const input = screen.getByPlaceholderText("00000-00000");
    fireEvent.change(input, { target: { value: "0000000123" } });

    const submitButton = screen.getByRole("button", { name: "SUBMIT" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(projectService.verifyReplacement).toHaveBeenCalledWith(123);
      expect(
        screen.getByText("Unable to find TDM Plan ID")
      ).toBeInTheDocument();
      expect(projectService.replaceByProject).not.toHaveBeenCalled();
      expect(projectService.submit).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  it("reports 'Unable to find withdrawn submission for that project ID.' when plan is not withdrawn", async () => {
    projectService.verifyReplacement.mockRejectedValueOnce({
      response: {
        status: 409,
        data: {
          error: "Unable to find withdrawn submission for that project ID."
        }
      }
    });

    renderComponent();

    const replacementRadio = screen.getByLabelText(
      "Replacement for previously submitted TDM Plan"
    );
    fireEvent.click(replacementRadio);

    const input = screen.getByPlaceholderText("00000-00000");
    fireEvent.change(input, { target: { value: "0000000123" } });

    const submitButton = screen.getByRole("button", { name: "SUBMIT" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(projectService.verifyReplacement).toHaveBeenCalledWith(123);
      expect(
        screen.getByText(
          "Unable to find withdrawn submission for that project ID."
        )
      ).toBeInTheDocument();
      expect(projectService.replaceByProject).not.toHaveBeenCalled();
      expect(projectService.submit).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  it("executes the full base feature workflow for replacement submission", async () => {
    projectService.verifyReplacement.mockResolvedValueOnce({
      data: { valid: true }
    });
    projectService.replaceByProject.mockResolvedValueOnce({ status: 204 });
    projectService.submit.mockResolvedValueOnce({ status: 204 });

    renderComponent();

    const replacementRadio = screen.getByLabelText(
      "Replacement for previously submitted TDM Plan"
    );
    fireEvent.click(replacementRadio);

    const input = screen.getByPlaceholderText("00000-00000");
    fireEvent.change(input, { target: { value: "0000000123" } });

    const submitButton = screen.getByRole("button", { name: "SUBMIT" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // 1. Verify previously submitted project (ID: 123)
      expect(projectService.verifyReplacement).toHaveBeenCalledWith(123);

      // 2. Update replacedByProjectId of previously submitted project (123) to active project (999)
      expect(projectService.replaceByProject).toHaveBeenCalledWith({
        id: 123,
        replacedByProjectId: 999
      });

      // 3. Follow submission workflow for active project (999)
      expect(projectService.submit).toHaveBeenCalledWith({ id: 999 });

      // 4. Advance wizard to confirmation modal
      expect(mockOnClose).toHaveBeenCalledWith("ok");
    });
  });
});
