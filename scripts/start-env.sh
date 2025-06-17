#!/bin/bash
set -eu

# Usage
#
# ./scripts/start-env.sh <config> <action>
# ./scripts/start-env.sh all build
# ./scripts/start-env.sh all up -d

# Configs
#
# all
# app
# local-db
# shared-db

# Actions
#
# build [--no-cache] [--progress plain] [--pull]
# config [--environment]
# up [-d]
# down [-v] [--remove-orphans]
# # no action if using shared-db config

# Usage if the config is not valid
if [[ "$1" != "all" && "$1" != "app" && "$1" != "local-db" && "$1" != "shared-db" ]]; then
  echo "Usage: $0 [all|app|local-db] <compose action>"
  echo "Actions are [build|config|up|down]"
  echo ""
  echo "Example: $0 all build"
  echo "Example: $0 all up -d"
  echo "Example: $0 all down"
  exit 1
fi

# Start the environment in Docker containers, on the host, or both.
call_start() {
  { set +x; } 2>&-;
  if [ "$1" == "all" ]; then
    # Docker everything (app + DB + sendgrid-mock)
    set -x
    docker-compose \
    --env-file .env \
    --env-file env/docker/node \
    --env-file env/docker/db \
    --env-file env/docker/sendgrid \
    --env-file env/docker/urls \
    --env-file env/docker/vite \
    "${@:2}"
  elif [ "$1" == "app" ]; then
    # Docker app + shared DB
    set -x
    docker-compose \
    --env-file .env \
    --env-file ./server/.env \
    --env-file env/docker/node \
    --env-file env/docker/urls \
    --env-file env/docker/vite \
    "${@:2}"
  elif [ "$1" == "local-db" ]; then
    # Docker DB + sendgrid-mock
    if [ "$2" == "up" ]; then
      # Insert db-migrate and sendgrid services
      # up -d ==> up db-migrate sendgrid -d
      set -- "$1" "up" "db-migrate" "sendgrid" "${@:3}"
    fi
    set -x
    docker-compose \
    --env-file .env \
    --env-file env/docker/db \
    --env-file env/host/sendgrid \
    "${@:2}"
    { set +x; } 2>&-;

    if [ "$2" == "up" ]; then
      # Start app locally
      npm run start:app-local-db
    fi
  elif [ "$1" == "shared-db" ]; then
    # No docker (local app + shared DB)
    set -x
    # Start app locally
    npm start
  fi
}

# Copy env files and start the environment
start_env() {
  set -x
  ./scripts/copy-env.sh "$1"
  call_start "$@"
}

start_env "$@"
