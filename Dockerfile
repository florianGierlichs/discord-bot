FROM node:16.13-alpine3.14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD node utils/deploy-commands.js && node index.js