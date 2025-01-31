# Step 1: Use the official Node.js 16 image as the base image
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Step 4: Install only production dependencies
RUN npm install --production

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Expose the port the application will run on
EXPOSE 5000

# Step 7: Define the command to run the application
CMD ["node", "server.js"]
