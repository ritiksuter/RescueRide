FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p uploads

EXPOSE 8010

ENV NODE_ENV=production

CMD ["npm", "start"]