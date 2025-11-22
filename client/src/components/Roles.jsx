import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Navigate, Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import * as accountService from "../services/account.service";
import { useToast } from "../contexts/Toast";
import UserContext from "../contexts/UserContext";
import ContentContainerWithTables from "./Layout/ContentContainerWithTables";
import RolesTableRow from "./Roles/RolesTableRow";

const useStyles = createUseStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  pageTitle: {
    marginTop: 0
  },
  pageSubtitle: {
    marginTop: "0.5em",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "normal",
    fontStyle: "normal"
  },
  archiveTitle: {
    marginTop: "0.5em",
    textAlign: "center",
    fontSize: "16px"
  },
  table: {
    minWidth: "80%",
    margin: "20px"
  },
  tr: {
    margin: "0.5em"
  },
  td: {
    padding: "0.2em",
    textAlign: "left"
  },
  tdCenter: {
    padding: "0.2em",
    textAlign: "center"
  },
  thead: {
    fontWeight: "bold",
    backgroundColor: "#0f2940",
    color: "white",
    position: "sticky",
    top: "0",
    "& td": {
      padding: ".4em"
    }
  },
  theadLabel: {
    cursor: "pointer"
  },
  tbody: {
    "& tr td": {
      padding: ".4em 0"
    },
    "& tr:hover": {
      background: "#f0e300"
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
      backgroundColor: "#f2f2f2"
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
    backgroundColor: "#f0e300"
  },
  disabledOptionsButton: {
    cursor: "not-allowed",
    opacity: 0.5
  }
});

const Roles = ({ contentContainerRef }) => {
  const [accounts, setAccounts] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [redirectPath, setRedirectPath] = useState("");
  const [hoveredRow, setHoveredRow] = useState(null);
  const classes = useStyles();
  const toast = useToast();
  const userContext = useContext(UserContext);
  const loggedInUserId = userContext.account?.id;

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const response = await accountService.search();
        if (response.status === 200) {
          setAccounts(response.data);
          setFilteredAccounts(response.data);
        } else if (response.status === 401) {
          setRedirectPath("/login");
        } else if (response.status === 403) {
          setRedirectPath("/uauthorized");
        } else {
          setAccounts([]);
        }
      } catch (err) {
        setAccounts([]);
      }
    };
    getAccounts();
  }, []);

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

  const onInputChange = async (e, account) => {
    const newAccount = { ...account };
    newAccount[e.target.name] = e.target.checked;
    const newAccounts = [...accounts];
    const index = newAccounts.findIndex(a => a.id === newAccount.id);
    newAccounts[index] = newAccount;
    setAccounts(newAccounts);
    filt(newAccounts, searchString);

    const msg = `The ${
      e.target.name === "isAdmin"
        ? "Admin"
        : e.target.name === "isDro"
          ? "Development Review Office"
          : "Security Admin"
    } role has been ${e.target.checked ? "granted to" : "revoked from"} ${
      newAccount.firstName
    } ${newAccount.lastName}.`;
    const reqBody = {
      id: newAccount.id,
      isAdmin: newAccount.isAdmin,
      isSecurityAdmin: newAccount.isSecurityAdmin,
      isDro: newAccount.isDro
    };

    try {
      await accountService.putRoles(reqBody);
      toast.add(msg);
    } catch (err) {
      toast.add(err);
    }
  };

  const handleArchiveUser = async user => {
    try {
      const response = await accountService.archiveAccount(user.id);
      if (response.status === 200) {
        toast.add(`Successfully archived ${user.email}`);
        // Filters out the archived user from the list
        const newAccounts = accounts.filter(account => account.id !== user.id);
        setAccounts(newAccounts);
        filt(newAccounts, searchString);
      } else {
        toast.add("Failed to archive user.");
      }
    } catch (err) {
      toast.add("An error occurred while trying to archive the user.");
    }
  };

  return (
    <ContentContainerWithTables contentContainerRef={contentContainerRef}>
      {redirectPath ? <Navigate to="{redirectPath}" /> : null}
      <h1 className={classes.pageTitle}>Security Roles</h1>
      <div className={classes.pageSubtitle}>
        Grant or Revoke Admin Permissions
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <label htmlFor="searchString" className={classes.textInputLabel}>
          Find:
        </label>
        <input
          id="searchString"
          className={classes.input}
          name="searchString"
          type="text"
          value={searchString || ""}
          onChange={e => {
            setSearchString(e.target.value);
            filt(accounts, e.target.value);
          }}
          data-testid="searchString"
        />
      </div>
      <div className={classes.archiveTitle}>
        <Link to="/archivedaccounts" className={classes.link}>
          View Archived Accounts
        </Link>
      </div>

      <table className={classes.table}>
        <thead className={classes.thead}>
          <tr className={classes.tr}>
            <td className={`${classes.td} ${classes.tdheadLabel}`}>Email</td>
            <td className={`${classes.td} ${classes.tdheadLabel}`}>Name</td>
            <td className={`${classes.td} ${classes.tdheadLabel}`}>
              # of Projects
            </td>
            <td className={`${classes.tdCenter} ${classes.tdheadLabel}`}>
              Admin
            </td>
            <td className={`${classes.tdCenter} ${classes.tdheadLabel}`}>
              Security Admin
            </td>
            <td className={`${classes.tdCenter} ${classes.tdheadLabel}`}>
              Dev. Review Office
            </td>
            <td className={`${classes.tdCenter} ${classes.tdheadLabel}`}>
              Email Confirmed
            </td>
            <td className={`${classes.td} ${classes.tdheadLabel}`}>
              Registration Date
            </td>
            <td className={`${classes.tdCenter} ${classes.tdheadLabel}`}>
              Options
            </td>
          </tr>
        </thead>
        <tbody className={classes.tbody}>
          {filteredAccounts &&
            filteredAccounts.map(account => (
              <RolesTableRow
                key={JSON.stringify(account)}
                account={account}
                classes={classes}
                loggedInUserId={loggedInUserId}
                onInputChange={onInputChange}
                handleArchiveUser={handleArchiveUser}
                isHovered={hoveredRow === account.id}
                setHoveredRow={setHoveredRow}
              />
            ))}
        </tbody>
      </table>
    </ContentContainerWithTables>
  );
};

Roles.propTypes = {
  contentContainerRef: PropTypes.object
};

export default Roles;
