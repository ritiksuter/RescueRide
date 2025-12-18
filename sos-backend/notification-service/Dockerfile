FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV NODE_ENV=production

EXPOSE 9007

CMD ["node", "src/app.js"]
