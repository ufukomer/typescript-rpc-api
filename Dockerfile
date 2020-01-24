FROM node:latest
WORKDIR /usr/noxart/
COPY package.json .
RUN npm install
COPY . .
