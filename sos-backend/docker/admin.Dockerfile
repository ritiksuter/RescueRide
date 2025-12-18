FROM node:18-alpine

WORKDIR /app

COPY ../admin-service/package*.json ./admin-service/

WORKDIR /app/admin-service

RUN npm install --production

COPY ../admin-service .

EXPOSE 8006

CMD ["npm", "start"]
