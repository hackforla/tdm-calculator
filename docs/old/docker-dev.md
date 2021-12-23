# Running Docker for Development

For development purposes, you may want to run the web api
server as a docker container with NODE_ENV="development".
This allows you to modify node/express code and have the
container watch for changes to files and automatically
restart the express server using nodemon. This gives you
a development experience similar to what you would have
if you just ran express on your native machine.

The main advantage of doing development with docker hosting
the express server is that the environment will exactly
replicate the production environment as far as node and npm versions and versions of all the npm packages.

This uses the `docker-compose.yml` docker compose script, which, in turn, uses the `dockerfile.dev` build instructions to build an image that is suitable for running
during development. A production build uses a slimmed-down image defined in
`dockerfile` and explained in the [Deployment](/docs/deployment.md) section`

## Building a dev version of the web api server

```bash
docker-compose up
```
