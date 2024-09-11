FROM node:20.11.1-alpine3.19

WORKDIR /usr/src/app

COPY ./src ./src
COPY ./package.json .
COPY ./node_modules ./node_modules


CMD [ "npm","run dev" ]