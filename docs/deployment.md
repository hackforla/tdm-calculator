# Deployment to Docker Environments

The TDM project deployment environment consists of:

1. A Microsoft SQL Server database, and
1. A Node/Express web server that serves as both a web api server servicing AJAX request from the client browser and a static page server to HTML pages to the client browser, including react.js and other assets required for running the client application in a web browser. This is packaged and deployed as a Docker image to an Azure App Service for Containers.

Assuming that an environment is already set up, deployment consists of

1. Applying database migrations to the database, and
1. Building the docker image of the web server, publishing the image to Docker Hub, and loading this image into the hosted docker daemon.

## Running the application in a container

We can build and run the application (express and react) in a container using the database connection parameters
from the .env file by building and running the build instructions in the Dockerfile image.

To build the docker image `tdmcalc/tdmapp` from the project root directory:

```bash
docker build -t tdmcalc/tdmapp .
```

This will use the instructions in the file `Dockerfile` to build a docker image named `tdmcalc/tdmapp`. By default, docker looks for the file named `Dockerfile` for instructions, the -t option allows us to tag the image with a friendly name `tdmcalc/tdmapp`, and the period tells docker to start from the current (i.e. root) directory. Note that this will use the connection parameters from the .env file to connect to a database, and build the connection parameters into the docker image.

To create a container from this image and run it on the local docker engine:

```
docker run -d -p 5050:5000 --name tdm tdmcalc/tdmapp
```

Where the -it option allows the command line to interact with the running container

To inspect the running container:

```bash
docker container inspect <containerid>
```

Where <containerid> can be replaced with the container guid or the container name, e.g.,

```
docker container inspect tdm
```

for the container created above.

This will run our application in an environment that duplicates the production environment.

We can swap in different environment variables to run against our local database:

```
docker run -d -p 5052:5000 --name tdmlocal \
-e SQL_SERVER_NAME=host.docker.internal \
-e SQL_SERVER_INSTANCE= \
-e SQL_SERVER_PORT=1434 \
-e SQL_DATABASE_NAME=tdmdev \

-e SQL_USER_NAME=sa \
-e SQL_PASSWORD=Dogfood1! \
tdmcalc/tdmapp

```

Since our database has a servername of localhost, and we need to access the
localhost on our native machine (Mac or Windows) from within the node container,
there is a special docker alias of `host.docker.internal` that refers to
localhost outside the container. This apparently does not work on Linux
see [this article](https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach).

We can then push this image to the Docker Hub container under our tdmcalc team by:

```
docker push tdmcalc/tdmapp
```

This publishes the application to Docker Hub under the tdmcalc account with the
image name tdmapp and the tag `latest`, so the fully-qualified container name
on Docker Hub will be tdmcalc/tdmapp:latest.

For a UAT or production release, we want to use the release version number as the tag.
To do this, you can tag the image created above with a version number:

```
docker tag tdmcalc/tdmapp tdmcalc/tdmapp:0.2.14
```

and then publish this image to Docker Hub:

```
docker push tdmcalc/tdmapp:0.2.14
```

Now it should be available for your deployment environment to pull the image
for deployment.

## Setting up a Container App Service in Azure

Log into Azure, and decide on an Azure Region near your users' location. I chose US West 2.

Create a Resource group for TDM

- Create an App Service Plan for TDM - The level you choose here will determine the
  pricing for the App Service. I chose the B1 plan to get this going, but we could
  also try the free App Service Plan.

- Create an App Service. This represents the actual container service.

  - Specify the
    Resource Group and App Service Plan from above.
  - Specify a Container App Service
    and Linux Operating System.
  - You will need to specify an application name. I chose
    tdmapp, so the default url is `tdmapp.azurewebsites.net`.

  - For Container settings, select Docker Hub, Repository Access = Public and the
    Full Image Name and Tag as `tdmcalc/tdmapp` and leave the Startup File blank.

  - Under TLS/SSL settings,
    set the HTTPS Only to On, and the minimum TLS Version to 1.2. I am not using a
    custom domain, so azure allows me to just use their SSL certificate.

  - Under Configuration, you will need to specify each of the environment variables
    for the SQL Server Connection as new "Application Settings"
  - Save your settings and wait a while (about 10 minutes?)

