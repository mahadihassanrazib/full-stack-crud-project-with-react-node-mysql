# Stage 1: Development (Optional)
FROM node:18-alpine3.20 as dev
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Define build-time argument for environment variable
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Copy all other application files
COPY . .

# Expose the port where your app will run (default: 5000)
EXPOSE 5000

# Run the app with "host" set to 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]