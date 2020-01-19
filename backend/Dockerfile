FROM node:lts-slim

RUN mkdir -p /usr/src/appBackend

WORKDIR /usr/src/appBackend

COPY package.json /usr/src/appBackend
COPY package-lock.json /usr/src/appBackend
RUN npm install 

COPY . /usr/src/appBackend

EXPOSE 8081

CMD node src/index.js