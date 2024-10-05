# Stage 1: Use Node.js to run the Express.js backend
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose the backend port (change if necessary)
EXPOSE 4800

# Start the Express server
CMD ["npm", "start"]