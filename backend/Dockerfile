FROM node:7

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD node src

EXPOSE 8081