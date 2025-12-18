FROM node:18-alpine

WORKDIR /app

COPY ../auth-service/package*.json ./auth-service/

WORKDIR /app/auth-service

RUN npm install --production

COPY ../auth-service .

EXPOSE 8001

CMD ["npm", "start"]
