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

module.exports = {
  memory
};
