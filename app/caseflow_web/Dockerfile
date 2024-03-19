# base image
FROM node:14.17.0-alpine as build-stage

# set working directory
WORKDIR /case-flow-web/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /case-flow-web/app/node_modules/.bin:$PATH

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# install and cache app dependencies

COPY package-lock.json /case-flow-web/app/package-lock.json
COPY package.json /case-flow-web/app/package.json

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# create and set user permissions to app folder
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# add app files
COPY . /case-flow-web/app/

RUN npm run build

# Use nginx as the base image
FROM nginx:1.17 as production-stage

# Create a directory for your application
RUN mkdir /app

# Add 'nginx' user to the 'root' group
ARG user=nginx
RUN usermod -a -G root $user

# Copy the built files from the build stage to the nginx HTML directory
COPY --from=build-stage /case-flow-web/app/build /usr/share/nginx/html

# Copy your nginx.conf file from the host to the nginx configuration directory in the Docker image
COPY ./nginx.conf /etc/nginx/nginx.conf

# Set proper permissions and ownership for nginx directories
RUN chown -R $user:root /etc/nginx/ \
    && chmod -R ug+rw /etc/nginx/ \
    && chown -R $user:root /var/cache/nginx \
    && chmod -R ug+rw /var/cache/nginx \
    && chmod g+rw /etc/passwd

# Switch to the 'nginx' user for running the container
USER $user

# Start nginx with the appropriate command
CMD ["nginx", "-g", "daemon off;"]
