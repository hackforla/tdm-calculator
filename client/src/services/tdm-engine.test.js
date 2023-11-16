import Engine from "./tdm-engine";
import { engineTestRules, engineTestInput1 } from "../test-data/engine-test";
import { tdmRules } from "../test-data/tdm-calc-rules";
import {
  project1,
  project2,
  project3
} from "../test-data/tdm-calc-examples.js";
import "@testing-library/jest-dom";

describe("class Engine", () => {
  it("Engine Test 1 - A + B", () => {
    const engine = new Engine(engineTestRules);
    const result = engine.run(engineTestInput1, ["CALC_A_PLUS_B"]);
    const rules = engine.showRulesArray();
    const rule = rules.find(rule => rule.code === "CALC_A_PLUS_B");
    expect(rule).toBeTruthy();
    expect(rule.value).toEqual(20);
    expect(result).toEqual(false);
  });

  it("Engine Test 2 - (A+B) + {A*B)", () => {
    const engine = new Engine(engineTestRules);
    const result = engine.run(engineTestInput1, [
      "CALC_A_PLUS_B_PLUS_A_TIMES_B"
    ]);
    const rules = engine.showRulesArray();
    const rule = rules.find(
      rule => rule.code === "CALC_A_PLUS_B_PLUS_A_TIMES_B"
    );
    expect(rule).toBeTruthy();
    expect(rule.value).toEqual(111);
    expect(result).toEqual(false);
  });

  it("Engine Test 3 - A**2 + B**2", () => {
    const engine = new Engine(engineTestRules);
    const result = engine.run(engineTestInput1, ["CALC_A2_PLUS_B2"]);
    const rules = engine.showRulesArray();
    const rule = rules.find(rule => rule.code === "CALC_A2_PLUS_B2");
    expect(rule).toBeTruthy();
    expect(rule.value).toEqual(218);
    expect(result).toEqual(false);
  });

  it("Engine Test 4 - Hypotenuse AB", () => {
    const engine = new Engine(engineTestRules);
    const result = engine.run(engineTestInput1, ["CALC_HYPOTENUSE_AB"]);
    const rules = engine.showRulesArray();
    const rule = rules.find(rule => rule.code === "CALC_HYPOTENUSE_AB");
    expect(rule).toBeTruthy();
    expect(rule.value).toBeCloseTo(14.76482);
    expect(result).toEqual(false);
  });

  it("TDM Calculation - Barrington Condos", () => {
    return new Promise(done => {
      const engine = new Engine(tdmRules);
      const result = engine.run(project1, [
        "PARK_REQUIREMENT",
        "PROJECT_LEVEL",
        "TARGET_POINTS_PARK",
        "PTS_EARNED"
      ]);
      expect(result).toEqual(false);
      const rules = engine.showRulesArray();
      const results = rules.reduce((acc, rule) => {
        acc[rule.code] = rule.value;
        return acc;
      }, {});

      expect(results.PARK_REQUIREMENT).toEqual(92);
      expect(results.PROJECT_LEVEL).toEqual(1);
      expect(results.TARGET_POINTS_PARK).toEqual(15);
      expect(results.PTS_EARNED).toEqual(16);
      done();
    });
  });

  it("TDM Calculation - Beatrice Building", () => {
    const engine = new Engine(tdmRules);
    const result = engine.run(project2, [
      "PARK_REQUIREMENT",
      "PROJECT_LEVEL",
      "TARGET_POINTS_PARK",
      "PTS_EARNED"
    ]);
    expect(result).toEqual(false);
    const rules = engine.showRulesArray();
    const results = rules.reduce((acc, rule) => {
      acc[rule.code] = rule.value;
      return acc;
    }, {});
    expect(results.PARK_REQUIREMENT).toEqual(597);
    expect(results.PROJECT_LEVEL).toEqual(3);
    expect(results.TARGET_POINTS_PARK).toEqual(33);
    expect(results.PTS_EARNED).toEqual(33);
  });
  it("TDM Calculation - Project 3 - Clarendon Apartments", () => {
    const engine = new Engine(tdmRules);
    const result = engine.run(project3, [
      "PARK_REQUIREMENT",
      "PROJECT_LEVEL",
      "TARGET_POINTS_PARK",
      "PTS_EARNED"
    ]);
    expect(result).toEqual(false);
    const rules = engine.showRulesArray();
    const results = rules.reduce((acc, rule) => {
      acc[rule.code] = rule.value;
      return acc;
    }, {});
    expect(results.PARK_REQUIREMENT).toEqual(552);
    expect(results.PROJECT_LEVEL).toEqual(3);
    expect(results.TARGET_POINTS_PARK).toEqual(25);
    expect(results.PTS_EARNED).toEqual(24);
  });
});
