import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import * as projectResultService from "../../services/projectResult.service";
import Button from "../Button/Button";

import ModalDialog from "../UI/AriaModal/ModalDialog";

// This file appears to be obsolete

const useStyles = createUseStyles(theme => ({
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  heading1: theme.typography.heading1
}));

export default function DownloadProjectModal({
  mounted,
  onClose,
  selectedProject
}) {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const selectedProjectId = selectedProject.id;
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const getProjectResult = async () => {
      const rules =
        await projectResultService.getProjectResult(selectedProjectId);
      setRules(rules);
      console.error(rules);
    };

    getProjectResult();
  }, [selectedProjectId, setRules]);

  return (
    <ModalDialog mounted={mounted} onClose={onClose}>
      <div style={{ overflow: "auto", maxHeight: "90vh" }}>
        <div className={classes.heading1} style={{ marginBottom: "1.5rem" }}>
          Project Result
        </div>
        <div>{JSON.stringify(selectedProject, null, 2)}</div>

        <table>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>value</th>
            <th>units</th>
            <th>category</th>
          </tr>
          {rules
            .filter(rule => rule.category === "input")
            .map(r => (
              <tr key={r.code}>
                <td>{r.id}</td>
                <td>{r.code}</td>
                <td>{r.name}</td>
                <td>{r.value}</td>
                <td>{r.units}</td>
                <td>{r.category}</td>
              </tr>
            ))}
          {rules
            .filter(rule => rule.category === "measure")
            .map(r => (
              <tr key={r.code}>
                <td>{r.id}</td>
                <td>{r.code}</td>
                <td>{r.name}</td>
                <td>{r.value}</td>
                <td>{r.units}</td>
                <td>{r.category}</td>
              </tr>
            ))}
          {rules
            .filter(rule => rule.category === "calculation")
            .map(r => (
              <tr key={r.code}>
                <td>{r.id}</td>
                <td>{r.code}</td>
                <td>{r.name}</td>
                <td>{r.value}</td>
                <td>{r.units}</td>
                <td>{r.category}</td>
              </tr>
            ))}
        </table>
      </div>
      <div className={classes.buttonFlexBox}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </div>
    </ModalDialog>
  );
}

DownloadProjectModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  selectedProject: PropTypes.any
};
