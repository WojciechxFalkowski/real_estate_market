# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.13.1-alpine3.20

FROM node:${NODE_VERSION} as base

ARG PORT

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base as build

COPY --link package.json package-lock.json ./
RUN npm install --production=false

COPY --link . .

# Increase Node.js memory limit
ENV NODE_OPTIONS="--max-old-space-size=4096"

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