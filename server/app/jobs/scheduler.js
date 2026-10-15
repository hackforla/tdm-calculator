const cron = require("node-cron");
const accountService = require("../services/account.service");

// Nightly at 03:00 Pacific by default; override with CLEANUP_INACTIVE_CRON
const DEFAULT_SCHEDULE = "0 3 * * *";

const start = () => {
  if (process.env.CLEANUP_INACTIVE_ENABLED === "false") return;
  cron.schedule(
    process.env.CLEANUP_INACTIVE_CRON || DEFAULT_SCHEDULE,
    async () => {
      try {
        const result = await accountService.cleanupInactive();
        console.log(
          `Inactive account cleanup: deleted ${result.deletedCount}, failed ${result.failedCount}`
        );
        if (result.failedCount) {
          console.error(
            "Cleanup failures:",
            result.errors.map(e => ({ id: e.id, message: e.message }))
          );
        }
      } catch (err) {
        console.error("Inactive account cleanup failed", err);
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
