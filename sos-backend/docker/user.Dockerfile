FROM node:18-alpine

WORKDIR /app

COPY ../user-service/package*.json ./user-service/

WORKDIR /app/user-service

RUN npm install --production

COPY ../user-service .

EXPOSE 8002

CMD ["npm", "start"]
