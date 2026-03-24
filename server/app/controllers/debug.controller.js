const memory = async (req, res) => {
  const memoryUsage = process.memoryUsage();

  // Debug endpoints per article
  // https://www.compilenrun.com/docs/framework/express/express-performance/express-memory-leaks/

  res.json({
    rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
    heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
    external: `${Math.round(memoryUsage.external / 1024 / 1024)} MB`
  });
};

const heapDump = (req, res) => {
  const heapdump = require("heapdump");
  const os = require("os");
  const path = require("path");

  const filename = path.join(os.tmpdir(), `heap-${Date.now()}.heapsnapshot`);

  heapdump.writeSnapshot(filename, err => {
    if (err) {
      return res.status(500).send("Failed to generate heap snapshot");
    }

    res.download(filename, () => {
      // Delete file after download
      require("fs").unlink(filename, () => {});
    });
  });
};

module.exports = {
  memory,
  heapDump
};
