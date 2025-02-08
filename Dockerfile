# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
# Use a Node.js image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package.json
COPY tsconfig.json tsconfig.json

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY src src

# Build the project
RUN npm run build

# Use a minimal Node.js runtime for the release image
FROM node:18-alpine AS release

# Set working directory
WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/build build
COPY package.json package.json

# Install only production dependencies
RUN npm install --production

# Set the command to run the application
ENTRYPOINT ["node", "build/index.js"]
