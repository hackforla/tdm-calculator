# Working with a Local Development Database

If you are working on issues that require making changes to the database schema or reference data (i.e., data that is considered part of the application, such as lookup lists, or, in the case of TDM, CalculationRules),
then you should work with a _copy_ of the shared development database on your local machine, which we will refer to as a `Local Database`.

## Overview

If you develop on an IOS or Linux machine, you should
install Docker CE and run a Microsoft SQL Server Express
container.

If you work on Windows Home edition, you should install
Microsoft SQL Server Express edition on your machine, since running docker on a Windows Home machine is very painful.

For Windows Pro Edition, you can either install Microsoft SQL Server Express edition on your machine or install Docker CE and run the database in a docker container, as you choose. If you are new to SQL Server, docker is probably easier.

If you are working on Windows and already have any instance of SQL Server installed, you may just use your existing instance for development.

Once you have a local copy of SQL Server on your machine, create a database called _tdmdev_. (You can use a different name if you want, and modify the subsequent instructions accordingly.)

Configure the development environment to connect to the local database by editing the .env file with your local database connection string information.

Perform a database migration to create the database schema and populate it with seed data. Open a terminal on the root drive of the repo and run

```
npm run flyway:migrate
```

This will run the SQL scripts in the /db/migration folder to populate the database with an up-to-date TDM schema.

At this point, you should be able to run the application as usual, and it will be using the local database.

When you need to make changes to the database schema or reference data, you will need to write a Transact SQL script to effect the changes you want and try it out with your local database. When you are
ready to submit a PR for your changes, create a new database migration file in the /db/migration folder. It should have a version number of the form `V1.XXXX__*.sql`, where XXXX is the next four digit number in sequence after the one you find there already, and \* is a snake-cased short description of the change you are making. Note that \_\_ is two consecutive underscores, and flyway will not recoginze your file if it doesn't follow this naming convention. Then you paste your script into this file. When you submit your PR, the migration file will be included in your PR and get saved to the develop branch in the repo. The developer who merges to the develop branch should then be able to run migrations against the shared development database to apply your changes as part of the merge.

If the migration is successful, you will see a message that ends with a message saying something like
`Successfully applied X migrations for schema [dbo]...`

If for any reason, you corrupt your local database, you can simply drop the tdmdev database from your local SQL Server, rec-create it empty and run migrations again to start over.

The sections below provide more detail about each aspect mentioned above:

## Installing SQL Server

### Running SQL Server in a Docker Container

