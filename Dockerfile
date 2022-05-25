FROM node:17-alpine as development
ENV NODE_ENV development
# Add a work directory
WORKDIR /sso-frontend
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
# Copy app files
COPY . .
# RUN npm run build
EXPOSE 3000