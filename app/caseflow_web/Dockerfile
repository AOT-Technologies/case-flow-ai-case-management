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
COPY . ./case-flow-web

RUN npm run build

FROM nginx:1.17 as production-stage
RUN mkdir /app
COPY --from=build-stage /case-flow-web/app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
