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
  formInputs: "{}",
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

const regularAccount = {
  email: "user@example.com",
  firstName: "Regular",
  lastName: "User",
  isAdmin: false,
  isSecurityAdmin: false
};

const NO_MATCH_MESSAGE =
  "No TDM Plans with that search/filter/sort criteria";

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
    expect(screen.queryByText(NO_MATCH_MESSAGE)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/^Search submissions$/i)).not.toBeVisible();
    expect(
      screen.queryByText("RESET SEARCH / FILTER / SORT")
    ).not.toBeVisible();
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
    expect(screen.queryByText(NO_MATCH_MESSAGE)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/^Search submissions$/i)).not.toBeVisible();
    expect(
      screen.queryByText("RESET SEARCH / FILTER / SORT")
    ).not.toBeVisible();
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
    expect(screen.queryByText(NO_MATCH_MESSAGE)).not.toBeInTheDocument();
    expect(screen.queryByText("No Saved Projects")).not.toBeInTheDocument();
    expect(screen.getByLabelText(/^Search submissions$/i)).toBeInTheDocument();
    expect(
      screen.getByText("RESET SEARCH / FILTER / SORT")
    ).toBeInTheDocument();
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
    expect(screen.queryByText(NO_MATCH_MESSAGE)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/^Search submissions$/i)).not.toBeVisible();
    expect(
      screen.queryByText("RESET SEARCH / FILTER / SORT")
    ).not.toBeVisible();
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
      screen.getByLabelText(/^Search submissions$/i),
      "zzz-no-match"
    );

    await waitFor(() => {
      expect(screen.queryByText("Sample Project")).not.toBeInTheDocument();
    });

    expect(
      screen.queryByText("There are no TDM Plan submissions on this account.")
    ).not.toBeInTheDocument();
    expect(screen.getByText(NO_MATCH_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText(NO_MATCH_MESSAGE).closest("td")).toBeNull();
    expect(screen.queryByText("No Saved Projects")).not.toBeInTheDocument();
    expect(screen.getByLabelText(/^Search submissions$/i)).toBeInTheDocument();
    expect(
      screen.getByText("RESET SEARCH / FILTER / SORT")
    ).toBeInTheDocument();

    await user.click(screen.getByText("RESET SEARCH / FILTER / SORT"));

    expect(await screen.findByText("Sample Project")).toBeInTheDocument();
    expect(screen.queryByText(NO_MATCH_MESSAGE)).not.toBeInTheDocument();
  });

  test("shows no-match feedback when a column filter hides every row, then restores rows on reset", async () => {
    projectService.getSubmissions.mockResolvedValue({
      data: [sampleProject]
    });
    const user = userEvent.setup();

    renderPage(regularAccount);

    expect(await screen.findByText("Sample Project")).toBeInTheDocument();
    expect(screen.queryByText(NO_MATCH_MESSAGE)).not.toBeInTheDocument();

    await user.click(screen.getByText("On Hold"));
    await user.click(screen.getByRole("radio", { name: "Not selected On Hold" }));
    await user.click(screen.getByRole("button", { name: "Apply" }));

    await waitFor(() => {
      expect(screen.queryByText("Sample Project")).not.toBeInTheDocument();
    });

    expect(screen.getByText(NO_MATCH_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText(NO_MATCH_MESSAGE).closest("td")).toBeNull();
    expect(screen.queryByText("No Saved Projects")).not.toBeInTheDocument();
    expect(
      screen.queryByText("There are no TDM Plan submissions on this account.")
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("RESET SEARCH / FILTER / SORT")
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "RESET SEARCH / FILTER / SORT" })
    );

    expect(await screen.findByText("Sample Project")).toBeInTheDocument();
    expect(screen.queryByText(NO_MATCH_MESSAGE)).not.toBeInTheDocument();
  });
});
const SEARCH_HINT =
  "Search by TDM Plan Name, Development Project Name, Address, Alt No.";

const searchRow = overrides => ({
  ...sampleProject,
  projectName: "Untouched Development",
  formInputs: "{}",
  assignedFirstName: "Pat",
  assignedLastName: "Unrelated",
  ...overrides
});

