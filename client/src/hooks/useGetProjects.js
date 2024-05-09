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
          if (cur.dateTrashed) {
            let numberOfDaysSinceTrashed =
              Math.abs(new Date(cur.dateTrashed) - new Date()) /
              (1000 * 60 * 60 * 24);
            if (numberOfDaysSinceTrashed && numberOfDaysSinceTrashed >= 90) {
              deleteOverNinety(cur.id, handleError);
            }
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

//temporary function for removing deleted projects over ninety days old
const deleteOverNinety = async (req, handleError) => {
  try {
    projectService.del(req);
  } catch (err) {
    handleError(err);
  }
};
export default useProjects;
