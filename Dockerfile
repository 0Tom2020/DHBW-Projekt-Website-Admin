FROM nginx:1.21.1
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist/adminlte /usr/share/nginx/html
