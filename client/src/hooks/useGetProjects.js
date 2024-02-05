import { useState, useEffect, useCallback } from "react";
import * as projectService from "../services/project.service";

const useProjects = handleError => {
  const [projects, setProjects] = useState([]);

  const getProjects = useCallback(async () => {
    try {
      const result = await projectService.get();
      if (result.data === "" || result.data === false) {
        setProjects([]);
      } else {
        setProjects(result.data);
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
