# Stage 1: Build the Express.js backend
FROM node:18-alpine AS backend
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the backend port
EXPOSE 4800

# Start the Express server
CMD ["npm", "start"]

# Stage 2: Use Nginx as a reverse proxy for the backend
#FROM nginx:alpine

# Copy custom nginx.conf
#COPY nginx.conf /etc/nginx/nginx.conf

# Expose the proxy port (usually 80)
#EXPOSE 80

# Run Nginx in the foreground
#CMD ["nginx", "-g", "daemon off;"]