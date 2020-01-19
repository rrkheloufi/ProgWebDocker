FROM node:lts-slim

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD npm start
EXPOSE 3000

