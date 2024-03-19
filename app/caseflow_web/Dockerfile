# base image
FROM node:14.17.0-alpine as build-stage

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# install and cache app dependencies
COPY ./package*.json ./
RUN npm ci
COPY . ./

RUN npm run build

FROM artifacts.developer.gov.bc.ca/redhat-access-docker-remote/ubi8/nginx-122 AS deployer

USER default

# Copy the app built on build-stage to the resulting container.
COPY --from=build-stage /opt/app-root/src/dist .

# Copy the default.conf to /etc/nginx/conf.d
COPY --from=builder /opt/app-root/src/default.conf /etc/nginx/conf.d

COPY ./nginx.conf /etc/nginx/nginx.conf
# Start nginx with the appropriate command
CMD ["nginx", "-g", "daemon off;"]