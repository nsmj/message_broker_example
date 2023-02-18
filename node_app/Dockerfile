FROM node:18.14-alpine

RUN apk add git

WORKDIR /app

COPY package.json . 

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 8080

#CMD ["node", "server.js"]