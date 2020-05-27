 FROM node:alpine as clientBuilder

COPY ./client /
WORKDIR /

RUN apk update && apk add bash
RUN npm install
RUN npm run build

FROM node:alpine

RUN apk update
RUN apk add --no-cache ca-certificates


COPY --from=clientBuilder /dist ./static

COPY ./server .

RUN pip3 install -r requirements.txt
# COPY server/templates /app/templates
# COPY server/static /app/static

RUN chmod 777 /app/startup.sh

EXPOSE 80

ENTRYPOINT ["/app/startup.sh"]