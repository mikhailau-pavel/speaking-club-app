FROM node:16-alpine

WORKDIR /

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 8080

CMD [ "node", "app.js" ]