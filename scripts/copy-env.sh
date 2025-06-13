#!/bin/bash
set -eu

copy_env() {
  set -x
  cp "$1".example "$1"
  { set +x; } 2>&-;
}

remove_all_env() {
  set -x
  rm -f .env
  rm -f server/docker-config/.env.db
  rm -f server/docker-config/.env.node
  rm -f server/docker-config/.env.sendgrid
  rm -f server/docker-config/.env.urls
  rm -f server/local-config/.env.docker-db
  rm -f server/local-config/.env.sendgrid
  rm -f client/docker-config/.env.vite
  { set +x; } 2>&-;
}

if [ "$1" == "delete" ]; then
  # Delete env override files
  remove_all_env
elif [ "$1" == "all" ]; then
  # Docker everything (app + DB + sendgrid-mock)
  remove_all_env
  copy_env .env
  copy_env server/docker-config/.env.db
  copy_env server/docker-config/.env.node
  copy_env server/docker-config/.env.sendgrid
  copy_env server/docker-config/.env.urls
  copy_env server/local-config/.env.docker-db
  copy_env server/local-config/.env.sendgrid
  copy_env client/docker-config/.env.vite
elif [ "$1" == "app" ]; then
  # Host app
  remove_all_env
  copy_env .env
  copy_env server/docker-config/.env.node
  copy_env server/docker-config/.env.urls
  copy_env client/docker-config/.env.vite
elif [ "$1" == "local-db" ]; then
  # Local DB
  remove_all_env
  copy_env .env
  copy_env server/docker-config/.env.db
  copy_env server/local-config/.env.sendgrid
fi
