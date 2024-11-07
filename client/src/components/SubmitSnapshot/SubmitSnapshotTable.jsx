import React from "react";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import { formatDatetime } from "../../helpers/util";
// import fetchEngineRules from "../Projects/fetchEngineRules";
// import { getRule } from "../ProjectWizard/helpers";

const useStyles = createUseStyles({
  heading3: {
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "140%"
  },
  tableHead: {
    textAlign: "left"
  },
  tableCell: {
    padding: "0em 1em 0em 0em"
  }
});

const SubmitSnapshotTable = ({
  project,
  handleCheckboxChange,
  checkedProjectIds
}) => {
  const classes = useStyles();

  return (
    <tr key={project.id}>
      <td className={classes.tableCell}>
        <input
          type="checkbox"
          checked={checkedProjectIds.includes(project.id)}
          onChange={() => handleCheckboxChange(project.id)}
        />
      </td>
      <td className={classes.tableCell}>{project.name}</td>
      <td className={classes.tableCell}>{project.address}</td>
      <td className={classes.tableCell}>
        {formatDatetime(project.dateSubmitted)}
      </td>
      <td className={classes.tableCell}>
        {formatDatetime(project.dateModified)}
      </td>
    </tr>
  );
};

SubmitSnapshotTable.propTypes = {
  rules: PropTypes.array,
  project: PropTypes.any,
  handleCheckboxChange: PropTypes.func.isRequired,
  checkedProjectIds: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default SubmitSnapshotTable;
