import React from "react";
import { BrowserRouter } from "react-router-dom";
import ProjectTableRow from "./ProjectTableRow";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("react-to-print", () => ({
  __esModule: true,
  default: jest.fn(),
  useReactToPrint: jest.fn()
}));

// Set up a Jest mock function to check any props.
const mockPrint = jest.fn();
jest.mock("../PdfPrint/PdfPrint", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    default: forwardRef((props, ref) => {
      mockPrint(props);
      return <div ref={ref}>PdfPrint</div>;
    })
  };
});
// Set up a Jest mock function to check any props.
const mockCsv = jest.fn();
jest.mock("react-csv", () => {
  const { forwardRef } = jest.requireActual("react");
  return {
    __esModule: true,
    CSVLink: forwardRef((props, ref) => {
      mockCsv(props);
      return <div ref={ref}>CSVLink</div>;
    })
  };
});

const projectRules = [
  {
    code: "PROJECT_NAME",
    name: "Rule 1",
    value: 1,
    dataType: "number",
    used: true
  },
  {
    code: "PROJECT_ADDRESS",
    name: "Rule 2",
    value: 2,
    dataType: "number",
    used: true
  },
  {
    code: "APN",
    name: "Rule 3",
    value: 3,
    dataType: "choice",
    used: true,
    choices: [
      { id: 1, name: "Choice 1" },
      { id: 2, name: "Choice 2" },
      { id: 3, name: "Choice 3" }
    ]
  }
];

jest.mock("./fetchEngineRules", () =>
  jest.fn(() => Promise.resolve(projectRules))
);

