import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { FaFileCsv } from "react-icons/fa";
import Button from "../Button/Button";
import { createUseStyles, useTheme } from "react-jss";
import ModalDialog from "../UI/AriaModal/ModalDialog";
import { CSVLink } from "react-csv";
import { getCsvForProjects } from "./csvData";
import RadioButton from "../UI/RadioButton";

const useStyles = createUseStyles(theme => ({
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
  warningIcon: {
    margin: "0 10px"
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
  const [filename, setFilename] = useState("");
  const [progress, setProgress] = useState(0);

  if (filename === "") {
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
    const projectSet = project
      ? [project]
      : projectCollection === "All"
      ? projects
      : projectCollection == "Filtered"
      ? filteredProjects
      : checkedProjects;
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
        setFilename("");
      }}
      // initialFocus="#cancelButton"
    >
      <div className={classes.heading1} style={{ marginBottom: "1.5rem" }}>
        <FaFileCsv /> Generate CSV File
      </div>
      {project ? (
        <div style={theme.typography.subHeading}>
          {"Create a CSV for the project " + project.name}
        </div>
      ) : (
        <>
          <div style={theme.typography.subHeading}>
            Choose a set of Projects to include
          </div>
          <div style={{ marginLeft: "30%", width: "35%" }}>
            {checkedProjects && checkedProjects.length > 0 && (
              <div style={{ margin: "0.5em" }}>
                <RadioButton
                  label={"Checked Projects "}
                  value="Checked"
                  checked={projectCollection === "Checked"}
                  onChange={handleOptionChange}
                />
              </div>
            )}

            <div style={{ margin: "0.5em" }}>
              <RadioButton
                label="Filtered Projects"
                value="Filtered"
                checked={projectCollection === "Filtered"}
                onChange={handleOptionChange}
              />
            </div>
            <div style={{ margin: "0.5em" }}>
              <RadioButton
                label="All Projects"
                value="All"
                checked={projectCollection === "All"}
                onChange={handleOptionChange}
              />
            </div>
          </div>
        </>
      )}

      <div style={{ ...theme.typography.subHeading, marginTop: "1em" }}>
        Specify file name for downloaded file
      </div>
      <div style={{ marginLeft: "30%", width: "35%" }}>
        <input
          type="text"
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
              setFilename("");
            }}
            variant="text"
            id="cancelButton"
          >
            Cancel
          </Button>

          {(project || projectCollection) && !loading && !csvData && (
            <Button
              onClick={handleGenerateButton}
              variant="contained"
              color={"colorError"}
            >
              Generate File
            </Button>
          )}

          {(project || projectCollection) && !loading && csvData ? (
            <CSVLink
              data={csvData}
              style={{
                backgroundColor: "green",
                color: "black",
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
