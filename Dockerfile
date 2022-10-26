FROM node:18-alpine
 RUN apk add --no-cache python2 g++ make
 WORKDIR /
 COPY . .
 RUN npm install --production
 CMD ["node", "app.js"]