Install Docker Desktop from [here](https://www.docker.com/get-started) and follow the provided instructions. This will install Docker client and a local Docker daemon (server) that can host docker containers.

The following command will run if docker is set up and ready to go:

```
docker version
```

Then you can download the official Microsoft SQL Server and create a local container named `tdmdb` by running:

```
sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Dogfood1!" -e "MSSQL_PID=Express"
   -p 1434:1433 --name tdmdb
   -d mcr.microsoft.com/mssql/server:2017-latest
```

(Omit `sudo` on Windows)
This may take several minutes to run, as it is installing SQL Server on your docker server.

If you then run

```
docker ps
```

you should see a container with the name `tdmdb` running.

### Running SQL Server on Windows

To run SQL Server on Windows, install SQL Server Express. Microsoft moves the donwload links very frequently, but at the time this was written, you can go to [this page](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) and look for the SQL Server Express 2019 download link which will download an installation file called `SQL2019-SSEI-Expr.exe`, which you can run to perform the install. You can accept all the default installation instructions, but choose Windows and SQL Server Authenitication and use `Dogfood1!` as the sa (system administrator) password. It will be helpful to also choose the option to install the client tools as well (SQL Server Management Studio and sqlcmd in particular).

## Create the Database

There are several ways to create a new database on a SQL Server, but the following allow you to do it from the command line

### Create the database (Windows)

If running SQL Server on Windows:

```
sqlcmd -U sa -S localhost\Sqlexpress -P Dogfood1! -Q "CREATE DATABASE tdmdev;"
```

(or replace Sqlexpress with your own instance name.)

If running SQL Server in a docker container,
Option 1 (use sqlcmd from Windows):

```
sqlcmd -U sa -S localhost,1434 -P Dogfood1! -Q "CREATE DATABASE tdmdev;"
```

or

Option 2 (run sqlcmd in the docker container):

```
docker exec -it tdmdb bash
/opt/msswl-tools/bin/sqlcmd -U sa -P Dogfood1! -Q "CREATE DATABASE tdmdev"
exit
```

### Create the Database (Mac)

Since you do not have the sqlcmd tool available from your terminal, you can run
the sqlcmd that is pre-isntalled inside the container:

```
sudo docker exec -it tdmdb bash
/opt/msswl-tools/bin/sqlcmd -U sa -P Dogfood1! -Q "CREATE DATABASE tdmdev"
exit
```

## Connecting to the local database

### Connecting with a client tool (Optional)

It is generally helpful when working with SQL Server to have a client for testing connections and developing queries. There are a few good options:

- You can download [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15). Since this is a cross-platform (Windows/IOS/Linux) application, we will be using it in any examples below.
- Microsoft's SQL Server Management Studio is the historical standard tool for working with MS Sql Server, but only runs on Windows machines. It is an installation option when you install any version of MS SQL Server on your machine, and can also be [installed separately](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15).
- You can use some other tool, like DBeaver, if you have experience with it.

For example, to connect with Azure Data Studio:
Start Azure Data Studio, and press on the "Create a Connection" button, then
for connection details, enter

- Server: `locahost,1434` for SQL on docker, or `localhost\SQLEXPRESS` for SQL on Windows
- Authentication Type: `SQL Login`
- User Name: `sa`
- Password: `Dogfood1!`
  Leave the other settings at their default, and press "Connect"

To connect from SQL Server Management Studio on Windows, note that the servername in the login will be `locahost,1434` (for SQL on docker) or `localhost\SQLEXPRESS` (for SQL on Windows) use this exact punctuation or the connection will not work.

### Connecting the Application and Migrations

Getting the TDM application and migrations to connect to your local database is primarily a matter of getting the related .env settings set up properly for your local database. If you followed the above instructions for local database installation, the SERVER*NAME s `localhost`, the username is `sa`, the password will be `Dogfood1!`, and the database is `tdmdev`.
The server name corresponds to a physical machine(or virtual machine or docker container), but it is common to install two or more SQL Server \_instances* on a single server, in which case the different instances are distinguished by an _instance name_. On Windows, if you install the free SQL Server Express edition for the first time, it will be assigned an instance name of `SQLEXPRESS`, but the first time you install any other edition, it will have an empty instance name - also called the "default" instance. The default instance is accessible on port 1433. If you have other instances, they are each randomly assigned to a different port to avoid conflict, and Windows handle mapping instance names to the corresponding port on the server. The upshot is that when you install SQL Server on Windows, you should not specify a port number, and only specify an instance name if there is one for the instance you want to use.

If you are using docker, the container will be running SQL Server without an instance name on port 1433 internally, and the instructions above re-map this to a different external port (I arbitrarily chose 1434). This avoids a potential conflict that you might have if you are running Windows Pro and already had a default instance of SQL Server installed on Windows, but wanted to run your local database for the project in docker.

So, to run in docker, we use no instance name and a port number of 1434:

```
SQL_SERVER_NAME=localhost
SQL_SERVER_INSTANCE=
SQL_SERVER_PORT=1434
SQL_DATABASE_NAME=tdmdev
SQL_USER_NAME=sa
SQL_PASSWORD=Dogfood1!
```

To connect to a local database installed conventionally on Windows with the SqlExpress edition, use the instance name and no port number:

```
SQL_SERVER_NAME=localhost
SQL_SERVER_INSTANCE=SQLEXPRESS
SQL_SERVER_PORT=
SQL_DATABASE_NAME=tdmdev
SQL_USER_NAME=sa
SQL_PASSWORD=Dogfood1!
```

(Omit "SQLEXPRESS" if you are using the Windows default instance or change it to the appropriate instance name for the instance you want to use.)

Since I tend to switch around which local database I am using and also occasionally connect to the shared development server, I will generally have a few sets of connection parameter settings in my .env file, and uncomment only the one I need at that particular time.

## Working with Flyway Migrations

(Claire to provide - the following sections are just an outline of what might be needed here.)

Writing a script using DBeaver or MSSMS.

Creating and naming a migration file in the solution

Testing a migration.

Submitting a PR with your migration

(Who/When should the migration be applied to the develop branch?)

Validating a migration?

Rolling back a migration?
