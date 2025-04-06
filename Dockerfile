# Use official Node.js image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json before installing dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Ensure tailwind dependencies are installed
RUN npm install tailwindcss postcss autoprefixer

# Build the Next.js app
RUN npm run build

# Expose the port used by Next.js
EXPOSE 8080

# Start the app
CMD ["npm", "run", "start"]
