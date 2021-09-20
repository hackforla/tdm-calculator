#!/usr/bin/env sh
set -u

git fetch || exit 1

# Abort script is on develop branch
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$CURRENT_BRANCH" = "develop" ]]; then
  echo 'Aborting script. You are currently on the develop branch. Please make a feature branch with your commit(s) to run script. ';
  exit 1;
fi

# Run frontend tests if the client directory has changes on the current branch and is different from origin/develop
# and automatically fix linter problems, if possible
client_file_count=$(git diff --name-only origin/develop HEAD | grep -c ^client)
if [ "$client_file_count" -gt 0 ]
then
  echo '*************  FRONTEND CLIENT TESTS  *************'
  cd client
  npm run lint:fix
  npm run test:ci || exit 1
  cd ..
else
  echo 'Skipping frontend tests because no relevant changes were found'
fi

# Run backend tests if the server directory has changes on the current branch and is different from origin/develop
server_file_count=$(git diff --name-only origin/develop HEAD | grep -c ^server)
if [ "$server_file_count" -gt 0 ]
then
  echo '*************  BACKEND SERVER TESTS *************'
  cd server
  npm run lint:fix
  npm run test || exit 1
  cd ..
else
  echo 'Skipping backend server tests because no relevant changes were found'
fi

# Run cypress tests if any file in the cypress, server, or client directories on the
# current branch are different from origin/develop
cypress_file_count=$(git diff --name-only origin/main HEAD | grep -c ^cypress)
if [ "$server_file_count" -gt 0 ] || [ "$client_file_count" -gt 0 ] || [ "$cypress_file_count" -gt 0 ]
then
  echo '*************  CYPRESS JOURNEY TESTS  *************'
  cd cypress
  #npm run lint:fix
  npm run test || exit 1
  cd ..
else
  echo 'Skipping cypress journey tests because no relevant changes were found'
fi

# Push current local branch to a remote branch on github
git push origin HEAD
