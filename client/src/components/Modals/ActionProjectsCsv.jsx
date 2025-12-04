import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { FaFileCsv } from "react-icons/fa6";
import Button from "../Button/Button";
import { createUseStyles, useTheme } from "react-jss";
import ModalDialog from "../UI/Modal";
import { CSVLink } from "react-csv";
import { getCsvForProjects } from "./csvData";
import RadioButton from "../UI/RadioButton";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "35rem"
  },
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  heading1: theme.typography.heading1,
  instruction: {
    fontSize: "20px",
    lineHeight: "32px",
    textAlign: "center",
    color: "#B64E38",
    "& span": {
      fontStyle: "italic"
    }
  },
  icon: {
    height: "40px",
    width: "40px",
    color: theme.colorBlack,
    marginBottom: "0",
    verticalAlign: "middle"
  },
  radioButtonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5em",
    margin: "0.5em"
  }
}));

const CsvModal = ({
  mounted,
  onClose,
  project,
  projects,
  filteredProjects,
  checkedProjects
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const [csvData, setCsvData] = useState(null);
  const [projectCollection, setProjectCollection] = useState("");
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState(new Date().toISOString());
  const [progress, setProgress] = useState(0);

  if (filename === "dummy") {
    setFilename(new Date().toISOString());
  }

  const handleOptionChange = changeEvent => {
    setProjectCollection(changeEvent.target.value);
  };

  const handleFilenameChange = changeEvent => {
    setFilename(changeEvent.target.value);
  };

  const handleGenerateButton = async () => {
    setLoading(true);
    let projectSet;

    if (project) {
      projectSet = [project];
    } else {
      const activeProjects = projects.filter(p => !p.dateTrashed);
      switch (projectCollection) {
        case "All":
          projectSet = projects;
          break;
        case "Filtered":
          projectSet = filteredProjects;
          break;
        case "All Active":
          projectSet = activeProjects;
          break;
        default:
          projectSet = checkedProjects;
      }
    }

    let csvData = null;
    csvData = await getCsvForProjects(projectSet, progressCallback);
    setLoading(false);
    setCsvData(csvData);
  };

  const progressCallback = percent => {
    setProgress(percent);
  };

  return (
    <ModalDialog
      mounted={mounted}
      onClose={() => {
        onClose();
        setCsvData(null);
        setProjectCollection("");
        setFilename("dummy");
      }}
      initialFocus="#filename"
    >
      <div className={classes.container}>
        <div className={classes.heading1} style={{ marginBottom: "1.5rem" }}>
          <FaFileCsv className={classes.icon} />
          Generate CSV File
        </div>
        {project ? (
          <div style={theme.typography.subHeading}>
            Create a CSV for the project &quot;{project.name}&quot;
          </div>
        ) : (
          <>
            <div style={theme.typography.subHeading}>
              Choose a set of Projects to include
            </div>
            <div className={classes.radioButtonContainer}>
              {checkedProjects && checkedProjects.length > 0 && (
                <RadioButton
                  label={"Checked Projects"}
                  value="Checked"
                  checked={projectCollection === "Checked"}
                  onChange={handleOptionChange}
                />
              )}
              <RadioButton
                label="Filtered Projects"
                value="Filtered"
                checked={projectCollection === "Filtered"}
                onChange={handleOptionChange}
              />
              <RadioButton
                label="All Projects (Exclude Deleted Projects)"
                value="All Active"
                checked={projectCollection === "All Active"}
                onChange={handleOptionChange}
              />
              <RadioButton
                label="All Projects (Include Deleted Projects)"
                value="All"
                checked={projectCollection === "All"}
                onChange={handleOptionChange}
              />
            </div>
          </>
        )}

        <div style={{ ...theme.typography.subHeading, marginTop: "1em" }}>
          Specify file name for downloaded file
        </div>
        <div style={{ width: "75%" }}>
          <input
            type="text"
            id="filename"
            value={filename}
            onChange={handleFilenameChange}
            style={{ margin: "0.5em" }}
          />
        </div>
        {loading && (
          <progress
            value={progress}
            style={{ width: "80%", marginLeft: "10%" }}
          />
        )}
        <div>
          <div className={classes.buttonFlexBox}>
            <Button
              onClick={() => {
                onClose();
                setCsvData(null);
                setProjectCollection("");
                setFilename("dummy");
              }}
              variant="secondary"
              id="cancelButton"
            >
              Cancel
            </Button>

            {(project || projectCollection) &&
              !loading &&
              !csvData &&
              !!filename && (
                <Button onClick={handleGenerateButton} variant="primary">
                  Generate File
                </Button>
              )}

            {(project || projectCollection) && !loading && csvData ? (
              <CSVLink
                data={csvData}
                style={{
                  backgroundColor: theme.colorPrimary,
                  color: theme.colors.primary.black,
                  textDecoration: "none",
                  height: "1.4rem",
                  fontFamily: "Calibri",
                  fontSize: "20px",
                  fontWeight: "700",
                  margin: "0.55em",
                  padding: "0.75rem 1rem",
                  textAlign: "center",
                  letterSpacing: "0.05rem"
                }}
                filename={filename + ".csv"}
                onClick={() => {
                  setCsvData(null);
                  setProjectCollection("");
                  onClose();
                  setFilename("");
                }}
              >
                DOWNLOAD FILE
              </CSVLink>
            ) : null}
          </div>
        </div>
      </div>
    </ModalDialog>
  );
};

CsvModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.any,
  projects: PropTypes.array,
  filteredProjects: PropTypes.array,
  checkedProjects: PropTypes.array
};

export default CsvModal;
