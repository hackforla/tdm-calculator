import { useState, useEffect, useCallback } from "react";
import * as projectService from "../services/project.service";

const useProjects = handleError => {
  const [projects, setProjects] = useState([]);

  const getProjects = useCallback(async () => {
    let fetchedProjects = [];
    try {
      const result = await projectService.get();
      if (result.data === "" || result.data === false) {
        setProjects(fetchedProjects);
      } else {
        result.data.forEach(cur => {
          let numberOfDaysSinceCreation =
            Math.abs(new Date() - new Date(cur.dateCreated)) /
            (1000 * 60 * 60 * 24);
          if (numberOfDaysSinceCreation >= 30) {
            projectService.del(cur.id);
          } else {
            fetchedProjects.push(cur);
          }
        });
        setProjects(fetchedProjects);
      }
    } catch (err) {
      handleError(err);
    }
  }, [handleError]);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return [projects, setProjects];
};

export default useProjects;
