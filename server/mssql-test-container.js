const { GenericContainer } = require("testcontainers");
const sql = require("mssql");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

require('dotenv').config();

// This code is used for testing - it provides functions for creaitng a SQL Server container, running migrations and seeding data, and stopping the container.

// const PORT = parseInt(process.env.TEST_SQL_SERVER_PORT, 10) || 1434;
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
            console.log(container.getHost())
            console.log(container.getMappedPort(MSSQL_PORT))

        await new Promise(resolve => setTimeout(resolve, 60000));

        // creates the test database in the container
        await container.exec([
            "/opt/mssql-tools/bin/sqlcmd",
            "-S", "localhost",
            "-U", "sa",
            "-P", DB_PASSWORD,
            "-Q", "CREATE DATABASE tdmtestdb"
        ]);

        console.log('database created')

        return container;
    } catch (error) {
        console.error('Error in setupContainer:', error);
        throw error;
    }
};

const runMigrations = async () => {
    try {
        const { stdout } = await exec('npm run flyway:migrate');
        console.log('migrations run');
        // console.log(stdout);
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

// const { AbstractStartedContainer, GenericContainer} = require("testcontainers");
// const { exec } = require("child_process");
// const { promisify } = require("util");
// require('dotenv').config();

// const asyncExec = promisify(exec);
// const MSSQL_PORT = 1434;
// const HOST_PORT = 32907;

// class MSSQLServerContainer extends GenericContainer {
//   constructor(image = "mcr.microsoft.com/mssql/server:2022-latest") {
//     super(image);
//     this.database = process.env.TEST_SQL_DATABASE_NAME || "master";
//     this.username = "sa";
//     this.password = process.env.TEST_SQL_PASSWORD || "Passw0rd";
//     this.acceptEula = "Y";
//   }

//   withDatabase(database) {
//     this.database = database;
//     return this;
//   }

//   withPassword(password) {
//     this.password = password;
//     return this;
//   }

//   async runMigrations() {
//     try {
//         const { stdout } = await asyncExec('npm run flyway:migrate');
//         console.log(stdout);
//     } catch (error) {
//         console.error(`Error running flyway:migrate: ${error}`);
//         throw error;
//     }
//   }

//   async start() {
//     //   this.withExposedPorts(...(this.hasExposedPorts ? this.exposedPorts : [MSSQL_PORT]))
//       this.withExposedPorts({ container: MSSQL_PORT, host: HOST_PORT })
//       .withEnvironment({
//         ACCEPT_EULA: this.acceptEula,
//         MSSQL_SA_PASSWORD: this.password,
//         MSSQL_TCP_PORT: String(MSSQL_PORT),
//       })
//       .withStartupTimeout(120_000);

//     const container = await super.start();
//     console.log(container.getHost())
//     console.log(container.getMappedPort(MSSQL_PORT))

//     // Wait for a few seconds to ensure SQL Server is fully up and ready
//     await new Promise(resolve => setTimeout(resolve, 120000));

//     // Create a database after the container starts
//     await container.exec([
//         "/opt/mssql-tools/bin/sqlcmd",
//         "-S", "localhost",
//         "-U", this.username,
//         "-P", this.password,
//         "-Q", `CREATE DATABASE ${this.database}`
//     ]);
//     console.log('database created')

//     await this.runMigrations();
//     console.log('migrations run')

//     return new StartedMSSQLServerContainer(container, this.database, this.username, this.password);
//   }
// }
// class StartedMSSQLServerContainer extends AbstractStartedContainer {
//   constructor(startedTestContainer, database, username, password) {
//     super(startedTestContainer);
//     this.database = database;
//     this.username = username;
//     this.password = password;
//   }

//   getPort() {
//     return this.getMappedPort(MSSQL_PORT);
//   }

//   getDatabase() {
//     return this.database;
//   }

//   getUsername() {
//     return this.username;
//   }

//   getPassword() {
//     return this.password;
//   }

//   getConnectionUri(secure = false) {
//     return `Server=${this.getHost()},${this.getPort()};Database=${this.getDatabase()};User Id=${this.getUsername()};Password=${this.getPassword()};Encrypt=${secure}`;
//   }
// }

// module.exports = {
//   MSSQLServerContainer,
//   StartedMSSQLServerContainer
// };
