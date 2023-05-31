export default {
  Inapplicable: {
    title: "",
    text: "Due to changes made to the project specifications, one or more TDM strategies are no longer applicable and have been automatically de-selected",
    icon: "warning",
    buttonOne: "Okay"
  },
  NavConfirm: {
    title: "Leave page and delete unsaved data?",
    text: "This will permanently delete any unsaved projects or changes to project.",
    icon: "warning",
    buttonOne: "Cancel",
    buttonTwo: "Proceed"
  },
  //ProjectAction contains Delete and duplicate Modals
  DeleteProjectModal: {
    title: `Delete Project`,
    text: "Are you sure you want to permanently delete this project,&nbsp;",
    buttonOne: "Cancel",
    buttonTwo: "Delete"
    //logic for delete is in parent. (34)
  },
  DuplicateProjectModal: {
    title: "Type a new name to duplicate the project,&nbsp;",
    text: "selectedProject && selectedProject.name",
    input: "",
    buttonOne: "Cancel",
    buttonTwo: "Submit"
  },
  TermsAndConditions: {
    title: "TDM Calculator User Terms and Conditions",
    text: ``,
    nestedComponent: "",
    buttonOne: "Accept",
    buttonTwo: "Decline and exit site"
  },
  ChecklistModal: {
    title: "TESTTITLE",
    text: "TESTTEXT",
    nestedComponent: ""
  }
};

//behaviors:
//  close/confirm on one button
// proceed/cancel on two buttons
// proceed/ exit site on two buttons

//fields needed:

// props:
//Component InapplicableStrategiesModal
//  inapplicableStrategiesModal
//  closeStrategiesModal
//Component NavConfirmModal
//   confirmTransition={confirmTransition}
//   isOpenNavConfirmModal={isOpenNavConfirmModal}
//   setIsOpenNavConfirmModal={setIsOpenNavConfirmModal}
//Component TermsAndConditionsModal
//Component ChecklistModal
// checklistModalOpen={checklistModalOpen}
// toggleChecklistModal={toggleChecklistModal}
//Component DeleteProjectModal

//inapplicableStrategiesModal replaced
