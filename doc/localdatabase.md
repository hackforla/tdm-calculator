# Working with a Local Development Database

If you are working on issues that require making changes to the database schema or reference data (i.e., data that is considered part of the application, such as lookup lists, or, in the case of TDM, CalculationRules),
then you should work with a _copy_ of the shared development database on your local machine.

## Overview

If you develop on an IOS or Linux machine, you should
install Docker CE and run a Microsoft SQL Server Express
container.

If you work on Windows Home edition, you should install
Microsoft SQL Server Express edition on your machine.

For Windows Pro Edition, you can either install Microsoft SQL Server Express edition on your machine or install Docker CE and run the database in a docker container.

If you are working on Windows and already have any instance of SQL Server installed, you may just use your existing instance for development.

It is generally helpful when working with SQL Server to have a client for testing connections and developing queries. There are a few good options:

- You can download [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15). Since this is a cross-platform (Windows/IOS/Linux) application, we will be using it in any examples below.
- Microsoft's SQL Server Management Studio is the historical standard tool for working with MS Sql Server, but only runs on Windows machines. It is an installation option when you install any version of MS SQL Server on your machine, and can also be [installed separately](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15).
- You can use some other tool, like DBeaver, if you have experience with it.

Once you have a local copy of SQL Server on your machine, create a database called _tdmdev_. (You can use a different name if you want, and modify the subsequent instructions accordingly.)

Configure the development environment to connect to the local database by editing the .env file with your local database connection string information.

Perform a database migration to create the database schema and populate it with seed data. Open a terminal on the root drive of the repo and run

```
npm run flyway:migrate
```

This will run the SQL scripts in the /db/migration folder to populate the database with an up-to-date TDM schema.

At this point, you should be able to run the application as usual, and it will be using the local database.

When you need to make changes to the database schema or reference data, you will need to write a Transact SQL script to effect the changes you want and try it out with your local database. When you are
ready to submit a PR for your changes, create a new database migration file in the /db/migration folder. It should have a version number of the form V1.XXXX\__, where XXXX is the next four digit number in sequence after the one you find there already, and _ is a snake-cased short description of the change you are making. Then you paste your script into this file. When you submit your PR, the migration file will be included in your PR and get saved to the develop branch in the repo. The developer who merges to the develop branch should then be able to run migrations against the shared development database to apply your changes as part of the merge.

If for any reason, you corrupt your local database, you can simply drop the tdmdev database from your local SQL Server, rec-create it empty and run migrations again to start over.

The sections below provide more detail about each aspect mentioned above:

## Running in Docker

Install Docker CE

```
docker version
```

```
sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Dogfood1!" \
   -p 1434:1433 --name tdmdb \
   -d mcr.microsoft.com/mssql/server:2017-latest
```

(Omit `sudo` on Windows)
This may take several minutes to run, as it is installing SQL Server on your docker server.

If you then run

```
docker ps
```

you should see a container with the name `tdmdb` running.

Create the database (Windows)

```
sqlcmd -U sa -S localhost,1434 -P Dogfood1! -Q "CREATE DATABASE tdmdev;"
```

Create the database (Mac)

Make sure you can connect to the database from Azure Data Studio:
Start Azure Data Studio, and press on the "Create a Connection" button, then
for connection details, enter

- Server: locahost,1434
- Authentication Type: SQL Login
- User Name: sa
- Password: Dogfood1!
  Leave the other settings at their default, and press "Connect"

## Installing SQL Server on Windows

## Connecting to the local database

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

## Working with Flyway Migrations
