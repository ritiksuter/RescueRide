FROM node:20-alpine

WORKDIR /app

COPY ../ai-chat-service/package*.json ./ai-chat-service/

WORKDIR /app/ai-chat-service

RUN npm install --production

COPY ../ai-chat-service .

EXPOSE 8010

CMD ["npm", "start"]