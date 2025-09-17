FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache protobuf && npm ci
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]
