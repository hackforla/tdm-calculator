jest.mock("node-cron", () => ({ schedule: jest.fn() }));
jest.mock("../app/services/account.service", () => ({
  cleanupInactive: jest.fn()
}));

const cron = require("node-cron");
const accountService = require("../app/services/account.service");
const scheduler = require("../app/jobs/scheduler");

describe("inactive account cleanup scheduler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.CLEANUP_INACTIVE_ENABLED;
    delete process.env.CLEANUP_INACTIVE_CRON;
  });

  it("f env variables are missing, don't schedule", () => {
    scheduler.start();
    expect(cron.schedule).not.toHaveBeenCalled();
    // expect(cron.schedule).toHaveBeenCalledWith(
    //   expect.any(String),
    //   expect.any(Function),
    //   expect.objectContaining({ timezone: "America/Los_Angeles" })
    // );
  });

  it("does not schedule when disabled", () => {
    process.env.CLEANUP_INACTIVE_ENABLED = "false";
    scheduler.start();
    expect(cron.schedule).not.toHaveBeenCalled();
  });

  it("runs cleanup and logs failures without emails", async () => {
    accountService.cleanupInactive.mockResolvedValue({
      deletedCount: 1,
      failedCount: 1,
      errors: [{ id: 7, email: "test@example.com", message: "boom" }]
    });
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});

    scheduler.start();
    // The function our code handed to cron.schedule
    const job = cron.schedule.mock.calls[0][1];
    await job();

    expect(accountService.cleanupInactive).toHaveBeenCalled();
    expect(JSON.stringify(errorSpy.mock.calls)).not.toContain(
      "test@example.com"
    );
  });
});
