# Stage 1: Build the Node.js app
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  # Assuming you have a build step, adjust if necessary

# Stage 2: Serve the app
FROM node:14
WORKDIR /app
COPY --from=build /app ./
EXPOSE 4800
CMD ["node", "server.js"]  # Adjust this according to your entry point
