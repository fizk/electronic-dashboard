#
#
#
#
FROM node:22-bookworm AS dev

WORKDIR /var/app

#
# Builds SOURCE CODE
# 
# This step convers all TypeScript to JavaScript
# as well as generating any additional artifacts
# like CSS etc.
#
FROM node:22-bookworm AS build

WORKDIR /app

COPY ./package.json package.json
COPY ./package-lock.json package-lock.json
COPY ./tsconfig.server.json tsconfig.server.json
COPY ./webpack.config.js webpack.config.js
COPY ./.babelrc .babelrc
COPY ./src src

RUN npm i; \
    npm run build-server; \
    npm run build-client;


#
# Construct a PRODUCTION ready image
#
# Uses code that was build in the previous step
# to construct a production ready image.
# NPM only installs non-dev dependencies
#
#
FROM node:22-bookworm AS app

WORKDIR /app

COPY ./package.json package.json
COPY ./package-lock.json package-lock.json

RUN npm install --omit=dev;

COPY bin bin
COPY --from=build /app/client client
COPY --from=build /app/server server

CMD [ "./bin/prod.sh" ]
