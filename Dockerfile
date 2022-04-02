FROM node:16.14-alpine

WORKDIR /app

EXPOSE 3000 8080

COPY package.json yarn.lock ./

RUN yarn

COPY . ./

CMD ["yarn", "start-all"]