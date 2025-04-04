import { useState, useEffect } from "react";

// Given a collection of project objects and a list of
// checked project Ids, return:
// If the checkedProjectIds array is empty, return an empty object,
// If the checkedProjectIds array has a single project, return the project
// If the checkedProjectIds array has multiple projects, return a special
// status object, with properties indicating which MultiProjectMenu items
// should be enabled/disabled, etc.

const useCheckedProjectsStatusData = (checkedProjects, projects) => {
  const [projectsData, setProjectsData] = useState({});

  useEffect(() => {
    if (checkedProjects.length === 0) {
      setProjectsData({});
      return;
    }

    // handle single project
    if (checkedProjects.length === 1) {
      const project = projects.find(p => p.id === checkedProjects[0]);

      // setProjectsData({
      //   id: project.id,
      //   calculationId: project.calculationId,
      //   name: project.name,
      //   dateTrashed: project.dateTrashed,
      //   dateHidden: project.dateHidden,
      //   dateModified: project.dateModified,
      //   loginId: project.loginId
      // });
      setProjectsData(project);
      return;
    }

    // Handle multiple projects
    const getProjects = checkedProjects.map(id =>
      projects.find(p => p.id === id)
    );

    // Evaluates if all projects have the same property value (null or string date)
    // Returns false for dateTrashed or dateHidden if not the same, else returns first value
    // Other properties return first value if all values are the same, else returns empty string
    const isSameVal = property => {
      const firstVal = getProjects[0][property];

      if (property === "dateTrashed" || property === "dateHidden") {
        const allNull = getProjects.every(p => p[property] === null);
        const allString = getProjects.every(
          p => typeof p[property] === "string"
        );

        return allNull || allString ? true : false;
      } else {
        return getProjects.every(p => p[property] === firstVal) ? firstVal : "";
      }
    };

    const data = {
      name: getProjects.map(p => p.name),
      dateTrashed: isSameVal("dateTrashed"),
      dateHidden: isSameVal("dateHidden"),
      loginId: isSameVal("loginId")
    };

    setProjectsData(data);
  }, [checkedProjects, projects]);

  return projectsData;
};

export default useCheckedProjectsStatusData;
