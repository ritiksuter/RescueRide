FROM node:18-alpine

WORKDIR /app

COPY ../notification-service/package*.json ./notification-service/

WORKDIR /app/notification-service

RUN npm install --production

COPY ../notification-service .

EXPOSE 9007

CMD ["npm", "start"]
