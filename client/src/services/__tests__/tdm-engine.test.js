import Engine from "../tdm-engine";
import dummyData from "../../test-data/tdm-engine-test-data";
import { tdmRules } from "../../test-data/tdm-calc-rules";
import {
  project1,
  project2,
  project3
} from "../../test-data/tdm-calc-examples.js";

describe("class Engine", () => {
  beforeEach(done => {
    done();
  });
  it("Example 0 - Single Rule", done => {
    // Tests one input and one simple calculation rule
    // yield a correct result
    const engine = new Engine(dummyData.simpleRules);
    const result = engine.run(dummyData.example0, ["PARK_RESTAURANT"]);
    expect(result).toEqual({ PARK_RESTAURANT: 30 });
    done();
  });
  it("Example 1 - Simple PARK_REQUIREMENT", done => {
    // Test two inputs, two simple calculation rules and one
    // rule that depends upon the results of the two simple calculations.
    const engine = new Engine(dummyData.simpleRules);
    const result = engine.run(dummyData.example1, [
      "PARK_REQUIREMENT",
      "PARK_RESTAURANT",
      "PARK_RETAIL"
    ]);
    expect(result).toEqual({
      PARK_REQUIREMENT: 383,
      PARK_RESTAURANT: 305,
      PARK_RETAIL: 78
    });
    done();
  });

  it("Example 2 - Simple PARK_REQUIREMENT - Bottom-Up", done => {
    // Test two inputs, two simple calculation rules and one
    // rule that depends upon the results of the two simple calculations.
    // This time, perform branch calcs first.
    const engine = new Engine(dummyData.simpleRules);
    const result = engine.run(dummyData.example1, [
      "PARK_RESTAURANT",
      "PARK_RETAIL",
      "PARK_REQUIREMENT"
    ]);
    expect(result).toEqual({
      PARK_REQUIREMENT: 383,
      PARK_RESTAURANT: 305,
      PARK_RETAIL: 78
    });
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
