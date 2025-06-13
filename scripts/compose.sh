#!/bin/bash
set -eu

# Usage
#
# ./scripts/compose.sh <config> <action>
# ./scripts/compose.sh all build
# ./scripts/compose.sh all up -d

# Configs
#
# all
# all-local
# app
# local-db

# Actions
#
# build --no-cache --progress plain --pull
# config --environment
# up -d
# down -v --remove-orphans


if [ "$1" == "all" ]; then
  # Docker everything (app + DB + sendgrid-mock)
  set -x
  docker-compose \
  --env-file .env \
  --env-file ./server/docker-config/.env \
  --env-file ./server/docker-config/.env.db \
  --env-file ./server/docker-config/.env.sendgrid \
  --env-file ./server/docker-config/.env.urls \
  --env-file ./client/docker-config/.env \
  "${@:2}"
elif [ "$1" == "app" ]; then
  # Docker app + shared DB
  # Rename server/docker-config/.env.db and
  # server/docker-config/.env.sendgrid to disable them
  # before running this.
  docker-compose \
  --env-file .env \
  --env-file ./server/.env \
  --env-file ./server/docker-config/.env \
  --env-file ./server/docker-config/.env.urls \
  --env-file ./client/docker-config/.env \
  "${@:2}"
elif [ "$1" == "local-db" ]; then
  # Docker DB + sendgrid-mock
  docker-compose \
  --env-file .env \
  --env-file ./server/docker-config/.env \
  --env-file ./server/docker-config/.env.db \
  --env-file ./server/docker-config/.env.sendgrid \
  "${@:2}"
  # up db-migrate sendgrid -d
fi
