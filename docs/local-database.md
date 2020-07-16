# Setting Up a Local Development Database

If you are working on issues that require making changes to the database schema or reference data (i.e., data that is considered part of the application, such as lookup lists, or, in the case of TDM, CalculationRules),
then you should work with a _copy_ of the shared development database on your local machine, which we will refer to as a `Local Database`.

## Overview

This is a summary of the instructions. See other sections below for more details.

1. [Install SQL Server](#Installing-SQL-Server) Express directly (Windows) or via a Docker container (macOS, Linux, or Windows)

   - For **_macOS or Linux_** computers, you should install **[Docker CE](https://hub.docker.com/editions/community/docker-ce-desktop-mac/)** and run the **[Microsoft SQL Server image](https://hub.docker.com/_/microsoft-mssql-server)**.

   - For **_Windows Pro Edition_** computers, you can install _either_:

     - **[Docker CE](https://hub.docker.com/editions/community/docker-ce-desktop-windows/)** and run the database in a Docker container and run the **[Microsoft SQL Server image](https://hub.docker.com/_/microsoft-mssql-server)** _or_
     - **[Microsoft SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)** edition.
     - If you are new to SQL Server, Docker is probably easier.

   - For **_Windows Home Edition_** computers, you should install **[Microsoft SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)** edition, since running Docker on a Windows Home machine is very painful.

   - If you are working on Windows and already have any instance of SQL Server installed, you may just use your existing instance for development.

1. [Create a database](#creating-the-database) called `tdmdev` once you have a local copy of SQL Server on your machine. (You can use a different name if you want, and modify the subsequent instructions accordingly.)

1. [Connect to the local database](#connecting-to-the-local-database)

   - Edit the `.env` file with your local database connection string information.

1. [Run the database migrations](#running-database-migrations-and-the-app) to create the database schema and populate it with seed data by opening a terminal in the root directory of the repo and running:

   ```bash
   npm run flyway:migrate
   ```

1. At this point, you should be able to run the application (`npm start`), and it will be using the local database.

1. Additional info is provided at the end: [Working With Migrations](#working-with-migrations), [Debugging Tips](#debugging-tips)

> **NOTE:** If for any reason, you corrupt your local database, you can simply drop the `tdmdev` database from your local SQL Server, re-create it, and run migrations again to start over.

## Installing SQL Server

### Running SQL Server in a Docker Container (Mac, Linux, Windows)

1. Install Docker Desktop from [here](https://www.docker.com/get-started) and follow the provided instructions. This will install Docker client and a local Docker daemon (server) that can host docker containers.

   The following command will run if docker is set up and ready to go:

   ```bash
   docker version
   ```

1. Open the Docker Desktop app and ensure it is running.
1. Download the official Microsoft SQL Server image and create a local container named `tdm_sql_server` by running:

   ```bash
     docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Dogfood1!' -e 'MSSQL_PID=Express' \
     -p 1434:1433 --name tdm_sql_server \
     -d mcr.microsoft.com/mssql/server:2017-latest
   ```

   This may take several minutes to run, as it is installing SQL Server on your Docker server.

1. Validate that the Docker container process named `tdm_sql_server` is currently running:

   ```bash
   docker ps
   ```

### Running SQL Server on Windows

1. [Install SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
   - Look for the SQL Server Express 2019 download link
   - Download and install the file called `SQL2019-SSEI-Expr.exe`
1. You can accept all the default installation instructions, but
   - Choose `Windows` and `SQL Server Authenitication` and use `Dogfood1!` as the `sa` (system administrator) password.
   - It will be helpful to also choose the option to install the client tools as well (`SQL Server Management Studio` and `sqlcmd`, in particular).

## Creating the Database

There are several ways to create a new database on a SQL Server, but the following allow you to do it from the command line for both Mac and Windows.

### Creating the Database via Docker (Mac, Linux, Windows)

You can run a single-line command to create the database in a **Git Bash** shell (or see below for step-by-step instructions):

```bash
docker exec -it tdm_sql_server /opt/mssql-tools/bin/sqlcmd -U sa -P Dogfood1! -Q "CREATE DATABASE tdmdev"
```

> See `Option 2 > NOTE` under the [Creating the Database (Windows)](#creating-the-database-windows) Docker section if you are trying to run in a **Windows Bash** shell.

The following steps are the same as the single-line command above but broken down step-by-step:

1. Start an interactive bash shell inside your running Docker container:

   ```bash
   docker exec -it tdm_sql_server bash
   ```

   Enter computer password, if prompted.

2. Inside the container, you can run the `sqlcmd` command that is pre-installed inside the container with your database credentials for your `sa` user:

   ```bash
   /opt/mssql-tools/bin/sqlcmd -U sa -P Dogfood1!
   ```

3. Create a `tdmdev` database (or any other name) inside the SQL Server container:

   ```SQL
   CREATE DATABASE tdmdev
   ```

   then on a separate line,

   ```SQL
   GO
   ```

   To learn more about Docker and understand the above commands, see this [Quickstart Guide.](https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-bash)

### Creating the Database (Windows)

If running SQL Server on Windows,

- run:

  ```bash
  sqlcmd -U sa -S localhost\Sqlexpress -P Dogfood1! -Q "CREATE DATABASE tdmdev;"
  ```

  (or replace `Sqlexpress` with your own instance name.)

If running SQL Server in Docker, run one of the following options:

- Option 1 (use `sqlcmd` from Windows):

  ```bash
  sqlcmd -U sa -S localhost,1434 -P Dogfood1! -Q "CREATE DATABASE tdmdev;"
  ```

  or

- Option 2 (run `sqlcmd` in the Docker container):

  You can run the same set of instructions as the above section, [Creating the Database via Docker (Mac, Linux, Windows)](#creating-the-database-via-docker-mac-linux-windows).

  > NOTE: Running in Windows Bash shell may cause issues.

  If you try running the single-liner Docker command on a Windows Bash shell (as opposed to Git Bash), you will likely get this:

  ```bash
  $ docker exec -it tdm_sql_server /opt/mssql-tools/bin/sqlcmd -U sa -P Dogfood1! -Q "CREATE DATABASE tdmdev"
  OCI runtime exec failed: exec failed: container_linux.go:349: starting container process caused "exec: \"C:/Program Files/Git/opt/mssql-tools/bin/sqlcmd\": stat C:/Program Files/Git/opt/mssql-tools/bin/sqlcmd: no such file or directory": unknown
  ```

  This is a problem with the heuristics that MinGW / Git Bash uses to map Windows paths to POSIX paths in the target container. [This page](https://andydote.co.uk/2018/06/18/git-bash-docker-volume-paths/) suggests the following work-around:

  ```bash
  MSYS_NO_PATHCONV=1 docker exec -it tdm_sql_server /opt/mssql-tools/bin/sqlcmd -U sa -P Dogfood1! -Q "CREATE DATABASE tdmdev"
  ```

  However, [this page](http://mingw.org/wiki/Posix_path_conversion) describes the heuristics that Git Bash uses to to map paths from Windows to the bash shell, so you can also just change the path to the sqlcmd to start with two slashes like this:

  ```bash
  docker exec -it tdm_sql_server //opt/mssql-tools/bin/sqlcmd -U sa -P Dogfood1! -Q "CREATE DATABASE tdmdev"
  ```

  This problem also affects Docker volume mapping from a Git Bash shell.

## Connecting to the Local Database

You can [connect the application](#connecting-the-application) to your local database using by configuring your `.env` file with the correct local database settings. Optionally, you can also [connect to a client tool](#connecting-with-a-client-tool-optional) so you can easily view the database with a GUI.

### Connecting the Application

If you followed the instructions from the previous sections, you should have the following property values:

- server name = `localhost`
  - The server name corresponds to a physical machine (or virtual machine or Docker container), but it is common to install two or more SQL Server \_instances\* on a single server, in which case the different instances are distinguished by an _instance name_.
- username = `sa`
- password = `Dogfood1!`
- database = `tdmdev`

> For experienced developers who may occasionally connect to the shared development server, you may have a few sets of connection parameter settings in your `.env` file, and uncomment only the one you need at that particular time.

**On Docker (Mac, Linux, Windows):**

1.  **Edit the `.env` file with your local database connection string information.**
    To run in Docker, we use port number `1434` and do not use an instance name:

        ```env
        SQL_SERVER_NAME=localhost
        SQL_SERVER_INSTANCE=
        SQL_SERVER_PORT=1434
        SQL_DATABASE_NAME=tdmdev
        SQL_USER_NAME=sa
        SQL_PASSWORD=Dogfood1!
        ```

    - The container will be running SQL Server without an instance name on port 1433 internally; the previous set of instructions re-mapped this to a different external port, which we arbitrarily chose as `1434`. This alternative port number helps avoid a potential conflict with the default instance of SQL Server for those who are running Windows Pro, and may want to run your local database for the project in Docker.

1.  Source the `.env` file in order to specify the updated configurations in your local shell environment by running:

    ```bash
    source .env
    ```

    > NOTE: You will need to `source` the `.env` file any time you update your local environment variables

**On Windows:**

1. To connect to a local database installed conventionally on Windows with the SQL Express edition, use the instance name `SQLEXPRESS` and no port number:

   ```env
   SQL_SERVER_NAME=localhost
   SQL_SERVER_INSTANCE=SQLEXPRESS
   SQL_SERVER_PORT=
   SQL_DATABASE_NAME=tdmdev
   SQL_USER_NAME=sa
   SQL_PASSWORD=Dogfood1!
   ```

   Server Instance:

   - If you installed the **free SQL Server Express edition for the first time**, **the instance name will be `SQLEXPRESS`**.
   - If you installed **any other edition for the first time**, it will have an **empty instance name,** also called the `default` instance.
   - If you are using the **Windows `default` instance**, omit "SQLEXPRESS" or change it to the appropriate instance name for the instance you want to use.

   Port Number:

   - The `default` instance is accessible on port 1433.
   - If you have **other instances**, they are each randomly assigned to a different port to avoid conflict.
     - Windows will handle mapping instance names to the corresponding port on the server.

   > The upshot is that when you install SQL Server on Windows, you should not specify a port number, and only specify an instance name if there is one for the instance you want to use.

### Connecting with a Client Tool (Optional)

It is generally helpful when working with SQL Server to have a client for testing connections and developing queries. There are a few good options:

- You can download [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15). Since this is a cross-platform (Windows/macOS/Linux) application, we will be using it in any examples below.
- [Microsoft's SQL Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) is the historical standard tool for working with MS SQL Server, but only runs on Windows machines. It is an installation option when you install any version of MS SQL Server on your machine, and can also be installed separately.
- You can also use some other tool, like [DBeaver](https://dbeaver.io/download/).

To connect with Azure Data Studio:

- Start Azure Data Studio
- Select on the "Create a Connection" button
- Enter connection details:
  - Server: `locahost,1434` for SQL on docker, or `localhost\SQLEXPRESS` for SQL on Windows
  - Authentication Type: `SQL Login`
  - User Name: `sa`
  - Password: `Dogfood1!`
    Leave the other settings at their default, and press "Connect"

To connect with SQL Server Management Studio on Windows,

- Note that the servername in the login will be `locahost,1434` (for SQL on docker) or `localhost\SQLEXPRESS` (for SQL on Windows) use this exact punctuation or the connection will not work.

To connect with DBeaver:

- Start DBeaver
- Select the "Connect to database" button and choose SQL Server
- Enter connection details:
  - Host: `localhost`
  - Database/Schema: `tdmdev`
  - Port: `1434` for SQL on docker, or `SQLEXPRESS` for SQL on Windows
  - Authentication: `SQL Server Authentication`
  - User name: `sa`
  - Password: `Dogfood!`
  - Leave the other settings at their default, press "Test Connection" to validate the connection, and press "Finish"

## Running Database Migrations and the App

1.  Install all the npm packages if you haven't done so already by running `npm install` in the root directory

1.  Create the database schema and populate it with seed data by running:

        ```bash
        npm run flyway:migrate
        ```

        This will run the SQL scripts in the `/db/migration` folder to populate the database with an up-to-date TDM schema and data.

        If the migration is successful, you will see a message that ends with a message saying something like

    `Successfully applied X migrations for schema [dbo]...`

1.  At this point, you should be able to start the application as usual, by running `npm start`, and it will be using the local database. HOORAY!

## Working with Migrations

In order to make changes to the database schema or reference data, you will need to write SQL or Transact-SQL scripts and test them in your local database. When the scripts are ready, you can create a migration file in the `/db/migration` directory with those SQL scripts and submit a pull request with your changes. We are using a node [wrapper library](https://www.npmjs.com/package/node-flywaydb) around the [Flyway CLI tool](https://flywaydb.org/documentation/commandline/) to run our migrations.

> NOTE: It's important to never edit pre-existing migration files as it may cause the migrations to fail (due to different checksums)

### Writing and Testing Your SQL Scripts

Most client tools allow you to create a "New Query" where you can directly write and test your SQL or Transact-SQL scripts in your local database. You could also write your SQL scripts in the Docker SQL Server container. (See step-by-step instructions in the [Create the Database](#create-the-database-via-docker-mac-linux-windows) section for example.)

When you are confident in your SQL or TRANSACT-SQL script, you will need to create a new migration file, e.g.`V0002__update_foobar_table.sql`.

### Adding New Migration Files - Naming Convention

![Image of Flyway Naming Convention](https://i.stack.imgur.com/sTJeU.png)

Create a new file in the `/db/migration` directory, using Flyway's naming convention, e.g. `VXXXX__*.sql`.

- Version (`XXXX`): four digit numbers in sequence of files already there
- Separator (`__`): two consecutive underscores that separate the version from the description
- Description (`*`): a snake-cased short description of the change you are making

### Testing Migration Files and Running Flyway Commands

Because our [node library](https://www.npmjs.com/package/node-flywaydb) is simply [a wrapper](https://github.com/markgardner/node-flywaydb/blob/d80e8356cdb57d5660a99220c457a83fae00188a/bin/flyway.js) around the Flyway CLI, you can utilize some of the Flyway commands that we've set up:

- `npm run flyway:migrate` will run your migration file on your local database. (This is the main one you will use.)
  - It will migrate the schema to the latest version.
  - Flyway will also create the metadata table automatically if it doesn't exist.
    > TIP: Change your database data beforehand (e.g. with your client tool) to something different in order to check that the new migration file works.
- `npm run flyway:info`
  - Prints the details and status information about all the migrations
- `npm run flyway:validate`

  - Validates applied migrations against resolved ones (on the filesystem or classpath) to detect accidental changes that may prevent the schema(s) from being recreated exactly.
    - Validation fails if:
      - Differences in migration names, types or checksums are found
      - Versions have been applied that aren't resolved locally anymore
      - Versions have been resolved that haven't been applied yet

- `npm run flyway:repair`
  - Repairs the Flyway metadata table. This will perform the following actions:
    - Remove any failed migrations on databases without DDL transactions
      (User objects left behind must still be cleaned up manually)
    - Correct wrong checksums

### Creating a Pull Request

- When you submit your PR, the migration file will be included in your PR and get saved to the develop branch in the repo.
- The developer who approves and merges your PR to the develop branch should then be able to run migrations against the shared development database to apply your changes as part of the merge.

### More info on migrations (TBD)

- Rolling back a migration?
- Writing a script using DBeaver or MSSMS.

<!-- ## Debugging Tips -->

### Docker

- To learn more about using SQL Server in Docker, check out this [Quickstart Guide.](https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-bash)
- To check if your SQL Server container is running, run: `docker ps`
- If you get an error due to permission level, add `sudo` in front of the docker command. e.g. `sudo docker exec -it tdm_sql_server bash`
- To run SQL or TRANSACT-SQL commands inside your docker container:

  ```bash
  docker exec -it tdm_sql_server /opt/mssql-tools/bin/sqlcmd -U sa -P Dogfood1!
  ```

  - If successful, you should get to a sqlcmd command prompt: `1>`
  - To show existing databases in the SQL container

    ```SQL
      SELECT Name from sys.Databases
      GO
    ```

    > `GO` should be on the following line

- Run `exit` to exit the container or shell
- To stop running the SQL Server container, run `docker stop tdm_sql_server`
- To show hidden Docker containers (that may have been stopped, but not yet removed), run `docker ls -a`
- To remove a container, run `docker remove tdm_sql_server`
  > NOTE: The container must be stopped before it can be removed
- See more Docker examples and basic commands in the [Deployment](./deployment.md) docs
