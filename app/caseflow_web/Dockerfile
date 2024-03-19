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
RUN mkdir -p /var/cache/nginx/client_temp \
             /var/cache/nginx/proxy_temp \
             /var/cache/nginx/fastcgi_temp \
             /var/cache/nginx/uwsgi_temp \
             /var/cache/nginx/scgi_temp \
             /var/run/nginx && \
    chown -R nginx:nginx /var/cache/nginx \
                         /var/run/nginx

RUN mkdir /app

COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Ensure Nginx can write to access and error logs
RUN touch /var/log/nginx/access.log \
          /var/log/nginx/error.log && \
    chown nginx:nginx /var/log/nginx/access.log \
                      /var/log/nginx/error.log

CMD ["nginx", "-g", "daemon off;"]
