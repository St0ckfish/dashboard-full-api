FROM nginx:stable-alpine

# Install bash
RUN apk add --no-cache bash

# Set the working directory to /app
WORKDIR /app

# Copy the local 'dist/' directory to '/app/build' inside the container
COPY dist/ build/

# Copy the nginx configuration file into the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the contents of '/app/build/' to the directory where Nginx serves files from
COPY build/ /usr/share/nginx/html

# Inform Docker that the container listens on port 80 at runtime
EXPOSE 80

# Specify the command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]