FROM node:16.2.0-alpine as builder
# ENV NODE_ENV development
# Add a work directory
WORKDIR /sso-frontend
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
# Copy app files
COPY . .
# RUN npm run build