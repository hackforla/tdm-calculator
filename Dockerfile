FROM node:alpine as clientBuilder

RUN mkdir /app
WORKDIR /app
COPY /client/package.json .
RUN npm ci
COPY /client .

RUN npm run build
RUN echo package.json

FROM node

WORKDIR /

COPY --from=clientBuilder /app/build /client/build
COPY ./server/package.json /
COPY ./server/package-lock.json /

RUN npm ci

COPY ./server/server.js /
COPY ./server/app /
COPY ./server/middleware /

EXPOSE 5000

ENTRYPOINT ["/usr/local/bin/node", "server.js"]


