# Build stage
FROM node:14-alpine as build-stage

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./

# Run npm install and other build steps as root
USER root

RUN npm install --silent

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

RUN npm run build

# Production stage
FROM nginx:1.17-alpine as production-stage

# Set the user to root explicitly
USER root

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy build files from the build stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
