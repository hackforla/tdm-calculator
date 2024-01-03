import { useState, useEffect } from "react";

const useHiddenStatus = (checkedProjects, projects, criteria) => {
  const [hiddenStatus, setHiddenStatus] = useState(null);

  useEffect(() => {
    // no checked Projects
    if (!checkedProjects.length) {
      setHiddenStatus(null);
      return;
    }

    const firstCheckedProject = projects.find(p => p.id === checkedProjects[0]);

    // if project not found
    if (!firstCheckedProject) {
      setHiddenStatus(null);
      return;
    }

    // check if every checked project row has the same status
    const allSameStatus = checkedProjects.every(projectId => {
      const project = projects.find(p => p.id === projectId);

      return (
        (project.dateHidden === null &&
          firstCheckedProject.dateHidden === null) ||
        typeof project.dateHidden === typeof firstCheckedProject.dateHidden
      );
    });

    // if "Visible & Hidden" filter is applied and a combo of projects are checked,
    //   disable "hide" button in ProjectCheckBoxMenu
    if (criteria.visibility === "all" && !allSameStatus) {
      setHiddenStatus(null);
    } else {
      setHiddenStatus(allSameStatus && firstCheckedProject.dateHidden !== null);
    }
  }, [checkedProjects, projects, criteria]);

  return hiddenStatus;
};

export default useHiddenStatus;
