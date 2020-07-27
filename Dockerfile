FROM node:alpine as clientBuilder

RUN mkdir /app
WORKDIR /app
COPY /client/package.json .
RUN npm install
COPY /client .

RUN npm run build
RUN echo package.json

FROM node

COPY . /
COPY --from=clientBuilder /app/build /client/build

WORKDIR /

RUN npm install

EXPOSE 5000

ENTRYPOINT ["/usr/local/bin/node", "server.js"]


