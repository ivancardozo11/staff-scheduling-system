FROM node
# Install build dependencies
RUN apt-get update && apt-get install -y build-essential python
# Copy the package.json and package-lock.json files
COPY package*.json ./

RUN npm install
# Copy the rest of the app's source code
COPY . .

# Expose the ports the app and the database will run on
EXPOSE 8080

# Run the app
CMD ["npm", "run", "start:dev"]
