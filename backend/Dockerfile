# Use Node.js base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy only package files to install dependencies
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy all backend code
COPY . .

# Expose backend port
EXPOSE 5000

# Use nodemon for hot reloading
CMD ["npm", "run", "dev"]