Then I was able to run the app (with HTTPS!) by navigating my browser to tdmapp.azurwebsites.net!!!

## Docker Basics

```bash
docker version
```

Verifies that the docker client is running on your machine and returns the version #

### Docker run

```bash
docker run hello-world
```

- Docker client contacted the Docker server.
- Server looks for image in it's image cache and does not find it, so it `pull`s the "hello-world" image from Docker Hub.
- Server created a new container from that image and runs the image's _default startup command_ - in this case calling some sort of hello world executable.
- Server streamed the output to Docker client, which sent it to terminal.
- The hello world executable finishes its task and since there is nothing left to do, it exits, which, in turn causes the container to exit - but leaves it in the server's container cache to start again later, if desired.

```bash
docker run busybox ls
```

- Download the busybox image if not in the image cache.
- Create a container from image and override the default startup command with `ls`, the command to list files in the container.
- Stream results to the terminal.
- Since `ls` completes, the process exits and the container exits

docker run is a combination of

```bash
docker create busybox echo Hello There
docker start -a <containerid>
```

Where the -a option (or --attach) makes the container attach its stdout/stderr output to the terminal

#### Docker ps

```bash
docker ps
```

List all the running containers on the docker server

```bash
docker ps --all
```

or

```bash
docker ps -a
```

List all the containers, including ones that have exited

```bash
docker prune
```

Removes all stopped images and dangling images from server.

#### Docker logs

This command allows you to retrieve the console logs from a container. For example:

```bash
$ docker create busybox echo hi there
2905656c9b592a90e94a2ef0507dbaf27e22aba53500319ec9554a7dd7962558

darra@Lenovo MINGW64 /c/git/hackforla/tdm-calculator (531-jwt-cookie-expires)
$ docker start 2905
2905

darra@Lenovo MINGW64 /c/git/hackforla/tdm-calculator (531-jwt-cookie-expires)
$ docker logs 2905
hi there
```

#### Docker stop / Docker kill

```bash
docker stop <containerid>
docker kill <containerid>
```

`stop' will issue a SGITERM message to the process, possibly giving it a chance to shutdown gracefully. However, if the process does not shut down within about 10 seconds, it will automatically kill the process.`kill` is more violent.

#### Multi-command containers

Want to run a client and server in the same container? Need to run an addition command inside a running container

```bash
docker run redis

docker exec -it <containerid> redis-cli
```

exec runs a command in `<containerid>`. The -i (or --interactive) option keeps stdin open, and the -t (or --tty) allocates a pseudo-TTY - together they allow you to interact with the container.

```bash
docker exec -it <containerid> sh
```

runs a command shell `sh` in the container. Some containers will have other shells such as `bash` or `zsh`.

### Starting a shell

```bash
docker run -it busybox sh
```

This runs the shell as the primary process, which is sometimes useful. More commonly, you will probably run some other main process, such as a server and exec as shell as described earlier.

#### Notes

Different docker containers do not, by default share any disk space and are completely isolated.

## Docker Volumes

Git Bash on Windows

MSYS_NO_PATHCONV=1 docker run -p 8080:3000 -v \$(pwd):/var/www -w /var/www node npm start

There should be a way to use escape characters for the volume and workdir related strings, but I haven't figured it out.

## Docker custom images

We can create our own images by creating a Dockerfile, then running `docker build` to process the Dockerfile to start with a base image and layer other stuff on top of it ot build our container and specify a startup command for our image.

```bash
docker build .
```

. is the _build context_, i.e., the directory from which the docker cli should run.

We can give the new image a name by tagging it:

```bash
docker build -t tdmcalc/tdmweb:0.0.1 .
```

Then we can run the image by:

```bash
docker run tdmcalc/tdmweb:0.0.1
```

You can manually take a running container and create an image out of it

```bash
docker commit -c 'CMD ["redis-server"]'  <containerid>
```

This is generally not something you would do, but demonstrates what happens when a dockerfile is processed.

## Dockerfile to build a custom image

```bash
docker-compose up -d
```

runs docker-compose.yml to startup multiple containers. The -d option starts them in the background.

```bash
docker-compose down
```

stops all the docker-compose referenced containers.
