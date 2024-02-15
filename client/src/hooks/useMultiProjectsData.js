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
