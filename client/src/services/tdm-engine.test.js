import Engine from "./tdm-engine";
import { engineTestRules, engineTestInput1 } from "../test-data/engine-test";
import { tdmRules } from "../test-data/tdm-calc-rules";
import {
  project1,
  project2,
  project3
} from "../test-data/tdm-calc-examples.js";

describe("class Engine", () => {
  // beforeEach(done => {
  //   done();
  // });
  it("Engine Test 1 - A + B", () => {
    return new Promise(done => {
      const engine = new Engine(engineTestRules);
      const result = engine.run(engineTestInput1, ["CALC_A_PLUS_B"]);
      expect(result).toEqual({ CALC_A_PLUS_B: 20 });
      done();
    });
  });
  it("Engine Test 2 - (A+B) + {A*B)", () => {
    return new Promise(done => {
      const engine = new Engine(engineTestRules);
      const result = engine.run(engineTestInput1, [
        "CALC_A_PLUS_B_PLUS_A_TIMES_B"
      ]);
      expect(result).toEqual({
        CALC_A_PLUS_B_PLUS_A_TIMES_B: 111
      });
      done();
    });
  });

  it("Engine Test 3 - A**2 + B**2", () => {
    return new Promise(done => {
      const engine = new Engine(engineTestRules);
      const result = engine.run(engineTestInput1, ["CALC_A2_PLUS_B2"]);
      expect(result).toEqual({
        CALC_A2_PLUS_B2: 218
      });
      done();
    });
  });

  it("Engine Test 3 - Hypotenuse AB", () => {
    return new Promise(done => {
      const engine = new Engine(engineTestRules);
      const result = engine.run(engineTestInput1, ["CALC_HYPOTENUSE_AB"]);
      expect(result.CALC_HYPOTENUSE_AB).toBeCloseTo(14.76482);
      done();
    });
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
      expect(result.PARK_REQUIREMENT).toEqual(92);
      expect(result.PROJECT_LEVEL).toEqual(1);
      expect(result.TARGET_POINTS_PARK).toEqual(15);
      expect(result.PTS_EARNED).toEqual(16);
      done();
    });
  });

  it("TDM Calculation - Beatrice Building", () => {
    return new Promise(done => {
      const engine = new Engine(tdmRules);
      const result = engine.run(project2, [
        "PARK_REQUIREMENT",
        "PROJECT_LEVEL",
        "TARGET_POINTS_PARK",
        "PTS_EARNED"
      ]);
      expect(result.PARK_REQUIREMENT).toEqual(597);
      expect(result.PROJECT_LEVEL).toEqual(3);
      expect(result.TARGET_POINTS_PARK).toEqual(33);
      expect(result.PTS_EARNED).toEqual(33);
      done();
    });
  });
  it("TDM Calculation - Project 3 - Clarendon Apartments", () => {
    return new Promise(done => {
      const engine = new Engine(tdmRules);
      const result = engine.run(project3, [
        "PARK_REQUIREMENT",
        "PROJECT_LEVEL",
        "TARGET_POINTS_PARK",
        "PTS_EARNED"
      ]);
      expect(result.PARK_REQUIREMENT).toEqual(552);
      expect(result.PROJECT_LEVEL).toEqual(3);
      expect(result.TARGET_POINTS_PARK).toEqual(25);
      expect(result.PTS_EARNED).toEqual(25);
      done();
    });
  });
});
