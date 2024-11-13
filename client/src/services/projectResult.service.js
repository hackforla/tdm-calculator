import Engine from "./tdm-engine";
import * as ruleService from "../services/rule.service";
import * as projectService from "../services/project.service";

/* 
Run the calculation engine on a project's inputs to generate
a complete calculation, in the form of a "filled in" rules array.
*/
export async function getProjectResult(projectId) {
  const resultRuleCodes = [
    "PROJECT_LEVEL",
    "CALC_PARK_RATIO",
    "TARGET_POINTS_PARK",
    "PTS_EARNED"
  ];

  const ruleResponse = await ruleService.getByCalculationId(1);
  const projectResponse = await projectService.getById(projectId);
  const inputs = JSON.parse(projectResponse.data.formInputs);
  const engine = new Engine(ruleResponse.data);
  engine.run(inputs, resultRuleCodes);
  const result = engine.showRulesArray();
  return result;
}

// This is a temporary function to fill in three columns in project table for
// legacy projects
export async function populateTargetPoints(projectId) {
  const projectResponse = await projectService.getById(projectId);
  const project = projectResponse.data;
  const rules = await getProjectResult(project.id);
  const targetPoints = rules.find(r => r.code === "TARGET_POINTS_PARK").value;
  const earnedPoints = rules.find(r => r.code === "PTS_EARNED").value;
  const projectLevel = rules.find(r => r.code === "PROJECT_LEVEL").value;

  const requestBody = {
    id: projectId,
    targetPoints,
    earnedPoints,
    projectLevel
  };

  await projectService.updateTotals(requestBody);
}
