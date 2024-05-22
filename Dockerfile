# syntax = docker/dockerfile:1

ARG NODE_VERSION=18.14.2

FROM node:${NODE_VERSION} as base

ARG PORT

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base as build

COPY --link package.json package-lock.json ./
RUN npm install --production=true

COPY --link . .

RUN npm run build
RUN npm prune

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

# CMD [ "node", "--require", "reflect-metadata", ".output/server/index.mjs" ]
CMD [ "node", ".output/server/index.mjs" ]