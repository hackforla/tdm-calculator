import React, { useCallback } from "react";
import { useContext } from "react";
import useCalculator from "./useCalculator";
import UserContext from "../contexts/UserContext";
import ConfigContext from "../contexts/ConfigContext";
import * as projectService from "../services/project.service";

const useProject = () => {
  const userContext = useContext(UserContext);
  const account = userContext ? userContext.account : null;
  const accountId = account?.id;
  const configContext = useContext(ConfigContext);
  const [calculate] = useCalculator();
  const defaultCalculationId = Number(configContext.CURRENT_CALCULATION_ID);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Determines if the Program Guidelines Version (calculationId) needs to be
  // updated, and update it if necessary.
  const updateCalculationId = useCallback(
    async project => {
      try {
        if (
          (project.loginId === accountId || account?.isAdmin) &&
          project.calculationId !== defaultCalculationId &&
          !project.isCalculationIdOverride &&
          !project.dateInvoicePaid
        ) {
          // the project needs its calculationId updated, so we change the calculationId,
          // recalculate the calculation result stored in the project table, and save
          // the updated project back to the database
          project.calculationId = defaultCalculationId;
          const rules = await calculate(project);
          project.targetPoints = rules.find(
            r => r.code === "TARGET_POINTS_PARK"
          )?.value;
          project.earnedPoints = rules.find(
            r => r.code === "PTS_EARNED"
          )?.value;
          project.projectLevel = rules.find(
            r => r.code === "PROJECT_LEVEL"
          )?.value;

          // Save result to database
          await projectService.updateCalculationId(
            project.id,
            project.calculationId,
            project.isCalculationIdOverride,
            project.targetPoints,
            project.earnedPoints,
            project.projectLevel
          );
        }
        return project;
      } catch (err) {
        setError(err);
      }
    },
    [accountId, account?.isAdmin, defaultCalculationId, calculate]
  );

  const getProjectById = useCallback(
    async id => {
      try {
        setLoading(true);
        const response = await projectService.getById(id);
        let project = response.data;
        project = await updateCalculationId(project);
        return project;
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [updateCalculationId]
  );

  const getProjects = useCallback(async () => {
    let fetchedProjects = [];
    try {
      setLoading(true);
      const result = await projectService.get();
      if (result.data === "" || result.data === false) {
        return [];
      } else {
        // This is a hack to delete projects that have been in the trash for over ninety days.
        // Ideally, we would have cron job or some kind of script on the server that runs periodically
        // to do this.
        result.data.forEach(async project => {
          if (project.dateTrashed) {
            let numberOfDaysSinceTrashed =
              Math.abs(new Date(project.dateTrashed) - new Date()) /
              (1000 * 60 * 60 * 24);
            if (numberOfDaysSinceTrashed && numberOfDaysSinceTrashed < 90) {
              fetchedProjects.push(project);
            } else {
              try {
                projectService.del(project.id);
              } catch (err) {
                // if delete fails, we need to still show it
                fetchedProjects.push(project);
              }
            }
          } else {
            const p = await updateCalculationId(project);
            fetchedProjects.push(p);
          }
        });
        return fetchedProjects;
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [updateCalculationId]);

  const getSubmissionsAdmin = useCallback(async () => {
    let fetchedProjects = [];
    try {
      setLoading(true);
      const result = await projectService.getSubmissionsAdmin();
      if (result.data === "" || result.data === false) {
        return [];
      } else {
        result.data.forEach(async project => {
          const p = await updateCalculationId(project);
          fetchedProjects.push(p);
        });
        return fetchedProjects;
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [updateCalculationId]);

  const getSubmissions = useCallback(async () => {
    let fetchedProjects = [];
    try {
      setLoading(true);
      const result = await projectService.getSubmissions();
      if (result.data === "" || result.data === false) {
        return [];
      } else {
        result.data.forEach(async project => {
          const p = await updateCalculationId(project);
          fetchedProjects.push(p);
        });
        return fetchedProjects;
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [updateCalculationId]);

  return {
    getProjectById,
    getProjects,
    getSubmissionsAdmin,
    getSubmissions,
    loading,
    error
  };
};

export default useProject;
