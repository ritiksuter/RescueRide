FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY ../api-gateway/package*.json ./api-gateway/

WORKDIR /app/api-gateway

RUN npm install --production

# Copy source
COPY ../api-gateway .

EXPOSE 8000

CMD ["npm", "start"]
