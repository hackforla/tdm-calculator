import React, { useContext, useEffect, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import UserContext from "contexts/UserContext";
import ContentContainer from "../Layout/ContentContainer";
import * as aboutService from "../../services/about.service";
import { DragDropContext } from "react-beautiful-dnd";
import Button from "components/Button/Button";
import { MdCancel } from "react-icons/md";
import AdminView from "./AdminView";
import DefaultView from "./DefaultView";
import SaveAboutEditsConfirmationModal from "components/Modals/WarningAboutSaveEdits";
import packageInfo from "../../../package.json";

const useStyles = createUseStyles(theme => ({
  editButton: {
    marginLeft: 0
  },
  heading1: { ...theme.typography.heading1, textAlign: "left" }
}));

const About = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const userContext = useContext(UserContext);
  const [aboutList, setAboutList] = useState([]);
  const [originalAboutList, setOriginalAboutList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isSaveConfirmationModalOpen, setIsSaveConfirmationModalOpen] =
    useState(false);

  const isAdmin =
    userContext && userContext.account && userContext.account.isAdmin;

  const fetchAboutData = async () => {
    try {
      const response = await aboutService.get();
      const abouts = response.data;
      setAboutList(abouts);
      setOriginalAboutList([...abouts]); // Store original for cancel functionality
    } catch (error) {
      console.error("Error fetching about data:", error);
    }
  };

  const saveAboutData = async () => {
    try {
      await aboutService.post(aboutList);
      await fetchAboutData();
      setEditMode(false);
    } catch (error) {
      console.error("Error saving about data:", error);
    }
  };

  const cancelEdits = () => {
    setAboutList([...originalAboutList]); // Restore original data
    setEditMode(false);
  };

  const toggleEditMode = () => {
    if (editMode) {
      setIsSaveConfirmationModalOpen(true);
    } else {
      setEditMode(true);
    }
  };

  const handleDragEnd = result => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    const newAboutList = Array.from(aboutList);
    const [reorderedItem] = newAboutList.splice(source.index, 1);
    newAboutList.splice(destination.index, 0, reorderedItem);

    // Recalculate displayOrder values after reordering
    const updatedAboutList = newAboutList.map((item, index) => ({
      ...item,
      displayOrder: (index + 1) * 10
    }));

    setAboutList(updatedAboutList);
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  return (
    <ContentContainer>
      <div className="page" style={{ maxWidth: "1000px", alignSelf: "center" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          {isAdmin && (
            <Button
              color={!editMode ? "colorDisabled" : "colorPrimary"}
              variant="contained"
              onClick={toggleEditMode}
              id="edit-about-toggle"
              data-testid="edit-about-toggle"
              className={classes.editButton}
            >
              {editMode ? ` SAVE EDITS` : ` EDIT ABOUT PAGE`}
            </Button>
          )}
          {isAdmin && editMode && (
            <Button
              color="colorDisabled"
              variant="outlined"
              onClick={cancelEdits}
              id="cancel-about-edits"
              data-testid="cancel-about-edits"
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <MdCancel />
                Cancel Changes
              </div>
            </Button>
          )}
        </div>
        <h1 className={classes.heading1}>About the TDM Calculator</h1>
        {isAdmin && editMode ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <AdminView
              aboutList={aboutList}
              setAboutList={setAboutList}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          </DragDropContext>
        ) : (
          <DefaultView aboutList={aboutList} />
        )}
      </div>
      <SaveAboutEditsConfirmationModal
        isOpen={isSaveConfirmationModalOpen}
        cancel={() => setIsSaveConfirmationModalOpen(false)}
        save={() => {
          saveAboutData();
          setIsSaveConfirmationModalOpen(false);
        }}
      />
      <p>Release #: {packageInfo.version}</p>
    </ContentContainer>
  );
};

export default About;
