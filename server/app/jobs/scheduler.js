const cron = require("node-cron");
const accountService = require("../services/account.service");

const start = () => {
  if (process.env.CLEANUP_INACTIVE_ENABLED === "false") return;
  if (!process.env.CLEANUP_INACTIVE_CRON) {
    console.log(
      "Missing environment variable CLEANUP_INACTIVE_CRON. Batch job will not run."
    );
    return;
  }
  console.log("Scheduler started.");
  cron.schedule(
    process.env.CLEANUP_INACTIVE_CRON,
    async () => {
      try {
        const result = await accountService.cleanupInactive();
        console.log(
          `Scheduler: ${new Date().toString()} Inactive account cleanup: deleted ${result.deletedCount}, failed ${result.failedCount}`
        );
        if (result.failedCount) {
          console.error(
            "Cleanup failures:",
            result.errors.map(e => ({ id: e.id, message: e.message }))
          );
        }
      } catch (err) {
        console.error(
          `Scheduler: ${new Date().toString()} Inactive account cleanup failed`,
          err
        );
      }
    },
    {
      name: "cleanup-inactive-accounts",
      timezone: "America/Los_Angeles",
      noOverlap: true
    }
  );
};

module.exports = { start };
