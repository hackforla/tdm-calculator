const Engine = require("../tdm-engine");
const test_data = require("../tdm-engine-test-data");

describe("class Engine", () => {
  beforeEach(done => {
    done();
  });
  it("Example 0 - Single Rule", done => {
    const engine = new Engine(test_data.rules);
    const result = engine.run(test_data.example0, "PARK_RESTAURANT");
    expect(result).toEqual(25);
    done();
  });
  it("Example 1 - Simple PARK_REQUIREMENT", done => {
    const engine = new Engine(test_data.rules);
    const result = engine.run(test_data.example1, "PARK_REQUIREMENT");
    expect(result).toEqual(383);
    done();
  });
});
