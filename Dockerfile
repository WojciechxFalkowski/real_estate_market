# syntax = docker/dockerfile:1

ARG NODE_VERSION=18.14.2

FROM node:${NODE_VERSION}-alpine as base

ARG PORT

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base as build

# Install build dependencies
COPY --link package.json package-lock.json ./
RUN npm install

# Copy all files and build the project
COPY --link . .

# Increase Node.js memory limit for the build step
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build

# Prune dev dependencies to save space
RUN npm prune --production

# Run
FROM node:${NODE_VERSION}-alpine as runtime

ENV NODE_ENV=production
ENV PORT=$PORT

WORKDIR /src

# Copy the built output and necessary dependencies
COPY --from=build /src/.output /src/.output
COPY --from=build /src/node_modules /src/node_modules
COPY --from=build /src/package.json /src/package.json

EXPOSE $PORT

# Use CMD to run the application
CMD [ "node", ".output/server/index.mjs" ]
