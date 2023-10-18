const { GenericContainer } = require("testcontainers");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

require('dotenv').config();

const DB_PASSWORD = process.env.TEST_SQL_PASSWORD;
const MSSQL_PORT = 1433;
const HOST_PORT = 1433;

let container;

const setupContainer = async () => {
    try {
        // creates container
        container = await new GenericContainer("mcr.microsoft.com/mssql/server")
            .withEnvironment({
                ACCEPT_EULA: 'Y',
                MSSQL_SA_PASSWORD: DB_PASSWORD,
                MSSQL_TCP_PORT: String(MSSQL_PORT),
            })
            .withExposedPorts({ container: MSSQL_PORT, host: HOST_PORT })
            .withStartupTimeout(120_000)
            .start();
        await new Promise(resolve => setTimeout(resolve, 60000));
        console.log('successfully started container')
        // creates the test database in the container
        await container.exec([
            "/opt/mssql-tools/bin/sqlcmd",
            "-S", "localhost",
            "-U", "sa",
            "-P", DB_PASSWORD,
            "-Q", "CREATE DATABASE tdmtestdb"
        ]);
        console.log('successfully created database')
        return container;
    } catch (error) {
        console.error('Error in setupContainer:', error);
        throw error;
    }
};

const runMigrations = async () => {
    try {
        const { stdout } = await exec('npm run flyway:migrate');
        console.log('successfully ran migrations');
        return stdout;
    } catch (error) {
        console.error(`Error running flyway:migrate: ${error}`);
        throw error;
    }
};

const start = async () => {
    try {
        container = await setupContainer();
        await runMigrations();
    } catch (error) {
        console.error('Error in start:', error);
        throw error;
    }
};

const stop = async () => {
    try {
        if (container) {
            await container.stop();
        }
    } catch (error) {
        console.error('Error in stop:', error);
        throw error;
    }
};

module.exports = {
    start,
    stop
};
