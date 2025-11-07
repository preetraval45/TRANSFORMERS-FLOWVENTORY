FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start the application in development mode, binding to 0.0.0.0
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
