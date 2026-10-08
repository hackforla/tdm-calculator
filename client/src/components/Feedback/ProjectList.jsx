import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import { formatDatetime, formatId } from "../../helpers/util";
import {
  ascCompareBy,
  filter,
  getSortOrdinal
} from "../UI/ColumnHeaderPopups/Helpers";
import ProjectTableColumnHeader from "../UI/ColumnHeaderPopups/ProjectTableColumnHeader";
import { Td, TdExpandable } from "../UI/TableData";

const DEFAULT_SORT_CRITERIA = [{ field: "dateModified", direction: "desc" }];
const DEFAULT_FILTER_CRITERIA = {
  idFormattedList: [],
  nameList: [],
  projectNameList: [],
  addressList: [],
  startDateCreated: null,
  endDateCreated: null,
  startDateModified: null,
  endDateModified: null,
  startDateSubmitted: null,
  endDateSubmitted: null
};

const useStyles = createUseStyles(theme => ({
  heading3: { ...theme.heading3, textAlign: "center" },
  table: {
    minWidth: "81rem",
    width: "100%",
    tableLayout: "fixed"
  },
  tr: {
    margin: "0.5em"
  },
  thead: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    fontWeight: "bold",
    backgroundColor: theme.colorDarkNavy,
    color: theme.colorWhite,
    "& th": {
      padding: "4px 12px"
    },
    "& th:first-child > div": {
      justifyContent: "center"
    }
  },
  tbody: {
    background: "#F9FAFB",
    "& tr": {
      borderBottom: "1px solid #E7EBF0"
    },
    "& tr td": {
      padding: "12px",
      verticalAlign: "top"
    },
    "& tr:hover": {
      background: theme.colorRowHighlight
    }
  },
  tdNoProjects: {
    textAlign: "center"
  },
  tableContainer: {
    overflow: "auto",
    maxHeight: "30rem"
  }
}));

const getDateOnly = date => {
  const dateOnly = new Date(date).toDateString();
  return new Date(dateOnly);
};

const getAddress = formInputs => {
  try {
    return JSON.parse(formInputs)["PROJECT_ADDRESS"] || "";
  } catch {
    return "";
  }
};

const getComparator = (order, orderBy) => {
  return order === "asc"
    ? (a, b) => ascCompareBy(a, b, orderBy)
    : (a, b) => -ascCompareBy(a, b, orderBy);
};

