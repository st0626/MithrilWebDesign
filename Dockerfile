FROM node:alpine
 RUN apk add --no-cache python3 g++ make
 COPY . .
 RUN npm install --production
 CMD ["node", "app.js"]