# Stage 1: Build Angular 19 App
FROM node:20-alpine AS builder
# Install Angular CLI globally
RUN npm install -g @angular/cli@20.2.0
WORKDIR /app
# Copy package files to install dependencies
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application files
COPY . .
# Build the Angular app for production
RUN ng build --configuration=production

# Stage 3: Combine Angular and Node.js with NGINX
FROM node:20-alpine
WORKDIR /usr/src/app
# Copy the Angular build from the builder stage to NGINX
COPY --from=builder /app/dist/browser ./
COPY server.js .
COPY package.json .
RUN npm install --production
EXPOSE 4200
CMD [ "node", "server.js" ]