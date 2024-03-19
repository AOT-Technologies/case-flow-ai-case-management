# Build stage
FROM node:14-alpine as build-stage

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

RUN npm run build

# Production stage
FROM nginx:1.17-alpine as production-stage

# Create necessary directories with appropriate permissions
RUN mkdir -p /var/cache/nginx/client_temp && \
    chown -R nginx:nginx /var/cache/nginx

RUN mkdir /app

COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
