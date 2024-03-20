# Use a smaller base image for the build stage
FROM node:latest AS build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --silent

# Add app files
COPY . .

# Build the app
RUN npm run build

# Use a smaller base image for the production stage
FROM nginx:1.21 AS production-stage

# Copy built files from the build stage to Nginx's HTML directory
COPY --from=build-stage /app/build /usr/share/nginx/html

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]