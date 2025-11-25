import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";
import Popup from "reactjs-popup";
import * as accountService from "../../services/account.service";
import { useToast } from "../../contexts/Toast";
import RolesUnarchiveContextMenu from "./RolesUnarchiveContextMenu";
import RolesDeleteContextMenu from "./RolesDeleteContextMenu";
import UserContext from "../../contexts/UserContext";
import { MdMoreVert, MdOutlineSearch } from "react-icons/md";
import ContentContainerWithTables from "components/Layout/ContentContainerWithTables";

const useStyles = createUseStyles(theme => ({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "auto"
  },
  pageTitle: {
    margin: 0
  },
  pageSubtitle: {
    marginTop: "1em",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "normal",
    fontStyle: "normal"
  },
  table: {
    minWidth: "100%",
    margin: "20px"
  },
  tr: {
    margin: "0.5em"
  },
  td: {
    padding: "0.2em 2em",
    textAlign: "left"
  },
  tdCenter: {
    padding: "0.2em",
    textAlign: "center"
  },
  thead: {
    fontWeight: "bold",
    backgroundColor: theme.colors.primary.navy,
    color: theme.colors.primary.white,
    "& td": {
      padding: "12px"
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
      background: theme.colors.secondary.mediumGray
    }
  },
  link: {
    textDecoration: "underline"
  },
  optionsButton: {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    padding: "0.2em 0.5em",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: theme.colors.secondary.mediumGray
    }
  },
  popupContent: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#E9E9E9",
      borderRadius: "4px"
    }
  },
  hoveredRow: {
    backgroundColor: "#B2C0D3"
  },
  searchBarWrapper: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "start",
    position: "relative",
    margin: "1em 0 0 0"
  },
  textInputLabel: {
    fontSize: "20px",
    fontWeight: "normal",
    fontStyle: "normal",
    width: "140px",
    alignSelf: "center"
  },
  searchBar: {
    width: "300px",
    padding: "12px 12px 12px 40px"
  },
  searchIcon: {
    position: "absolute",
    left: "150px",
    top: "10px",
    height: "24px",
    width: "24px"
  },
  popover: {
    display: "flex",
    flexDirection: "column",
    listStyleType: "none",
    margin: 0,
    padding: 0,
    boxShadow:
      "10px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px 0px rgba(0,0,0,0.3)"
  }
}));

