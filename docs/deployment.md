# Application Deployment to Docker Environments

The TDM project deployment environment consists of:

1. A Microsoft SQL Server database, and
1. A Node/Express web server that serves as both a web api server servicing AJAX request from the client browser and a static page server to HTML pages to the client browser, including react.js and other assets required for running the client application in a web browser. This is packaged and deployed as a Docker image to an Azure App Service for Containers.

Assuming that an environment is already set up, deployment consists of

1. Applying database migrations to the database as described in [Database Deployment](/docs/deployment-database.md), and
1. Building the docker image of the web server, publishing the image to Docker Hub, and loading this image into the hosted docker daemon as described in this document.

## Building and Running a Full-Stack Container on Your Local Machine

We can build and run the application (express and react) in a single container using the database connection parameters
supplied when the docker container is run by building and running the build instructions in the Dockerfile image.

To build the docker image `tdmcalc/tdmapp` from the project root directory:

```bash
docker build -t tdmcalc/tdmapp .
```

This will use the instructions in the file `Dockerfile` to build a docker image named `tdmcalc/tdmapp`. By default, docker looks for the file named `Dockerfile` for instructions, the -t option allows us to tag the image with a friendly name `tdmcalc/tdmapp`, and the period tells docker to start from the current (i.e. root) directory. Note that this will use the connection parameters from the .env file to connect to a database, and build the connection parameters into the docker image.

To create a container from this image and run it on the local docker engine:

1. Check to see if there is already a container named `tdmtest` running:

```
docker ps --all --filter name=tdmtest
```

This will find all containers where the name contains the string 'tdmtest', you are
only interested in the one where the whole name is 'tdmtest'.

2. If an existing container was found, remove it:

```
docker rm --force tdmtest
```

3. Create an container from the tdmcalc/tdmapp image and run it with
   environment variables that connect to the local postgres instance. If postgres
   is installed directly on your native (Windows) machine, use:

```
docker run -it -p 5001:5000 --name tdmtest \
-e SQL_SERVER_NAME=host.docker.internal \
-e SQL_SERVER_INSTANCE=SQLEXPRESS \
-e SQL_SERVER_PORT= \
-e SQL_DATABASE_NAME=tdmdev \
-e SQL_USER_NAME=sa \
-e SQL_PASSWORD=Dogfood1! \
-e SQL_ENCRYPT=true \
tdmcalc/tdmapp
```

If postgres is installed in a separate docker container as described in the [Local Database](local-database.md) instructions, use:

```
docker run -d -p 5001:5000 --name tdmtest \
-e SQL_SERVER_NAME=host.docker.internal \
-e SQL_SERVER_INSTANCE= \
-e SQL_SERVER_PORT=1434 \
-e SQL_DATABASE_NAME=tdmdev \
-e SQL_USER_NAME=sa \
-e SQL_PASSWORD=Dogfood1! \
tdmcalc/tdmapp
```

In either case, note that:

- The -d option allows the container to run as a daemon in the background.
- The port mapping `-p 5001:5000` allows you to run the application from the
  url http://localhost:5001

- Since our database has a servername of localhost, and we need to access the
  localhost on our native machine (Mac or Windows) from within the node container,
  there is a special docker alias of `host.docker.internal` that refers to
  localhost outside the container. This apparently does not work on Linux
  see [this article](https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach). If the database was not hosted on localhost, the SQL_SERVER_NAME would
  be the normal server name of the MS SQL server.
- The container will have a name of `tdmtest`, so you can list or remove the
  container by name as described in the previous 2 steps, or inspect the running container
  with `docker container inspect tdmtest`

## Publishing the Container to Docker Hub for the Development Environment

There are two options for publishing the TDM container to Docker Hub: Manual and Github Action:

### Option 1 (Preferred) Publishing the Container with a Github Action

When the release manager merges changes into the Github repo's
`develop` branch, a Github action found in the script
`/.github/workflows/docker.yaml` will detect the merge
and build the container from scratch on a Github-hosted
build server and push the tdmcalc/tdmapp container, tagging
it as tdmcalc/tdmapp:latest for deployment.

### Option 2 - Publishing the Container Manually

If there are problems with the Github action described in
Option 1, you may publish the container manually as follows:

To publish the application as a single full-stack container to Docker Hub, you must first build the image as described in the previous section if you haven't done so already:

```
docker build -t tdmcalc/tdmapp .
```

We can then push this image to the Docker Hub container under our tdmcalc team by:

```
docker push tdmcalc/tdmapp
```

This publishes the application to Docker Hub under the tdmcalc account with the
image name tdmapp and the tag `latest`, so the fully-qualified container name
on Docker Hub will be tdmcalc/tdmapp:latest.

## Publishing the Container to Docker Hub for the UAT Environment

For a UAT or production release, we want to use the release version number as the tag, instead of `latest`. This will make the UAT image available in Docker Hub for deployment to the UAT environment. As with publishing for the development environment, there are two options:

### Option 1 (Preferred) Publishing the Container with a Github Action

When the release manager merges changes into the Github repo's
`main` branch, the Github action found in the script
`/.github/workflows/docker.yaml` will detect the merge
and build the container from scratch on a Github-hosted
build server and push the tdmcalc/tdmapp container.
The workflow checks out the GitHub repository, and uses the build-push-action action to build and push the Docker image. It sets the build-push-action option tag_with_ref to automatically tag the built Docker image with the Git reference of the workflow event. This workflow is triggered on publishing a GitHub release, so the reference will be the Git tag for the release. To wit, the
container will be tagged with the release tag, e.g. `tdmcalc/tdmapp:2.0.14`.

### Option 2 - Publishing the Container Manually

If there are problems with the Github action described in
Option 1, you may publish the container manually as follows:

To publish the application as a single full-stack container to Docker Hub, you must first build the image as described in the previous section if you haven't done so already:

```
docker build -t tdmcalc/tdmapp .
```

You then tag the image with the release number:

```
docker tag tdmcalc/tdmapp tdmcalc/tdmapp:2.0.14
```

and then publish this image to Docker Hub:

```
docker push tdmcalc/tdmapp:2.0.14
```

## Setting up a Container App Service in Azure

The final step in deploying the application is to deploy the container to the hosting environment. The TDM project is for the Los Angeles Department of Transportation, and
their production hosting environment will be on
Microsoft Azure, so we created a TDM Azure account for
hosting the DEV environment, and collaborated with
Lon Soh at LADOT to get access to the city's Azure
account for hosting the UAT environment.

The wiki page [Azure Deployment](https://github.com/hackforla/tdm-calculator/wiki/Azure-Deployment) has a
walk-through of how to create an Azure account and set
up deployment.

The current environments are deployed to:

- DEV: [tdmdev.azurewebsites.net](https://tdmdev.azurewebsites.net)
- UAT: [tdmuat.azurewebsites.net](https://tdmuat.azurewebsites.net)
