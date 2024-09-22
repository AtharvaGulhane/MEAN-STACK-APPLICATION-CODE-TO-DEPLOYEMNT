# Stage 1: Build the app
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist/backend /app
EXPOSE 3000
CMD ["node", "server.js"]  # Adjust this according to your entry point
