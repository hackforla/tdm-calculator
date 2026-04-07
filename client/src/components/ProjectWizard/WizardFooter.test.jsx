import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WizardFooter from "./WizardFooter";

// We need to mock UserContext and CalculationsContext
import UserContext from "../../contexts/UserContext";
import CalculationsContext from "../../contexts/CalculationsContext";

jest.mock("../PdfPrint/PdfPrint", () => ({
  PdfPrint: () => <div data-testid="pdf-print-mock" />
}));

describe("WizardFooter Navigation Buttons", () => {
  const mockOnPageChange = jest.fn();
  const defaultProps = {
    rules: [
      { code: "PROJECT_NAME", value: "Test" },
      { code: "PROJECT_LEVEL", value: 1 },
      { code: "TARGET_POINTS_PARK", value: 0 },
      { code: "PTS_EARNED", value: 0 }
    ],
    page: 1,
    onPageChange: mockOnPageChange,
    pageNumber: 1,
    isFinalPage: false,
    setDisabledForNextNavButton: jest.fn(() => false),
    setDisabledSaveButton: jest.fn(() => false),
    setDisplaySaveButton: jest.fn(() => true),
    onSave: jest.fn(),
    project: { id: 1, loginId: 1 },
    shareView: false
  };

  const defaultUserContext = { account: { id: 1, isAdmin: false } };

  const renderComponent = (props = {}) => {
    return render(
      <UserContext.Provider value={defaultUserContext}>
        <CalculationsContext.Provider value={{}}>
          <WizardFooter {...defaultProps} {...props} />
        </CalculationsContext.Provider>
      </UserContext.Provider>
    );
  };

  it("renders correctly with default props", () => {
    renderComponent();
    expect(screen.getByText("Save Project")).toBeInTheDocument();
  });

  it("renders persistent numbered links for all 5 pages regardless of current page", () => {
    const { rerender } = renderComponent({ page: 4 });
    // User is on page 4. Links for 1, 2, 3, 4, 5 should be displayed.
    expect(
      screen.getByRole("link", { name: /go to page 1/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go to page 2/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go to page 3/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go to page 4/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go to page 5/i })
    ).toBeInTheDocument();

    // User navigates back to page 2
    rerender(
      <UserContext.Provider value={defaultUserContext}>
        <CalculationsContext.Provider value={{}}>
          <WizardFooter {...defaultProps} page={2} />
        </CalculationsContext.Provider>
      </UserContext.Provider>
    );

    // Links should represent all [1, 2, 3, 4, 5]
    expect(
      screen.getByRole("link", { name: /go to page 1/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go to page 2/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go to page 3/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go to page 4/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go to page 5/i })
    ).toBeInTheDocument();
  });
});
