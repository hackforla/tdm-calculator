# Database Deployment

The TDM project deployment environment consists of:

1. A Microsoft SQL Server database, and
1. A Node/Express web server that serves as both a web api server servicing AJAX request from the client browser and a static page server to HTML pages to the client browser, including react.js and other assets required for running the client application in a web browser. This is packaged and deployed as a Docker image to an Azure App Service for Containers.

Assuming that an environment is already set up, deployment consists of

1. Applying database migrations to the database as described in this document, and
1. Building the docker image of the web server, publishing the image to Docker Hub, and loading this image into the hosted docker daemon as described in [Application Deployment to a Docker Environment](/docs/deployment.md).

## Deploying Database Changes to an Existing Database

The document [Setting Up a Local Development Database](/docs/local-database.md) describes in
detail how to work with flyway database migrations.
For deployment purposes, all we need to do is apply migrations to an existing database, and flyway will
hopefully apply the migration scripts without problems. Of course, you will need to have the
database connection credentials to log in to the
database you are upgrading in your `/server/.env` file.

Step 1: From a terminal open to the /server folder,
open the `.env` file and uncomment the database
connection settings for the database to be migrated,
making sure all other sets of connection parameters
are left commented. Save the change to this file.

Step 2: Run

```
npm run flyway:migrate
```

Hopefully, you will see console output that either indicates there were no migrations to be run, or that the migrations ran successfully, and a certain
number of migrations were applied.

If this is not the case, you will need to refer to
[Application Deployment to a Docker Environment](/docs/deployment.md) to figure out what happened and
resolve any issues.
