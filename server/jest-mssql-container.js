const { GenericContainer } = require("testcontainers");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

require('dotenv').config();

const DB_PASSWORD = process.env.TEST_SQL_PASSWORD;
const MSSQL_PORT = 1433; // docker container port
const HOST_PORT = 1434; // host port. This is the port that the container port is mapped to. If you change this, you must also edit it in the .env file

let container;

const setupContainer = async () => {
    try {
        // creates container
        console.log('Starting the MS SQL Server container...')
        container = await new GenericContainer("mcr.microsoft.com/mssql/server")
            .withEnvironment({
                ACCEPT_EULA: 'Y',
                MSSQL_SA_PASSWORD: DB_PASSWORD,
                MSSQL_TCP_PORT: String(MSSQL_PORT),
            })
            .withExposedPorts({ container: MSSQL_PORT, host: HOST_PORT })
            .withStartupTimeout(120_000)
            .start();
        await new Promise(resolve => setTimeout(resolve, 5000)); // do not remove this 5 second delay. It takes a few seconds for the container to start. If you remove this, the next step will fail. Increase if needed
        console.log('Successfully started the container. Creating the database..')
        // creates the test database in the container
        await container.exec([
            "/opt/mssql-tools/bin/sqlcmd",
            "-S", "localhost",
            "-U", "sa",
            "-P", DB_PASSWORD,
            "-Q", "CREATE DATABASE tdmtestdb"
        ]);
        console.log('Test database tdmtestdb created ')
        return container;
    } catch (error) {
        console.error('Error in setupContainer:', error);
        throw error;
    }
};

const runMigrations = async () => {
    try {
        console.log('Running migrations...');
        const { stdout } = await exec('npm run flyway:migrate');
        console.log('Migrations completed');
        return stdout;
    } catch (error) {
        console.error(`Error running flyway:migrate: ${error}`);
        throw error;
    }
};

const backupDatabase = async () => {
    try {
        console.log('Starting database backup...');
        await container.exec([
            "/opt/mssql-tools/bin/sqlcmd",
            "-S", "localhost",
            "-U", "sa",
            "-P", DB_PASSWORD,
            "-Q", `BACKUP DATABASE tdmtestdb TO DISK = '/var/opt/mssql/backup/tdmtestdb.bak'`
        ]);
        console.log('Database backup completed');
    } catch (error) {
        console.error('Error backing up database:', error);
        throw error;
    }
};

// used in global setup
const start = async () => {
    try {
        container = await setupContainer();
        await runMigrations();
        await backupDatabase();
        console.log('Starting tests now. Please wait...');
    } catch (error) {
        console.error('Error in start:', error);
        throw error;
    }
};

// used in global teardown
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