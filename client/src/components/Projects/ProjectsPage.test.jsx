import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ProjectsPage from "./ProjectsPage";
import UserContext from "../../contexts/UserContext";
import CalculationsContext from "../../contexts/CalculationsContext";
import ConfigContext from "../../contexts/ConfigContext";
import ToastContext from "../../contexts/Toast/ToastContext";
import * as projectService from "../../services/project.service";
import * as projectResultService from "../../services/projectResult.service";
import * as projectShareService from "../../services/projectShare.service";

jest.mock("react-jss", () => {
  const { jssTheme } = jest.requireActual("../../styles/theme");
  return {
    __esModule: true,
    createUseStyles: () => () => ({}),
    useTheme: () => jssTheme,
    ThemeProvider: ({ children }) => children,
    JssProvider: ({ children }) => children
  };
});

const mockGetProjects = jest.fn();

jest.mock("../../hooks/useProject", () => ({
  __esModule: true,
  default: () => ({
    getProjects: (...args) => mockGetProjects(...args)
  })
}));

jest.mock("../../services/project.service", () => ({
  __esModule: true,
  getById: jest.fn(),
  post: jest.fn(),
  trash: jest.fn(),
  hide: jest.fn(),
  snapshot: jest.fn(),
  renameSnapshot: jest.fn(),
  updateCalculationId: jest.fn()
}));

jest.mock("../../services/projectResult.service", () => ({
  __esModule: true,
  populateTargetPoints: jest.fn()
}));

jest.mock("../../services/projectShare.service", () => ({
  __esModule: true,
  getByProjectId: jest.fn(),
  del: jest.fn()
}));

const mockHandleError = jest.fn();
jest.mock("../../hooks/useErrorHandler", () => () => mockHandleError);

jest.mock("../../helpers/FetchDroOptions", () => ({
  __esModule: true,
  fetchDroOptions: jest.fn(setDroOptions => setDroOptions([]))
}));

jest.mock("../../hooks/useCalculator", () => ({
  __esModule: true,
  default: () => [jest.fn(async () => [])]
}));

jest.mock("./fetchEngineRules", () => jest.fn(() => Promise.resolve([])));

jest.mock("react-to-print", () => ({
  __esModule: true,
  default: jest.fn(),
  useReactToPrint: jest.fn()
}));

jest.mock("../PdfPrint/PdfPrint", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef((props, ref) => <div ref={ref}>PdfPrint</div>)
  };
});

jest.mock("react-csv", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    CSVLink: forwardRef((props, ref) => <div ref={ref}>CSVLink</div>)
  };
});

// Fake, in-memory plans only. IDs are invented and never exist in any database.
const planA = {
  id: 101,
  name: "Fake Deleted A",
  dateTrashed: "2026-11-01T00:00:00.000Z"
};
const planC = {
  id: 310,
  name: "Fake Deleted C",
  dateTrashed: "2026-11-02T00:00:00.000Z"
};
const planE = {
  id: 500,
  name: "Fake Active E",
  dateTrashed: null
};
const COPY_NAME = "Fake Deleted A (COPY)";
const planD = {
  id: 412,
  name: COPY_NAME,
  dateTrashed: null
};

const makePlan = ({ id, name, dateTrashed }) => ({
  id,
  name,
  formInputs: JSON.stringify({ PROJECT_NAME: name }),
  address: "",
  projectName: "",
  description: "",
  adminNotes: "",
  firstName: "Fake",
  lastName: "Owner",
  loginId: 84,
  calculationId: 1,
  isCalculationIdOverride: false,
  targetPoints: 0,
  earnedPoints: 0,
  projectLevel: 1,
  droId: null,
  dateCreated: "2026-11-01T00:00:00.000Z",
  dateModified: "2026-11-01T00:00:00.000Z",
  dateTrashed,
  dateSnapshotted: null,
  dateSubmitted: null,
  dateHidden: null,
  dateInvoicePaid: null,
  shareCount: 0
});

let plans;

const renderPage = () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <UserContext.Provider
        value={{ account: { id: 84, isAdmin: true, isSecurityAdmin: true } }}
      >
        <ToastContext.Provider value={{ add: jest.fn(), remove: jest.fn() }}>
          <ConfigContext.Provider value={{ CURRENT_CALCULATION_ID: 1 }}>
            <CalculationsContext.Provider
              value={{ 1: { id: 1, version: "Fake v1", rules: [] } }}
            >
              <ProjectsPage contentContainerRef={{ current: null }} />
            </CalculationsContext.Provider>
          </ConfigContext.Provider>
        </ToastContext.Provider>
      </UserContext.Provider>
    </MemoryRouter>
  );
  return user;
};

