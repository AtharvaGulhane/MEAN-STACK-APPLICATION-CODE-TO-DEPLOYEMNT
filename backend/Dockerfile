# Stage 1: Use Node.js to run the Express.js backend
FROM node:18-alpine AS backend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4800
CMD ["npm", "start"]

# Stage 2: Use Nginx as a reverse proxy
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80