const RolesArchive = ({ contentContainerRef }) => {
  const [searchString, setSearchString] = useState("");
  const [archivedAccounts, setArchivedAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const theme = useTheme();
  const classes = useStyles(theme);
  const { add } = useToast();
  const userContext = useContext(UserContext);
  const loggedInUserId = userContext.account?.id;

  useEffect(() => {
    const getArchivedAccounts = async () => {
      try {
        const response = await accountService.getAllArchivedAccounts();
        if (response.status === 200) {
          setArchivedAccounts(response.data);
          setFilteredAccounts(response.data);
        } else {
          add("Failed to get archived accounts.");
        }
      } catch (err) {
        add("Error - Could not display archived accounts.");
      }
    };
    getArchivedAccounts();
  }, [add]);

  const filt = (allAccounts, searchString) => {
    const str = searchString;
    const filteredAccounts = allAccounts.filter(
      account =>
        str === "" ||
        account.email.toLowerCase().includes(str) ||
        account.firstName.toLowerCase().includes(str) ||
        account.lastName.toLowerCase().includes(str)
    );
    if (filteredAccounts) {
      setFilteredAccounts(filteredAccounts);
    }
  };

  const handleUnarchiveUser = async user => {
    try {
      const response = await accountService.unarchiveAccount(user.id);
      if (response.status === 200) {
        setArchivedAccounts(
          archivedAccounts.filter(account => account.id !== user.id)
        );
        add("Successfully unarchived and restored account.");
      } else {
        add("Failed to unarchive and restore account.");
      }
    } catch (err) {
      add("An error occurred while unarchiving and restoring the account.");
    }
  };

  const handleDeleteUser = async user => {
    try {
      const response = await accountService.deleteAccount(user.id);
      if (response.status === 200) {
        setArchivedAccounts(
          archivedAccounts.filter(account => account.id !== user.id)
        );
        add("Successfully deleted the account.");
      } else {
        add("Failed to delete the account.");
      }
    } catch (err) {
      add("Error - Could not delete User.");
    }
  };

  return (
    <ContentContainerWithTables contentContainerRef={contentContainerRef}>
      <div className={classes.main}>
        <h1 className={classes.pageTitle}>Archived Accounts</h1>
        <div className={classes.pageSubtitle}>
          Archived accounts don’t have access to project data. If a user with an
          archived account needs to access this info, you can restore their
          account.
        </div>
        <div className={classes.pageSubtitle}>
          <Link to="/roles" className={classes.link}>
            Return to Active Accounts
          </Link>
        </div>
        <div className={classes.pageSubtitle}>
          <Link to="/archivedprojects" className={classes.link}>
            See All Archived Projects
          </Link>
        </div>
        <div className={classes.searchBarWrapper}>
          <label htmlFor="searchString" className={classes.textInputLabel}>
            Search for user:
          </label>
          <input
            className={classes.searchBar}
            name="searchString"
            type="text"
            value={searchString || ""}
            onChange={e => {
              setSearchString(e.target.value);
              filt(archivedAccounts, e.target.value);
            }}
            data-testid="searchString"
            placeholder="Enter name or email"
          />
          <MdOutlineSearch className={classes.searchIcon} />
        </div>
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr className={classes.tr}>
              <td className={classes.td}>Email</td>
              <td className={classes.td}>Name</td>
              <td className={`${classes.td} ${classes.tdheadLabel}`}>
                # of Projects
              </td>
              <td className={`${classes.td} ${classes.tdheadLabel}`}>
                # of Submissions
              </td>
              <td className={classes.td}>Date Archived</td>
              <td className={classes.tdCenter}></td>
            </tr>
          </thead>
          <tbody className={classes.tbody}>
            {filteredAccounts &&
              filteredAccounts.map(account => (
                <tr
                  key={account.id}
                  className={
                    hoveredRow === account.id ? classes.hoveredRow : ""
                  }
                >
                  <td className={classes.td}>{account.email}</td>
                  <td
                    className={classes.td}
                  >{`${account.lastName}, ${account.firstName}`}</td>
                  <td className={classes.tdCenter}>
                    {account?.numberOfProjects || "0"}
                  </td>
                  <td className={classes.tdCenter}>
                    {account?.numberOfSubmissions || "0"}
                  </td>
                  <td className={classes.td}>
                    {new Date(account.archivedAt).toLocaleDateString()}
                  </td>
                  <td className={classes.tdCenter}>
                    <Popup
                      className={classes.popover}
                      trigger={
                        <button
                          className={`${classes.optionsButton} ${
                            account?.isSecurityAdmin ||
                            account?.id === loggedInUserId
                              ? classes.disabledOptionsButton
                              : ""
                          }`}
                          disabled={
                            account?.isSecurityAdmin ||
                            account?.id === loggedInUserId
                          }
                        >
                          <MdMoreVert alt={`Options for ${account?.email}`} />
                        </button>
                      }
                      position="left center"
                      offsetX={-5}
                      on="click"
                      closeOnDocumentClick
                      arrow={true}
                      onOpen={() => setHoveredRow(account?.id)}
                      onClose={() => setHoveredRow(null)}
                    >
                      <div className={classes.popupContent}>
                        <RolesUnarchiveContextMenu
                          user={account}
                          handleUnarchiveUser={handleUnarchiveUser}
                        />
                      </div>
                      <div className={classes.popupContent}>
                        <RolesDeleteContextMenu
                          user={account}
                          handleDeleteUser={handleDeleteUser}
                        />
                      </div>
                    </Popup>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </ContentContainerWithTables>
  );
};

RolesArchive.propTypes = {
  contentContainerRef: PropTypes.object
};

export default RolesArchive;
