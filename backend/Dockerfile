# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app
FROM nginx:alpine
WORKDIR /app
COPY --from=build /app/dist/backend /usr/share/nginx/html
EXPOSE 4800
CMD ["node", "server.js"] 