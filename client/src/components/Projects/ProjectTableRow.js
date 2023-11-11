import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faTrash,
  faEyeSlash,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";

import ProjectContextMenu from "./ProjectContextMenu";
import PdfPrint from "../PdfPrint/PdfPrint";
import * as ruleService from "../../services/rule.service";
import Engine from "../../services/tdm-engine";

const useStyles = createUseStyles({
  td: {
    padding: "0.2em",
    textAlign: "left"
  },
  tdRightAlign: {
    padding: "0.2em",
    textAlign: "right"
  },
  actionIcons: {
    display: "flex",
    justifyContent: "space-around",
    width: "auto",
    "& button": {
      border: "none",
      backgroundColor: "transparent",
      "&:hover": {
        cursor: "pointer"
      }
    }
  }
});

const ProjectTableRow = ({
  project,
  handleCopyModalOpen,
  handleDeleteModalOpen
}) => {
  const classes = useStyles();

  const [csvData, setCsvData] = useState([]);
  const csvRef = useRef(); // setup the ref that we'll use for the hidden CsvLink click once we've updated the data
  const printRef = useRef();
  const handlePrintPdf = useReactToPrint({
    content: () => printRef.current
    // , onBeforeGetContent:
  });
  const [projectRules, setProjectRules] = useState();

  // Download and process rules once for both CSV and PDF rendering
  useEffect(() => {
    const fetchRules = async () => {
      const ruleResponse = await ruleService.getByCalculationId(calculationId);
      const engine = new Engine(ruleResponse.data);

      const inputs = project.formInputs;
      const data = JSON.parse(inputs);

      engine.run(data, resultRuleCodes);
      const rules = engine.showRulesArray();
      setProjectRules(rules);
    };

    fetchRules()
      // make sure to catch any error
      .catch(console.error);
  });

  // These are the calculation results we want to calculate
  // and display on the main page.
  // TODO: share these constants  with the real thing in TdmCalculationContainer
  const calculationId = 1; // TdmCalculationContainer.calculationId = 1;
  const resultRuleCodes = [
    "PROJECT_LEVEL",
    "CALC_PARK_RATIO",
    "TARGET_POINTS_PARK",
    "PTS_EARNED"
  ];

  //  NOTE: technique for async CSVLink was copied from stackoverflow
  //  https://stackoverflow.com/questions/53504924/reactjs-download-csv-file-on-button-click
  //  react-csv documentation is incorrect about async usage, and this is the workaround.
  //  including using setTimeout() and a hidden CSVLink.
  const handleDownloadCsv = () => {
    const rules = projectRules;

    //  TODO: consider merging project meta data with rules values

    //  TODO: understand whether enum-value rules need splitting across columns
    const usedRules = rules.filter(rule => rule.used && rule.value);
    const choiceRules = rules.filter(rule => rule.dataType === "choice");
    const choiceNames = choiceRules.flatMap(rule => {
      return rule.choices.map(choice => rule.name + " - " + choice.name);
    });
    const choiceValues = choiceRules.flatMap(rule => {
      return rule.choices.map(choice => (choice.id == rule.value ? "Y" : "N"));
    });
    const choiceKeys = choiceRules.flatMap(rule => {
      return rule.choices.map(choice => rule.code + "_" + choice.id);
    });
    console.log(
      "choices:" + choiceNames.length ||
        choiceValues.length ||
        choiceKeys.length
    );

    // TODO: decide about using code or name for the header (or keep both)
    const ruleKeys = usedRules.map(rule => rule.code);
    const ruleNames = usedRules.map(rule => rule.name);
    const ruleValues = usedRules.map(rule => rule.value.toString());

    const flat = [
      ["TDM Calculation Project Summary"],
      ["Date Printed: " + Date().toString()], // TODO: prefer ISO string?
      [],
      ruleKeys,
      ruleNames,
      ruleValues
    ];
    setCsvData(flat);
    setTimeout(() => {
      csvRef.current.link.click();
    });
  };

  const momentModified = moment(project.dateModified);
  const formInputs = JSON.parse(project.formInputs);
  const fallbackToBlank = value => {
    return value !== "undefined" ? value : "";
  };

  return (
    <tr key={project.id}>
      <td className={classes.td}>
        <Link to={`/calculation/1/${project.id}`}>{project.name}</Link>
      </td>
      <td className={classes.td}>{project.address}</td>
      <td className={classes.td}>{fallbackToBlank(formInputs.VERSION_NO)}</td>
      <td className={classes.td}>
        {fallbackToBlank(formInputs.BUILDING_PERMIT)}
      </td>
      <td
        className={classes.td}
      >{`${project.firstName} ${project.lastName}`}</td>
      <td className={classes.tdRightAlign}>
        {moment(project.dateCreated).format("MM/DD/YYYY")}
      </td>
      <td className={classes.tdRightAlign}>
        {momentModified.isSame(moment(), "day")
          ? momentModified.format("h:mm A")
          : momentModified.format("MM/DD/YYYY")}
      </td>
      <td className={classes.tdRightAlign}>
        {project.dateHidden && (
          <FontAwesomeIcon icon={faEyeSlash} alt={`Project Is Hidden`} />
        )}
      </td>
      <td className={classes.tdRightAlign}>
        {project.dateTrashed && (
          <FontAwesomeIcon icon={faTrash} alt={`Project Is In Trash`} />
        )}
      </td>
      <td className={classes.tdRightAlign}>
        {project.dateSnapshotted && (
          <FontAwesomeIcon icon={faCamera} alt={`Project Is A Snapshot`} />
        )}
      </td>
      <td className={classes.actionIcons}>
        {projectRules && (
          <div>
            <Popup
              trigger={
                <button>
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    alt={`Project Is A Snapshot`}
                  />
                </button>
              }
              position="bottom center"
              offsetX={-100}
              on="click"
              closeOnDocumentClick
              arrow={false}
            >
              <ProjectContextMenu
                project={project}
                handleCopyModalOpen={handleCopyModalOpen}
                handleDeleteModalOpen={handleDeleteModalOpen}
                handleDownloadCsv={handleDownloadCsv}
                handlePrintPdf={handlePrintPdf}
              />
            </Popup>
            <div style={{ display: "none" }}>
              <CSVLink
                data={csvData}
                filename={"TDM-data.csv"}
                ref={csvRef}
                target="_blank"
              />
              <PdfPrint
                ref={printRef}
                rules={projectRules}
                dateModified={momentModified.format("MM/DD/YYYY")}
              />
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

ProjectTableRow.propTypes = {
  project: PropTypes.object.isRequired,
  handleCopyModalOpen: PropTypes.func.isRequired,
  handleDeleteModalOpen: PropTypes.func.isRequired
};

export default ProjectTableRow;
