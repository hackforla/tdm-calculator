import React from "react";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import { formatDatetime } from "../../helpers/util";

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
  handleSelectProject,
  selectedProjectId,
  includeRadioButton
}) => {
  const classes = useStyles();

  return (
    <tr key={project.id}>
      {includeRadioButton && (
        <td className={classes.tableCell}>
          <input
            type="radio"
            checked={selectedProjectId === project.id}
            onChange={() => handleSelectProject(project.id)}
          />
        </td>
      )}
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
  handleSelectProject: PropTypes.func,
  selectedProjectId: PropTypes.number,
  includeRadioButton: PropTypes.bool
};

export default SubmitSnapshotTable;
