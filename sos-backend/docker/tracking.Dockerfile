FROM node:18-alpine

WORKDIR /app

COPY ../tracking-service/package*.json ./tracking-service/

WORKDIR /app/tracking-service

RUN npm install --production

COPY ../tracking-service .

EXPOSE 8005

CMD ["npm", "start"]
