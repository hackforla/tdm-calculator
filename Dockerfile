FROM node:alpine as clientBuilder

COPY ./client /app
WORKDIR /app

RUN npm install
RUN npm run build

FROM node

COPY --from=clientBuilder /app/build /client

COPY . /

WORKDIR /

RUN npm install

ENTRYPOINT ["/usr/local/bin/node", "server.js"]