const ProjectsList = ({
  projects,
  setSelectedProjectIds,
  selectedProjectIds
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [sortCriteria, setSortCriteria] = useState(DEFAULT_SORT_CRITERIA);
  const [filterCriteria, setFilterCriteria] = useState(DEFAULT_FILTER_CRITERIA);

  const augmentedProjects = useMemo(
    () =>
      projects.map(project => ({
        ...project,
        idFormatted: formatId(project.id),
        address: getAddress(project.formInputs)
      })),
    [projects]
  );

  const sortedProjects = augmentedProjects.filter(p =>
    filter(p, filterCriteria)
  );
  for (let i = 0; i < sortCriteria.length; i++) {
    sortedProjects.sort(
      getComparator(sortCriteria[i].direction, sortCriteria[i].field)
    );
  }

  const setSort = (orderBy, order) => {
    const newSortCriteria = sortCriteria.filter(c => c.field != orderBy);
    newSortCriteria.push({ field: orderBy, direction: order });
    setSortCriteria(newSortCriteria);
  };

  const filteredIds = sortedProjects.map(p => p.id);
  const allFilteredSelected =
    filteredIds.length > 0 &&
    filteredIds.every(id => selectedProjectIds.includes(id));

  const handleCheckboxChange = id => {
    setSelectedProjectIds(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleHeaderCheckbox = () => {
    setSelectedProjectIds(prev =>
      allFilteredSelected
        ? prev.filter(id => !filteredIds.includes(id))
        : [...new Set([...prev, ...filteredIds])]
    );
  };

  const headerData = [
    {
      id: "checkAllProjects",
      label: (
        <div style={{ overflow: "visible" }}>
          <label htmlFor="SelectAllFeedbackProjects" className="sr-only">
            Select All TDM Plans
          </label>
          <input
            style={{
              position: "relative",
              top: "0.2rem",
              padding: "0",
              height: "15px"
            }}
            id="SelectAllFeedbackProjects"
            type="checkbox"
            checked={allFilteredSelected}
            onChange={handleHeaderCheckbox}
          />
        </div>
      ),
      colWidth: "3rem"
    },
    {
      id: "idFormatted",
      label: "ID",
      popupType: "string",
      colWidth: "8rem"
    },
    {
      id: "name",
      label: "TDM Plan",
      popupType: "string",
      colWidth: "16rem"
    },
    {
      id: "projectName",
      label: "Development Project Name",
      popupType: "string",
      colWidth: "16rem"
    },
    {
      id: "address",
      label: "Address",
      popupType: "string",
      colWidth: "18rem"
    },
    {
      id: "dateCreated",
      label: "Created On",
      popupType: "datetime",
      startDatePropertyName: "startDateCreated",
      endDatePropertyName: "endDateCreated",
      colWidth: "12rem"
    },
    {
      id: "dateModified",
      label: "Last Saved",
      popupType: "datetime",
      startDatePropertyName: "startDateModified",
      endDatePropertyName: "endDateModified",
      colWidth: "12rem"
    },
    {
      id: "dateSubmitted",
      label: "Submitted",
      popupType: "datetime",
      startDatePropertyName: "startDateSubmitted",
      endDatePropertyName: "endDateSubmitted",
      colWidth: "12rem"
    }
  ];

  return (
    <div>
      <h3 className={classes.heading3}>Select Relevant TDM Plans</h3>
      <div className={classes.tableContainer}>
        <table className={classes.table}>
          <colgroup>
            {headerData.map(h => (
              <col key={h.id} width={h.colWidth} />
            ))}
          </colgroup>
          <thead className={classes.thead}>
            <tr className={classes.tr}>
              {headerData.map(header => (
                <th key={header.id}>
                  <ProjectTableColumnHeader
                    projects={augmentedProjects}
                    filter={filter}
                    header={header}
                    criteria={filterCriteria}
                    setCriteria={setFilterCriteria}
                    setSort={setSort}
                    orderByOrdinal={getSortOrdinal(header, sortCriteria)}
                    orderBy={sortCriteria[sortCriteria.length - 1].field}
                    order={sortCriteria[sortCriteria.length - 1].direction}
                    setCheckedProjectIds={null}
                    setSelectAllChecked={null}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={classes.tbody}>
            {sortedProjects.length ? (
              sortedProjects.map(project => (
                <tr key={project.id}>
                  <Td align="center">
                    <label
                      htmlFor={`feedbackProject-${project.id}`}
                      className="sr-only"
                    >
                      Select {project.name}
                    </label>
                    <input
                      type="checkbox"
                      id={`feedbackProject-${project.id}`}
                      checked={selectedProjectIds.includes(project.id)}
                      onChange={() => handleCheckboxChange(project.id)}
                    />
                  </Td>
                  <Td>{project.idFormatted}</Td>
                  <TdExpandable>{project.name}</TdExpandable>
                  <TdExpandable>{project.projectName}</TdExpandable>
                  <TdExpandable>{project.address}</TdExpandable>
                  <Td>{formatDatetime(project.dateCreated)}</Td>
                  <Td>{formatDatetime(project.dateModified)}</Td>
                  <Td>{formatDatetime(project.dateSubmitted)}</Td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headerData.length}
                  className={classes.tdNoProjects}
                >
                  No TDM Plans match the current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ProjectsList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string,
      calculationId: PropTypes.number,
      dateCreated: PropTypes.string,
      dateModified: PropTypes.string,
      dateSubmitted: PropTypes.string,
      description: PropTypes.string,
      firstName: PropTypes.string,
      formInputs: PropTypes.string,
      id: PropTypes.number,
      lastName: PropTypes.string,
      loginId: PropTypes.number,
      name: PropTypes.string,
      projectName: PropTypes.string
    })
  ),
  selectedProjectIds: PropTypes.array.isRequired,
  setSelectedProjectIds: PropTypes.func.isRequired
};

export default ProjectsList;
