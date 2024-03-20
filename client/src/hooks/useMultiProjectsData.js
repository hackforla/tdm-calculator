import { useState, useEffect } from "react";

// for use with multi-selected projects

const useMultiProjectsData = (checkedProjects, projects) => {
  const [projectsData, setProjectsData] = useState({});

  useEffect(() => {
    if (checkedProjects.length === 0) {
      setProjectsData({});
      return;
    }

    // handle single project
    if (checkedProjects.length === 1) {
      const project = projects.find(p => p.id === checkedProjects[0]);

      setProjectsData(project);
      return;
    }

    // Handle multiple projects
    const getProjects = checkedProjects.map(id =>
      projects.find(p => p.id === id)
    );

    // console.log("getProj-1: ", getProjects); // eslint-disable-line no-console
    // Evaluates if all projects have the same property value (null or string date)
    // Returns false for dateTrashed or dateHidden if not the same, else returns first value
    // Other properties return first value if all values are the same, else returns empty string
    const isSameVal = property => {
      const firstVal = getProjects[0][property];

      if (getProjects.length === 1) return firstVal;

      if (property === "dateTrashed" || property === "dateHidden") {
        const allNull = getProjects.every(p => p[property] === null);
        const allString = getProjects.every(
          p => typeof p[property] === "string"
        );

        return allNull || allString ? firstVal : false;
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

export default useMultiProjectsData;
