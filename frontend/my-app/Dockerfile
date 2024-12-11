# Use Node.js base image
FROM node:16-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy all frontend code into the container
COPY . .

# Expose port 3000 (React development server)
EXPOSE 3000

# Start React development server
CMD ["npm", "start"]
