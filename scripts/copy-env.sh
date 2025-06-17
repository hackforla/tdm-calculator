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
  rm -f env/docker/node
  rm -f env/docker/vite
  rm -f env/docker/urls
  rm -f env/docker/db
  rm -f env/docker/sendgrid
  rm -f env/host/db
  rm -f env/host/sendgrid
  { set +x; } 2>&-;
}

if [ "$1" == "delete" ]; then
  # Delete env override files
  remove_all_env
elif [ "$1" == "all" ]; then
  # Docker everything (app + DB + sendgrid-mock)
  remove_all_env
  copy_env .env
  copy_env env/docker/node
  copy_env env/docker/vite
  copy_env env/docker/urls
  copy_env env/docker/db
  copy_env env/docker/sendgrid
elif [ "$1" == "app" ]; then
  # Host app + shared DB
  remove_all_env
  copy_env .env
  copy_env env/docker/node
  copy_env env/docker/vite
  copy_env env/docker/urls
elif [ "$1" == "local-db" ]; then
  # Docker DB + sendgrid-mock
  remove_all_env
  copy_env .env
  copy_env env/docker/db
  copy_env env/host/db
  copy_env env/host/sendgrid
elif [ "$1" == "shared-db" ]; then
  # No Docker (local app + shared DB)
  remove_all_env
fi
