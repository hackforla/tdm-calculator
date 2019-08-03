import Engine from "./tdm-engine";
import { engineTestRules, engineTestInput1 } from "../test-data/engine-test";
import { tdmRules } from "../test-data/tdm-calc-rules";
import {
  project1,
  project2,
  project3
} from "../test-data/tdm-calc-examples.js";

describe("class Engine", () => {
  beforeEach(done => {
    done();
  });
  it("Engine Test 1 - A + B", done => {
    const engine = new Engine(engineTestRules);
    const result = engine.run(engineTestInput1, ["CALC_A_PLUS_B"]);
    expect(result).toEqual({ CALC_A_PLUS_B: 20 });
    done();
  });
  it("Engine Test 2 - (A+B) + {A*B)", done => {
    const engine = new Engine(engineTestRules);
    const result = engine.run(engineTestInput1, [
      "CALC_A_PLUS_B_PLUS_A_TIMES_B"
    ]);
    expect(result).toEqual({
      CALC_A_PLUS_B_PLUS_A_TIMES_B: 111
    });
    done();
  });

  it("Engine Test 3 - A**2 + B**2", done => {
    const engine = new Engine(engineTestRules);
    const result = engine.run(engineTestInput1, ["CALC_A2_PLUS_B2"]);
    expect(result).toEqual({
      CALC_A2_PLUS_B2: 218
    });
    done();
  });

  it("Engine Test 3 - Hypotenuse AB", done => {
    const engine = new Engine(engineTestRules);
    const result = engine.run(engineTestInput1, ["CALC_HYPOTENUSE_AB"]);
    expect(result.CALC_HYPOTENUSE_AB).toBeCloseTo(14.76482);
    done();
  });

  it("TDM Calculation - Project 1 - PARK_REQUIREMENT", done => {
    const engine = new Engine(tdmRules);
    const result = engine.run(project1, ["PARK_REQUIREMENT"]);
    expect(result).toEqual({
      PARK_REQUIREMENT: 46
    });
    done();
  });
  it("TDM Calculation - Project 2 - PARK_REQUIREMENT", done => {
    const engine = new Engine(tdmRules);
    const result = engine.run(project2, ["PARK_REQUIREMENT"]);
    expect(result).toEqual({
      PARK_REQUIREMENT: 383
    });
    done();
  });
  it("TDM Calculation - Project 3 - PARK_REQUIREMENT", done => {
    const engine = new Engine(tdmRules);
    const result = engine.run(project3, ["PARK_REQUIREMENT"]);
    expect(result.PARK_REQUIREMENT).toBeDefined();
    expect(result.PARK_REQUIREMENT).toBeCloseTo(179.2);
    done();
  });
});
