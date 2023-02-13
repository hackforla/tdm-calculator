FROM node:lts-alpine as clientBuilder

RUN mkdir /app
WORKDIR /app
COPY /client/package.json .
COPY /client/package-lock.json .
RUN npm ci --legacy-peer-deps && find node_modules ! -user root | xargs chown root:root
COPY /client .

RUN npm run build
RUN echo package.json

FROM node:lts-alpine

WORKDIR /

COPY --from=clientBuilder /app/build /client/build
COPY ./server/package.json ./
COPY ./server/package-lock.json ./

RUN npm ci  && find node_modules ! -user root | xargs chown root:root

COPY ./server/app ./app
COPY ./server/middleware ./middleware
COPY ./server/server.js ./

EXPOSE 5001
ENTRYPOINT ["/usr/local/bin/node", "./server.js"]