describe("SubmissionsPage Alt No. search", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("matches Alt No. and still matches plan, project, and address", async () => {
    projectService.getSubmissions.mockResolvedValue({
      data: [
        searchRow({
          id: 11,
          name: "Maple Towers",
          projectName: "Maple Development",
          address: "100 Maple St",
          formInputs: JSON.stringify({ VERSION_NO: "ALT-742Q" })
        }),
        searchRow({
          id: 12,
          name: "Cedar Court",
          projectName: "Cedar Homes",
          address: "200 Cedar St",
          assignedFirstName: "Pat",
          assignedLastName: "UniqueAgentSurname",
          formInputs: JSON.stringify({ VERSION_NO: "ALT-915X" })
        })
      ]
    });
    const user = userEvent.setup();

    renderPage();

    const search = await screen.findByLabelText("Search submissions");
    expect(search).toHaveAttribute("placeholder", SEARCH_HINT);
    expect(screen.getByText("Staff Assigned")).toBeInTheDocument();

    await user.type(search, "742q");
    expect(await screen.findByText("Maple Towers")).toBeInTheDocument();
    expect(screen.queryByText("Cedar Court")).not.toBeInTheDocument();

    await user.clear(search);
    await user.type(search, "UniqueAgentSurname");
    expect(await screen.findByText(NO_MATCH_MESSAGE)).toBeInTheDocument();
    expect(
      screen.queryByText("There are no TDM Plan submissions on this account.")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Maple Towers")).not.toBeInTheDocument();
    expect(screen.getByText("Staff Assigned")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "RESET SEARCH / FILTER / SORT" })
    );
    expect(await screen.findByText("Maple Towers")).toBeInTheDocument();
    expect(screen.getByText("Cedar Court")).toBeInTheDocument();
    expect(screen.queryByText(NO_MATCH_MESSAGE)).not.toBeInTheDocument();

    await user.type(screen.getByLabelText("Search submissions"), "Cedar Court");
    expect(await screen.findByText("Cedar Court")).toBeInTheDocument();
    expect(screen.queryByText("Maple Towers")).not.toBeInTheDocument();

    await user.clear(screen.getByLabelText("Search submissions"));
    await user.type(screen.getByLabelText("Search submissions"), "cedar homes");
    expect(screen.getByText("Cedar Court")).toBeInTheDocument();
    expect(screen.queryByText("Maple Towers")).not.toBeInTheDocument();

    await user.clear(screen.getByLabelText("Search submissions"));
    await user.type(screen.getByLabelText("Search submissions"), "100 maple");
    expect(screen.getByText("Maple Towers")).toBeInTheDocument();
    expect(screen.queryByText("Cedar Court")).not.toBeInTheDocument();
  });

  test("treats a numeric Alt No. as text and ignores a blank one", async () => {
    projectService.getSubmissions.mockResolvedValue({
      data: [
        searchRow({
          id: 21,
          name: "Numbered Plan",
          formInputs: JSON.stringify({ VERSION_NO: 4242 })
        }),
        searchRow({
          id: 22,
          name: "Blank Plan",
          formInputs: "{}"
        })
      ]
    });
    const user = userEvent.setup();

    renderPage();

    await user.type(await screen.findByLabelText("Search submissions"), "4242");

    expect(await screen.findByText("Numbered Plan")).toBeInTheDocument();
    expect(screen.queryByText("Blank Plan")).not.toBeInTheDocument();
    expect(screen.queryByText(NO_MATCH_MESSAGE)).not.toBeInTheDocument();
  });

  test("returns to page 1 when a search is typed from a later page", async () => {
    const rows = Array.from({ length: 11 }, (_, index) =>
      searchRow({
        id: 30 + index,
        name: index === 10 ? "Last Page Plan" : `Early Plan ${index}`,
        dateStatus:
          index === 10
            ? "2020-01-01T00:00:00.000Z"
            : "2024-01-04T00:00:00.000Z",
        formInputs: "{}"
      })
    );
    projectService.getSubmissions.mockResolvedValue({ data: rows });
    const user = userEvent.setup();

    renderPage();

    expect(await screen.findByText("Early Plan 0")).toBeInTheDocument();
    expect(screen.queryByText("Last Page Plan")).not.toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "2" }));
    expect(await screen.findByText("Last Page Plan")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Search submissions"), "Last Page");

    expect(await screen.findByText("Last Page Plan")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "2" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "1" })).toBeInTheDocument();
  });
});
