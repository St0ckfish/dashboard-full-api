FROM nginx

# RUN apk add --no-cache bash

COPY dist/* /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]