describe("ProjectTableRow", () => {
  const project = {
    id: 1,
    name: "Project 1",
    address: "123 Main St",
    firstName: "John",
    lastName: "Doe",
    dateCreated: "2022-08-01T12:00:00.000Z",
    dateModified: "2023-08-01T12:00:00.000Z",
    formInputs: "{}"
  };

  const handleCopyModalOpen = jest.fn();
  const handleDeleteModalOpen = jest.fn();
  const handleSnapshotModalOpen = jest.fn();
  const handleHide = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // NOTE: must call "await waitFor()" at the end of every test
  // this is because useEffect is triggered on render,
  // in order to generate the CSV and PDF.
  // and the tests need a chance to process the setProjectData.
  it("renders project data", async () => {
    render(
      <BrowserRouter>
        <table>
          <tbody>
            <ProjectTableRow
              project={project}
              handleCopyModalOpen={handleCopyModalOpen}
              handleDeleteModalOpen={handleDeleteModalOpen}
              handleSnapshotModalOpen={handleSnapshotModalOpen}
              handleHide={handleHide}
            />
          </tbody>
        </table>
      </BrowserRouter>
    );

    expect(screen.getByText(project.name)).toBeInTheDocument();
    expect(screen.getByText(project.address)).toBeInTheDocument();
    expect(
      screen.getByText(project.firstName + " " + project.lastName)
    ).toBeInTheDocument();
    expect(screen.getByText("2022-08-01")).toBeInTheDocument();
    expect(screen.getByText("2023-08-01")).toBeInTheDocument();
    expect(screen.queryByTitle("Project is hidden")).not.toBeInTheDocument();
    expect(screen.queryByText("-Deleted")).not.toBeInTheDocument();
    expect(screen.queryByTitle("Snapshot")).not.toBeInTheDocument();
    expect(screen.getByText("Draft")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByRole("button")).toBeInTheDocument());
  });

  it("renders project form inputs", async () => {
    const formInputs = { VERSION_NO: "98.6", BUILDING_PERMIT: "12345" };
    project.formInputs = JSON.stringify(formInputs);

    render(
      <BrowserRouter>
        <table>
          <tbody>
            <ProjectTableRow
              project={project}
              handleCopyModalOpen={handleCopyModalOpen}
              handleDeleteModalOpen={handleDeleteModalOpen}
              handleSnapshotModalOpen={handleSnapshotModalOpen}
              handleHide={handleHide}
            />
          </tbody>
        </table>
      </BrowserRouter>
    );

    expect(screen.getByText(formInputs.VERSION_NO)).toBeInTheDocument();
    expect(
      screen.queryByText(formInputs.BUILDING_PERMIT)
    ).not.toBeInTheDocument();

    await waitFor(() => expect(screen.getByRole("button")).toBeInTheDocument());
  });

  it("renders project date modified", async () => {
    const dateModified = "2023-10-02T12:34:56.789Z";
    project.dateModified = dateModified;

    render(
      <BrowserRouter>
        <table>
          <tbody>
            <ProjectTableRow
              project={project}
              handleCopyModalOpen={handleCopyModalOpen}
              handleDeleteModalOpen={handleDeleteModalOpen}
              handleSnapshotModalOpen={handleSnapshotModalOpen}
              handleHide={handleHide}
            />
          </tbody>
        </table>
      </BrowserRouter>
    );

    expect(screen.getByText("2023-10-02")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("button")).toBeInTheDocument());
  });

  it("renders project hidden/trashed/snapshotted icons", async () => {
    const dateHidden = "2021-08-03T00:00:00.000Z";
    const dateTrashed = "2021-08-04T00:00:00.000Z";
    const dateSnapshotted = "2021-08-05T00:00:00.000Z";
    project.dateHidden = dateHidden;
    project.dateTrashed = dateTrashed;
    project.dateSnapshotted = dateSnapshotted;

    render(
      <BrowserRouter>
        <table>
          <tbody>
            <ProjectTableRow
              project={project}
              handleCopyModalOpen={handleCopyModalOpen}
              handleDeleteModalOpen={handleDeleteModalOpen}
              handleSnapshotModalOpen={handleSnapshotModalOpen}
              handleHide={handleHide}
            />
          </tbody>
        </table>
      </BrowserRouter>
    );

    expect(screen.queryByRole("button")).toBeNull();

    expect(screen.getByTitle("Project is hidden")).toBeInTheDocument();
    expect(screen.getByText("-Deleted")).toBeInTheDocument();
    expect(screen.queryByTitle("Draft")).not.toBeInTheDocument();
    expect(screen.getByText("Snapshot")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByRole("button")).toBeInTheDocument());
  });

  it("renders async project context menu", async () => {
    const fetchEngineRules = require("./fetchEngineRules");
    fetchEngineRules.mockImplementation(() => Promise.resolve(projectRules));
    render(
      <BrowserRouter>
        <table>
          <tbody>
            <ProjectTableRow
              project={project}
              handleCopyModalOpen={handleCopyModalOpen}
              handleDeleteModalOpen={handleDeleteModalOpen}
              handleSnapshotModalOpen={handleSnapshotModalOpen}
              handleHide={handleHide}
            />
          </tbody>
        </table>
      </BrowserRouter>
    );
    expect(fetchEngineRules).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("button")).toBeNull();

    await waitFor(() => expect(screen.getByRole("button")).toBeInTheDocument());
    expect(mockPrint).toHaveBeenCalledTimes(1);
    expect(mockPrint).toHaveBeenCalledWith(
      expect.objectContaining({
        dateModified: "10/02/2023",
        rules: projectRules
      })
    );

    expect(mockCsv).toHaveBeenCalledTimes(1);
    expect(mockCsv).toHaveBeenCalledWith(
      expect.objectContaining({
        filename: "TDM-data.csv",
        target: "_blank",
        data: expect.arrayContaining([
          expect.arrayContaining(["TDM Calculation Project Summary"]),
          expect.arrayContaining([
            "Rule 1",
            "Rule 2",
            "Rule 3 - Choice 1",
            "Rule 3 - Choice 2",
            "Rule 3 - Choice 3"
          ]),
          expect.arrayContaining(["1", "2", "Y", "N", "N"])
        ])
      })
    );
  });
});
