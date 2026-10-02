import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ThemeProvider } from "react-jss";
import { MemoryRouter } from "react-router-dom";
import { jssTheme } from "../../../styles/theme";
import UserContext from "../../../contexts/UserContext";
import * as projectService from "../../../services/project.service";
import SubmissionsPage from "../SubmissionsPage";

jest.mock("../../../hooks/useSessionStorage", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require("react");
  return (key, initialValue) => React.useState(initialValue);
});

jest.mock("../../Layout/ContentContainerNoSidebar", () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="content-container">{children}</div>
}));

jest.mock("../../UI/UniversalSelect", () => ({
  __esModule: true,
  default: ({ value, options, onChange, name }) => (
    <select
      aria-label={name}
      name={name}
      value={value}
      onChange={e =>
        onChange({
          target: {
            value: e.target.value,
            name
          }
        })
      }
    >
      {options.map(option => (
        <option key={String(option.value)} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}));

jest.mock("../../../services/project.service");

const adminAccount = {
  email: "admin@example.com",
  firstName: "Admin",
  lastName: "User",
  isAdmin: true,
  isSecurityAdmin: false
};

const sampleProject = {
  id: 1,
  name: "Sample Project",
  authorFirstName: "Admin",
  authorLastName: "User",
  assignedFirstName: "Admin",
  assignedLastName: "User",
  address: "123 Main St",
  dateCreated: "2024-01-01T00:00:00.000Z",
  dateModified: "2024-01-02T00:00:00.000Z",
  dateSubmitted: "2024-01-03T00:00:00.000Z",
  dateStatus: "2024-01-04T00:00:00.000Z",
  dateSnapshotted: "2024-01-03T00:00:00.000Z",
  dateAssigned: null,
  dateInvoicePaid: null,
  dateCoO: null,
  loginId: 1,
  projectLevel: 1,
  droName: "Central",
  invoiceStatusName: "Paid",
  approvalStatusName: "Submitted",
  onHold: false
};

const renderPage = (account = adminAccount) =>
  render(
    <MemoryRouter>
      <UserContext.Provider value={{ account }}>
        <ThemeProvider theme={jssTheme}>
          <SubmissionsPage />
        </ThemeProvider>
      </UserContext.Provider>
    </MemoryRouter>
  );

describe("SubmissionsPage empty-state hardening", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("does not show empty-state copy while submissions are still loading", async () => {
    let resolveFetch;
    projectService.getSubmissions.mockReturnValue(
      new Promise(resolve => {
        resolveFetch = resolve;
      })
    );

    renderPage();

    expect(
      screen.queryByText("There are no TDM Plan submissions on this account.")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("No Saved Projects")).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(
        /Search Project By Name, Address, Description, Alt#/i
      )
    ).not.toBeVisible();
    expect(screen.queryByText("RESET FILTERS/SORT")).not.toBeVisible();
    expect(screen.queryByLabelText("Previous Page")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("perPage")).not.toBeInTheDocument();

    resolveFetch({ data: [] });

    expect(
      await screen.findByText(
        "There are no TDM Plan submissions on this account."
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Previous Page")).toBeInTheDocument();
    expect(screen.getByLabelText("perPage")).toBeInTheDocument();
  });

  test("shows empty-state copy after a successful empty fetch", async () => {
    projectService.getSubmissions.mockResolvedValue({ data: [] });

    renderPage();

    expect(
      await screen.findByText(
        "There are no TDM Plan submissions on this account."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please see "How to Submit a Snapshot\?" on the/)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute(
      "href",
      "/faqs"
    );
    expect(screen.queryByText("No Saved Projects")).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(
        /Search Project By Name, Address, Description, Alt#/i
      )
    ).not.toBeVisible();
    expect(screen.queryByText("RESET FILTERS/SORT")).not.toBeVisible();
    expect(screen.getByLabelText("Previous Page")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "1" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "0" })).not.toBeInTheDocument();
    expect(screen.queryByText("…")).not.toBeInTheDocument();
  });

  test("does not show empty-state copy when submissions are populated", async () => {
    projectService.getSubmissions.mockResolvedValue({
      data: [sampleProject]
    });

    renderPage();

    expect(await screen.findByText("Sample Project")).toBeInTheDocument();
    expect(
      screen.queryByText("There are no TDM Plan submissions on this account.")
    ).not.toBeInTheDocument();
    expect(
      screen.getByLabelText(
        /Search Project By Name, Address, Description, Alt#/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText("RESET FILTERS/SORT")).toBeInTheDocument();
    expect(screen.getByLabelText("Previous Page")).toBeInTheDocument();
    expect(screen.getByLabelText("perPage")).toBeInTheDocument();
  });

  test("does not show empty-state copy when the submissions fetch rejects", async () => {
    projectService.getSubmissions.mockRejectedValue(
      new Error("network failure")
    );

    renderPage();

    await waitFor(() => {
      expect(projectService.getSubmissions).toHaveBeenCalled();
    });

    expect(
      screen.queryByText("There are no TDM Plan submissions on this account.")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("No Saved Projects")).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(
        /Search Project By Name, Address, Description, Alt#/i
      )
    ).not.toBeVisible();
    expect(screen.queryByText("RESET FILTERS/SORT")).not.toBeVisible();
    expect(screen.queryByLabelText("Previous Page")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("perPage")).not.toBeInTheDocument();
  });

  test("All option stays finite when the successful fetch returns zero projects", async () => {
    projectService.getSubmissions.mockResolvedValue({ data: [] });
    const user = userEvent.setup();

    renderPage();

    expect(
      await screen.findByText(
        "There are no TDM Plan submissions on this account."
      )
    ).toBeInTheDocument();

    const perPageSelect = screen.getByLabelText("perPage");
    await user.selectOptions(perPageSelect, "All");

    expect(perPageSelect).toHaveValue("1");
    expect(screen.getByRole("link", { name: "1" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "0" })).not.toBeInTheDocument();
    expect(screen.queryByText("Infinity")).not.toBeInTheDocument();
    expect(screen.queryByText("…")).not.toBeInTheDocument();
  });

  test("keeps search available and does not show empty-state when filters match nothing", async () => {
    projectService.getSubmissions.mockResolvedValue({
      data: [sampleProject]
    });
    const user = userEvent.setup();

    renderPage();

    expect(await screen.findByText("Sample Project")).toBeInTheDocument();

    await user.type(
      screen.getByLabelText(
        /Search Project By Name, Address, Description, Alt#/i
      ),
      "zzz-no-match"
    );

    await waitFor(() => {
      expect(screen.queryByText("Sample Project")).not.toBeInTheDocument();
    });

    expect(
      screen.queryByText("There are no TDM Plan submissions on this account.")
    ).not.toBeInTheDocument();
    expect(screen.getByText("No Saved Projects")).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        /Search Project By Name, Address, Description, Alt#/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText("RESET FILTERS/SORT")).toBeInTheDocument();
  });
});
