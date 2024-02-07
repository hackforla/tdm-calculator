import { useState, useEffect } from "react";

const useMultiProjectsData = (checkedProjects, projects) => {
  const [projectsData, setProjectsData] = useState({});

  useEffect(() => {
    if (checkedProjects.length === 0) {
      setProjectsData({});
      return;
    }

    const getProjects = checkedProjects.map(id =>
      projects.find(p => p.id === id)
    );
    console.log("getProjs: ", getProjects); // eslint-disable-line no-console

    const isSameVal = property => {
      const firstVal = getProjects[0][property];

      if (property === "dateTrashed" || property === "dateHidden") {
        return getProjects.every(p => typeof p[property] === "string")
          ? firstVal
          : null;
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

    console.log("DATA: ", data); // eslint-disable-line no-console
    setProjectsData(data);
  }, [checkedProjects, projects]);

  return projectsData;
};

export default useMultiProjectsData;
