import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import NavButton from "../Button/NavButton";

const NavAndSaveButtons = ({
  classes,
  rules,
  page,
  onPageChange,
  pageNumber,
  setDisabledForNextNavButton,
  account,
  projectId,
  loginId,
  formIsDirty,
  projectIsValid,
  onSave
}) => {
  return (
    <div id="all-buttons-wrapper" className={classes.allButtonsWrapper}>
      {rules && rules.length ? ( //navigation disabled until rules have loaded
        <>
          <div id="nav-container" className="space-between">
            <NavButton
              id="leftNavArrow"
              navDirection="previous"
              isVisible={page !== 1}
              isDisabled={Number(page) === 1}
              onClick={() => {
                onPageChange(Number(page) - 1);
              }}
            />
            <div className={classes.pageNumberCounter}>Page {pageNumber}/5</div>
            <NavButton
              id="rightNavArrow"
              navDirection="next"
              isVisible={page !== 6}
              isDisabled={setDisabledForNextNavButton()}
              onClick={() => {
                onPageChange(Number(page) + 1);
              }}
            />
          </div>
          <Button
            type="input"
            color="colorPrimary"
            variant="contained"
            isDisplayed={
              !!(
                account.id &&
                (!projectId || account.id === loginId) &&
                formIsDirty &&
                projectIsValid()
              )
            }
            onClick={onSave}
          >
            Save Project
          </Button>
        </>
      ) : null}
    </div>
  );
};

NavAndSaveButtons.propTypes = {
  classes: PropTypes.any,
  rules: PropTypes.any,
  page: PropTypes.any,
  onPageChange: PropTypes.any,
  pageNumber: PropTypes.any,
  setDisabledForNextNavButton: PropTypes.any,
  account: PropTypes.any,
  projectId: PropTypes.any,
  loginId: PropTypes.any,
  formIsDirty: PropTypes.any,
  projectIsValid: PropTypes.any,
  onSave: PropTypes.any
};

export default NavAndSaveButtons;
