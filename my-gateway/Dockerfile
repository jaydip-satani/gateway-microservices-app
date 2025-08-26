# Use Node.js official image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the gateway files
COPY . .

# Expose gateway port
EXPOSE 3000

# Command to start the gateway
CMD ["npm", "run", "start"]
