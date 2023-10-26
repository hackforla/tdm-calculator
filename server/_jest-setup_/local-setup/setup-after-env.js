const { pool, poolConnect } = require("../../app/services/tedious-pool");

require("dotenv").config();

beforeAll(async () => {
    try {
        await poolConnect;
        const request = pool.request();
        await request.query("USE master");
        await request.query(`RESTORE DATABASE tdmtestdb FROM DISK = '/var/opt/mssql/backup/tdmtestdb.bak' WITH REPLACE`);
        await request.query('USE tdmtestdb');
    } catch (error) {
        console.error('Error setting up tests:', error);
        throw error; // This will cause Jest to abort the suite.
    }
});

afterAll(async () => {
    try {
        await pool.close();
    } catch (error) {
        console.error('Error cleaning up after tests:', error);
        throw error; 
    }
});
