FROM node:18-alpine

WORKDIR /app

COPY ../sos-service/package*.json ./sos-service/

WORKDIR /app/sos-service

RUN npm install --production

COPY ../sos-service .

EXPOSE 8004

CMD ["npm", "start"]
