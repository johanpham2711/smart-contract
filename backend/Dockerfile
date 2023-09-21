FROM node:14-alpine as builder

WORKDIR /app

COPY package.json package-lock.json yarn.lock ./

RUN yarn install

ENV PATH=/app/node_modules/.bin:$PATH

WORKDIR /app/source

CMD ["yarn", "start:prod"]

