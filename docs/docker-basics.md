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
