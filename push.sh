#!/usr/bin/env sh
set -u

git fetch || exit 1

PROJECT_ROOT_DIRECTORY=$(pwd)
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

# Abort script if on develop branch
if [[ "$CURRENT_BRANCH" = "develop" ]]; then
  echo 'Aborting script. You are currently on the develop branch. Please make a feature branch with your commit(s) to run script. ';
  exit 1;
fi

# Run frontend tests if the client directory has changes on the current branch and is different from origin/develop
# and automatically fix linter problems, if possible
CLIENT_FILE_COUNT=$(git diff --name-only origin/develop HEAD | grep -c ^client)
if [ "$CLIENT_FILE_COUNT" -gt 0 ]
then
  echo '*************  FRONTEND CLIENT TESTS  *************'
  cd $PROJECT_ROOT_DIRECTORY/client
  npm run lint:fix
  npm run test:ci || exit 1
else
  echo 'Skipping frontend tests because no relevant changes were found'
fi

# Run backend tests if the server directory has changes on the current branch and is different from origin/develop
SERVER_FILE_COUNT=$(git diff --name-only origin/develop HEAD | grep -c ^server)
if [ "$SERVER_FILE_COUNT" -gt 0 ]
then
  echo '*************  BACKEND SERVER TESTS *************'
  cd $PROJECT_ROOT_DIRECTORY/server
  npm run lint:fix
  npm run test || exit 1
else
  echo 'Skipping backend server tests because no relevant changes were found'
fi

# Run cypress tests if any file in the cypress, server, or client directories on the
# current branch are different from origin/develop
CYPRESS_FILE_COUNT=$(git diff --name-only origin/main HEAD | grep -c ^cypress)
if [ "$SERVER_FILE_COUNT" -gt 0 ] || [ "$CLIENT_FILE_COUNT" -gt 0 ] || [ "$CYPRESS_FILE_COUNT" -gt 0 ]
then
echo '*************  CYPRESS JOURNEY TESTS  *************'
cd $PROJECT_ROOT_DIRECTORY/cypress
#npm run lint:fix
npm run test || exit 1
else
  echo 'Skipping cypress journey tests because no relevant changes were found'
fi

# Push current local branch to a remote branch on github
git push origin HEAD
