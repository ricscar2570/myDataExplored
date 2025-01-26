# Step 1: Use the official Node.js image as the base image for building the app
FROM node:16 AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application files to the container
COPY . .

# Step 6: Build the React application for production
RUN npm run build

# Step 7: Use the official Nginx image to serve the static files
FROM nginx:alpine

# Step 8: Copy the built files from the builder stage to the Nginx default HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Step 9: Expose port 80 for the Nginx server
EXPOSE 80

# Step 10: Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