const openDeletedTab = async user => {
  await user.click(await screen.findByText("Deleted TDM Plans"));
};

const openActiveTab = async user => {
  await user.click(screen.getByText("TDM Plans", { exact: true }));
};

const rowFor = name => screen.getByText(name).closest("tr");

const openRowMenu = async (user, name) => {
  const kebab = within(rowFor(name)).getByRole("button", {
    name: "context menu button"
  });
  await user.hover(kebab);
};

const duplicatePlanAFromDeletedTab = async user => {
  await openDeletedTab(user);
  await openRowMenu(user, planA.name);
  await user.click(await screen.findByText("Duplicate"));
  await user.click(
    await screen.findByRole("button", { name: "Create a Copy" })
  );
  await waitFor(() => expect(projectService.post).toHaveBeenCalledTimes(1));
  await waitFor(() =>
    expect(mockGetProjects.mock.calls.length).toBeGreaterThanOrEqual(2)
  );
};

const confirmDialogButton = dialog =>
  within(dialog).getByRole("button", { name: /^(Delete|Restore)$/ });

beforeEach(() => {
  jest.clearAllMocks();
  sessionStorage.clear();
  plans = [makePlan(planA), makePlan(planC), makePlan(planE)];

  mockGetProjects.mockImplementation(async () => plans.map(p => ({ ...p })));

  projectService.getById.mockImplementation(async id => ({
    data: makePlan(plans.find(p => p.id === id) || planA)
  }));

  projectService.post.mockImplementation(async newProject => {
    plans.push(makePlan({ ...planD, name: newProject.name }));
  });

  projectService.trash.mockResolvedValue({});
  projectResultService.populateTargetPoints.mockResolvedValue({});
  projectShareService.getByProjectId.mockResolvedValue({ data: [] });
});

