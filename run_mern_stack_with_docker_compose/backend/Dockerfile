# Stage 1: Build the Node.js backend app
FROM node:18-alpine3.20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port where your app will run (default: 3000)
EXPOSE 3000

# Define the build-time arguments with default values
ARG PORT=3000
ARG DB_HOST
ARG DB_USER
ARG DB_PASSWORD
ARG DB_DATABASE
ARG DB_TABLENAME="users"
ARG DB_WAITFORCONNECTIONS=true
ARG DB_CONNECTIONLIMIT=10
ARG DB_QUEUELIMIT=0

# Pass ARG values to ENV so they are accessible during runtime
ENV PORT=$PORT
ENV DB_HOST=$DB_HOST
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_DATABASE=$DB_DATABASE
ENV DB_TABLENAME=$DB_TABLENAME
ENV DB_WAITFORCONNECTIONS=$DB_WAITFORCONNECTIONS
ENV DB_CONNECTIONLIMIT=$DB_CONNECTIONLIMIT
ENV DB_QUEUELIMIT=$DB_QUEUELIMIT

# Command to start the Node.js server
CMD ["npm", "start"]