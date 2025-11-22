// Third-party libraries
import React from "react";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { MdCheck, MdMoreVert } from "react-icons/md";

// Internal hooks
import { useReplaceAriaAttribute } from "hooks/useReplaceAriaAttribute";

// Local components
import RolesContextMenu from "../ArchiveDelete/RolesContextMenu";

const RolesTableRow = ({
  account,
  classes,
  loggedInUserId,
  onInputChange,
  handleArchiveUser,
  isHovered,
  setHoveredRow
}) => {
  const elementId = `roles-context-menu-button-${account?.id}`;
  const popupContentId = `popup-content-${elementId}`;

  useReplaceAriaAttribute({
    elementId,
    deps: [account?.id],
    attrToRemove: "aria-describedby",
    attrToAdd: "aria-controls",
    value: popupContentId
  });

  const optionsDisabled =
    account?.isSecurityAdmin || account?.id === loggedInUserId;

  return (
    <tr className={isHovered ? classes.hoveredRow : ""}>
      <td className={classes.td}>{account.email}</td>
      <td
        className={classes.td}
      >{`${account.lastName}, ${account.firstName}`}</td>
      <td className={classes.tdCenter}>{account?.numberOfProjects || "0"}</td>
      <td className={classes.tdCenter}>
        <input
          type="checkbox"
          value={true}
          checked={account.isAdmin}
          onChange={e => onInputChange(e, account)}
          name="isAdmin"
        />
      </td>
      <td className={classes.tdCenter}>
        <input
          type="checkbox"
          value={true}
          checked={account.isSecurityAdmin}
          onChange={e => onInputChange(e, account)}
          name="isSecurityAdmin"
        />
      </td>
      <td className={classes.tdCenter}>
        <input
          type="checkbox"
          value={true}
          checked={account.isDro}
          onChange={e => onInputChange(e, account)}
          name="isDro"
        />
      </td>
      <td className={classes.tdCenter}>
        {account.emailConfirmed ? <MdCheck alt="Email confirmed" /> : ""}
      </td>
      <td className={classes.td}>
        {new Date(account.dateCreated).toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric"
        })}
      </td>
      <td className={classes.tdCenter}>
        <Popup
          trigger={
            <button
              className={`${classes.optionsButton} ${
                optionsDisabled ? classes.disabledOptionsButton : ""
              }`}
              disabled={optionsDisabled}
              id={elementId}
              aria-label={`Options for ${account?.email}`}
            >
              <MdMoreVert alt={`Options for ${account?.email}`} />
            </button>
          }
          position="bottom center"
          offsetX={-100}
          on="click"
          closeOnDocumentClick
          arrow={false}
          onOpen={() => setHoveredRow(account?.id)}
          onClose={() => setHoveredRow(null)}
        >
          <div className={classes.popupContent}>
            <RolesContextMenu
              user={account}
              handleArchiveUser={handleArchiveUser}
              ariaControlsId={popupContentId}
            />
          </div>
        </Popup>
      </td>
    </tr>
  );
};

RolesTableRow.propTypes = {
  account: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  loggedInUserId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onInputChange: PropTypes.func.isRequired,
  handleArchiveUser: PropTypes.func.isRequired,
  isHovered: PropTypes.bool,
  setHoveredRow: PropTypes.func.isRequired
};

export default RolesTableRow;