describe("ProjectsPage: duplicate a deleted plan, then delete the copy in the same session", () => {
  it("first toolbar Delete after duplicating deleted A opens Delete for copy D, not Restore A", async () => {
    const user = renderPage();
    await duplicatePlanAFromDeletedTab(user);

    await openActiveTab(user);
    await user.click(
      await screen.findByRole("checkbox", {
        name: `Select TDM Plan ${COPY_NAME}`
      })
    );
    await user.click(screen.getByRole("button", { name: "Delete Projects" }));

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).queryByText("Restore TDM Plan from Trash")
    ).not.toBeInTheDocument();
    expect(within(dialog).getByText("Delete TDM Plan")).toBeInTheDocument();
    expect(within(dialog).getByText(COPY_NAME)).toBeInTheDocument();
  });

  it("confirming the first toolbar Delete trashes only copy D (412) and never original A (101)", async () => {
    const user = renderPage();
    await duplicatePlanAFromDeletedTab(user);

    await openActiveTab(user);
    await user.click(
      await screen.findByRole("checkbox", {
        name: `Select TDM Plan ${COPY_NAME}`
      })
    );
    await user.click(screen.getByRole("button", { name: "Delete Projects" }));

    const dialog = await screen.findByRole("dialog");
    await user.click(confirmDialogButton(dialog));

    await waitFor(() => expect(projectService.trash).toHaveBeenCalledTimes(1));
    expect(projectService.trash).toHaveBeenCalledWith([412], true);
    expect(projectService.trash).not.toHaveBeenCalledWith(
      [101],
      expect.anything()
    );
  });

  it("Cancel sends no trash call; reselecting copy D then Delete targets D only", async () => {
    const user = renderPage();
    await duplicatePlanAFromDeletedTab(user);

    await openActiveTab(user);
    const copyCheckbox = await screen.findByRole("checkbox", {
      name: `Select TDM Plan ${COPY_NAME}`
    });
    await user.click(copyCheckbox);
    await user.click(screen.getByRole("button", { name: "Delete Projects" }));
    await user.click(
      within(await screen.findByRole("dialog")).getByRole("button", {
        name: "Cancel"
      })
    );
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(projectService.trash).not.toHaveBeenCalled();

    await user.click(copyCheckbox);
    await user.click(screen.getByRole("button", { name: "Delete Projects" }));

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText("Delete TDM Plan")).toBeInTheDocument();
    await user.click(confirmDialogButton(dialog));

    await waitFor(() => expect(projectService.trash).toHaveBeenCalledTimes(1));
    expect(projectService.trash).toHaveBeenCalledWith([412], true);
  });

  it("after Copy is cancelled, a checked active plan E targets E, not stale A", async () => {
    const user = renderPage();
    await openDeletedTab(user);
    await openRowMenu(user, planA.name);
    await user.click(await screen.findByText("Duplicate"));
    await user.click(
      within(await screen.findByRole("dialog")).getByRole("button", {
        name: "Cancel"
      })
    );
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(projectService.post).not.toHaveBeenCalled();

    await openActiveTab(user);
    await user.click(
      await screen.findByRole("checkbox", {
        name: `Select TDM Plan ${planE.name}`
      })
    );
    await user.click(screen.getByRole("button", { name: "Delete Projects" }));

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).queryByText("Restore TDM Plan from Trash")
    ).not.toBeInTheDocument();
    expect(within(dialog).getByText(planE.name)).toBeInTheDocument();
    await user.click(confirmDialogButton(dialog));

    await waitFor(() => expect(projectService.trash).toHaveBeenCalledTimes(1));
    expect(projectService.trash).toHaveBeenCalledWith([500], true);
  });

  it("after Copy fails, a checked active plan E targets E, not stale A", async () => {
    projectService.post.mockRejectedValueOnce(new Error("fake copy failure"));
    const user = renderPage();
    await openDeletedTab(user);
    await openRowMenu(user, planA.name);
    await user.click(await screen.findByText("Duplicate"));
    await user.click(
      await screen.findByRole("button", { name: "Create a Copy" })
    );
    await waitFor(() => expect(mockHandleError).toHaveBeenCalledTimes(1));

    await openActiveTab(user);
    await user.click(
      await screen.findByRole("checkbox", {
        name: `Select TDM Plan ${planE.name}`
      })
    );
    await user.click(screen.getByRole("button", { name: "Delete Projects" }));

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).queryByText("Restore TDM Plan from Trash")
    ).not.toBeInTheDocument();
    await user.click(confirmDialogButton(dialog));

    await waitFor(() => expect(projectService.trash).toHaveBeenCalledTimes(1));
    expect(projectService.trash).toHaveBeenCalledWith([500], true);
  });

  it("two checked active plans, after a duplicate, trash exactly the checked set", async () => {
    const user = renderPage();
    await duplicatePlanAFromDeletedTab(user);

    await openActiveTab(user);
    await user.click(
      await screen.findByRole("checkbox", {
        name: `Select TDM Plan ${COPY_NAME}`
      })
    );
    await user.click(
      screen.getByRole("checkbox", { name: `Select TDM Plan ${planE.name}` })
    );
    await user.click(screen.getByRole("button", { name: "Delete Projects" }));

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).queryByText("Restore TDM Plan from Trash")
    ).not.toBeInTheDocument();
    await user.click(confirmDialogButton(dialog));

    await waitFor(() => expect(projectService.trash).toHaveBeenCalledTimes(1));
    expect(projectService.trash).toHaveBeenCalledWith([412, 500], true);
    expect(projectService.trash).not.toHaveBeenCalledWith(
      [101],
      expect.anything()
    );
  });

  it("row-menu Delete with nothing checked uses the clicked row E, not stale A", async () => {
    const user = renderPage();
    await duplicatePlanAFromDeletedTab(user);

    await openActiveTab(user);
    await openRowMenu(user, planE.name);
    await user.click(await screen.findByText("Delete"));

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText("Delete TDM Plan")).toBeInTheDocument();
    expect(within(dialog).getByText(planE.name)).toBeInTheDocument();
    await user.click(confirmDialogButton(dialog));

    await waitFor(() => expect(projectService.trash).toHaveBeenCalledTimes(1));
    expect(projectService.trash).toHaveBeenCalledWith([500], true);
  });

  it("on Deleted tab after duplicate, Restore of checked deleted C targets C, not stale A", async () => {
    const user = renderPage();
    await duplicatePlanAFromDeletedTab(user);

    await user.click(
      screen.getByRole("checkbox", {
        name: `Select TDM Plan ${planC.name}`
      })
    );
    await user.click(screen.getByRole("button", { name: "Restore Projects" }));

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByText("Restore TDM Plan from Trash")
    ).toBeInTheDocument();
    expect(within(dialog).getByText(planC.name)).toBeInTheDocument();
    expect(within(dialog).queryByText(planA.name)).not.toBeInTheDocument();
    await user.click(confirmDialogButton(dialog));

    await waitFor(() => expect(projectService.trash).toHaveBeenCalledTimes(1));
    expect(projectService.trash).toHaveBeenCalledWith([310], false);
    expect(projectService.trash).not.toHaveBeenCalledWith(
      [101],
      expect.anything()
    );
  });

  it("with nothing checked, the toolbar Delete button is disabled", async () => {
    renderPage();
    await openActiveTab(userEvent.setup());
    expect(
      await screen.findByRole("button", { name: "Delete Projects" })
    ).toBeDisabled();
    expect(projectService.trash).not.toHaveBeenCalled();
  });
});
