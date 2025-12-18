FROM node:18-alpine

WORKDIR /app

COPY ../mechanic-service/package*.json ./mechanic-service/

WORKDIR /app/mechanic-service

RUN npm install --production

COPY ../mechanic-service .

EXPOSE 8003

CMD ["npm", "start"]
