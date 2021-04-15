#!/usr/bin/env sh
set -u

git fetch || exit 1

# Make sure you are on a branch



# Run frontend tests if the client directory in the current branch is different from origin/develop
client_file_count=$(git diff --name-only origin/develop HEAD | grep -c ^client)
if [ "$client_file_count" -gt 0 ]
then
  echo '*************  FRONTEND CLIENT TESTS  *************'
  cd client
  npm run lint:fix
  npm run test:ci || exit 1
else
  echo 'Skipping frontend tests because no relevant changes were found'
fi

# Run backend tests if the server directory in the current branch is different from origin/develop
server_file_count=$(git diff --name-only origin/develop HEAD | grep -c ^server)
if [ "$server_file_count" -gt 0 ]
then
  echo '*************  BACKEND SERVER TESTS *************'
  cd ../server
  npm run lint:fix
  npm run test || exit 1
else
  echo 'Skipping backend server tests because no relevant changes were found'
fi


# Run cypress tests if any file in the cypress, server, or client directories
# in the current branch are different from origin/develop
cypress_file_count=$(git diff --name-only origin/main HEAD | grep -c ^cypress)
if [ "$server_file_count" -gt 0 ] || [ "$client_file_count" -gt 0 ] || [ "$cypress_file_count" -gt 0 ]
then
  echo '*************  CYPRESS JOURNEY TESTS  *************'
  cd ../cypress
  #npm run lint:fix
  npm run test || exit 1
else
  echo 'Skipping cypress journey tests because no relevant changes were found'
fi

# git push origin HEAD
