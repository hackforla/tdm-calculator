#!/usr/bin/env sh
set -u

git fetch || exit 1

# check the wiki if you have errors, maybe the answers are there:
# https://github.com/hackforla/tdm-calculator/wiki/Testing


PROJECT_ROOT_DIRECTORY=$(pwd)
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

# Abort script if on develop branch
if [[ "$CURRENT_BRANCH" = "develop" ]]; then
  echo 'Aborting script. You are currently on the develop branch. Please make a feature branch with your commit(s) to run script. ';
  exit 1;
fi

# Run frontend tests if the client directory has changes on the current branch and is different from origin/develop
# and automatically fix linter problems, if possible
echo '*************  FRONTEND CLIENT TESTS  *************'
CLIENT_FILE_COUNT=$(git diff --name-only origin/develop HEAD | grep -c ^client)
if [ "$CLIENT_FILE_COUNT" -gt 0 ]
then
  cd $PROJECT_ROOT_DIRECTORY/client
  npm run lint:fix
  npm run test:ci || exit 1
else
  echo 'Skipping frontend tests because no relevant changes were found'
fi

# Run backend tests if the server directory has changes on the current branch and is different from origin/develop
echo '*************  BACKEND SERVER TESTS *************'
SERVER_FILE_COUNT=$(git diff --name-only origin/develop HEAD | grep -c ^server)
if [ "$SERVER_FILE_COUNT" -gt 0 ]
then
if ! docker info > /dev/null 2>&1; then
  echo "The server tests use docker, and it isn't running - please start docker and try again."
  exit 1
fi
  cd $PROJECT_ROOT_DIRECTORY/server
  npm run lint:fix
  npm test || exit 1
else
  echo 'Skipping backend server tests because no relevant changes were found'
fi

# Push current local branch to a remote branch on github
git push origin HEAD
