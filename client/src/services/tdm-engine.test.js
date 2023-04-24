import Engine from "./tdm-engine";
import { engineTestRules, engineTestInput1 } from "../test-data/engine-test";
import { tdmRules } from "../test-data/tdm-calc-rules";
import { project1, project2, project3 } from "../test-data/tdm-calc-examples";

describe("class Engine", () => {
  // beforeEach(done => {
  //   done();
  // });
  it("Engine Test 1 - A + B", () => {
    return new Promise(done => {
      const engine = new Engine(engineTestRules);
      engine.run(engineTestInput1, ["CALC_A_PLUS_B"]);
      const rules = engine.getRules();
      expect(rules.CALC_A_PLUS_B.value).toEqual(20);
      done();
    });
  });
  it("Engine Test 2 - (A+B) + {A*B)", () => {
    return new Promise(done => {
      const engine = new Engine(engineTestRules);
      engine.run(engineTestInput1, ["CALC_A_PLUS_B_PLUS_A_TIMES_B"]);
      const rules = engine.getRules();
      expect(rules.CALC_A_PLUS_B_PLUS_A_TIMES_B.value).toEqual(111);
      done();
    });
  });

  it("Engine Test 3 - A**2 + B**2", () => {
    return new Promise(done => {
      const engine = new Engine(engineTestRules);
      engine.run(engineTestInput1, ["CALC_A2_PLUS_B2"]);
      const rules = engine.getRules();
      expect(rules.CALC_A2_PLUS_B2.value).toEqual(218);
      done();
    });
  });

  it("Engine Test 4 - Hypotenuse AB", () => {
    return new Promise(done => {
      const engine = new Engine(engineTestRules);
      engine.run(engineTestInput1, ["CALC_HYPOTENUSE_AB"]);
      const rules = engine.getRules();
      expect(rules.CALC_HYPOTENUSE_AB.value).toBeCloseTo(14.76482);
      done();
    });
  });

  it("TDM Calculation - Barrington Condos", () => {
    return new Promise(done => {
      const engine = new Engine(tdmRules);
      engine.run(project1, [
        "PARK_REQUIREMENT",
        "PROJECT_LEVEL",
        "TARGET_POINTS_PARK",
        "PTS_EARNED"
      ]);
      const rules = engine.getRules();
      expect(rules.PARK_REQUIREMENT.value).toEqual(92);
      expect(rules.PROJECT_LEVEL.value).toEqual(1);
      expect(rules.TARGET_POINTS_PARK.value).toEqual(15);
      expect(rules.PTS_EARNED.value).toEqual(17);
      done();
    });
  });

  it("TDM Calculation - Beatrice Building", () => {
    return new Promise(done => {
      const engine = new Engine(tdmRules);
      engine.run(project2, [
        "PARK_REQUIREMENT",
        "PROJECT_LEVEL",
        "TARGET_POINTS_PARK",
        "PTS_EARNED"
      ]);
      const rules = engine.getRules();
      expect(rules.PARK_REQUIREMENT.value).toEqual(597);
      expect(rules.PROJECT_LEVEL.value).toEqual(3);
      expect(rules.TARGET_POINTS_PARK.value).toEqual(33);
      expect(rules.PTS_EARNED.value).toEqual(33);
      done();
    });
  });
  it("TDM Calculation - Project 3 - Clarendon Apartments", () => {
    return new Promise(done => {
      const engine = new Engine(tdmRules);
      engine.run(project3, [
        "PARK_REQUIREMENT",
        "PROJECT_LEVEL",
        "TARGET_POINTS_PARK",
        "PTS_EARNED"
      ]).result;
      const rules = engine.getRules();
      expect(rules.PARK_REQUIREMENT.value).toEqual(552);
      expect(rules.PROJECT_LEVEL.value).toEqual(3);
      expect(rules.TARGET_POINTS_PARK.value).toEqual(25);
      expect(rules.PTS_EARNED.value).toEqual(29);
      done();
    });
  });
});
