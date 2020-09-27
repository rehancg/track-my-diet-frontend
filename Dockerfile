FROM node:10-alpine

RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 5000

CMD ["npm", "run","start"]