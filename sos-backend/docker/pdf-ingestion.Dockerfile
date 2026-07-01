FROM node:20-alpine

WORKDIR /app

COPY ../pdf-ingestion-service/package*.json ./pdf-ingestion-service/

WORKDIR /app/pdf-ingestion-service

RUN npm install --production

COPY ../pdf-ingestion-service .

EXPOSE 8011

CMD ["npm", "start"]