FROM node:7

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD npm start frontend
EXPOSE 3000

