FROM node:lts-slim

RUN mkdir -p /usr/src/appFrontend

WORKDIR /usr/src/appFrontend

COPY package.json /usr/src/appFrontend
COPY package-lock.json /usr/src/appFrontend
RUN npm install 

COPY . /usr/src/appFrontend

EXPOSE 3000

CMD [ "npm", "start" ]