import React, { useState, useContext, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import UserContext from "../../contexts/UserContext";

import { MdFilterAlt } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";
import Pagination from "../UI/Pagination";
import ContentContainerNoSidebar from "../Layout/ContentContainerNoSidebar";
import useErrorHandler from "../../hooks/useErrorHandler";
import useProjects from "../../hooks/useGetProjects";
import useCheckedProjectsStatusData from "../../hooks/useCheckedProjectsStatusData";
import * as projectService from "../../services/project.service";
import * as droService from "../../services/dro.service";
import SnapshotProjectModal from "./SnapshotProjectModal";
import RenameSnapshotModal from "./RenameSnapshotModal";

import DeleteProjectModal from "./DeleteProjectModal";
import CopyProjectModal from "./CopyProjectModal";
import CsvModal from "./CsvModal";
import ProjectTableRow from "./ProjectTableRow";
import FilterDrawer from "./FilterDrawer";
import MultiProjectToolbarMenu from "./MultiProjectToolbarMenu";
import fetchEngineRules from "./fetchEngineRules";
import UniversalSelect from "../UI/UniversalSelect";
import ProjectTableColumnHeader from "./ColumnHeaderPopups/ProjectTableColumnHeader";

const useStyles = createUseStyles({
  outerDiv: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyItems: "flex-start"
  },
  contentDiv: {
    flexBasis: "75%",
    flexShrink: 1,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  filter: {
    overflow: "hidden",
    flexBasis: "18rem",
    flexShrink: 0,
    flexGrow: 0,
    transition: "flex-basis 1s ease-in-out"
  },
  filterCollapsed: {
    overflow: "hidden",
    flexBasis: "1%",
    flexShrink: 0,
    flexGrow: 0,
    transition: "flex-basis 0.5s ease-in-out"
  },
  pageTitle: {
    marginTop: "2em"
  },
  searchBarWrapper: {
    position: "relative",
    alignSelf: "center"
  },
  searchBar: {
    maxWidth: "100%",
    width: "27em",
    padding: "12px 12px 12px 48px",
    marginRight: "0.5rem"
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "14px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  tr: {
    margin: "0.5em"
  },
  td: {
    padding: "0.2em",
    textAlign: "left"
  },
  thead: {
    fontWeight: "bold",
    backgroundColor: "#002E6D",
    color: "white",
    "& td": {
      padding: "12px"
    }
  },
  theadLabel: {
    cursor: "pointer"
  },
  labelSpan: {
    display: "inline-flex" // fix arrow
  },
  sortArrow: {
    marginLeft: "8px",
    verticalAlign: "baseline"
  },
  tbody: {
    background: "#F9FAFB",
    "& tr": {
      borderBottom: "1px solid #E7EBF0"
    },
    "& tr td": {
      padding: "12px",
      verticalAlign: "middle"
    },
    "& tr:hover": {
      background: "#B2C0D3"
    }
  },
  tdNoSavedProjects: {
    textAlign: "center"
  },
  tableContainer: {
    overflowX: "auto",
    width: "100%",
    margin: "20px 0px"
  },
  pageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  dropContent: {
    borderRadius: "4px",
    width: "60px",
    textAlign: "center"
  },
  optionItems: {
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "silver"
    }
  },
  itemsPerPage: {
    marginLeft: "5px"
  }
});

// ... rest of the component code remains the same

export default ProjectsPage;
