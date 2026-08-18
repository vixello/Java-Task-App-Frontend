# BUILD STAGE
FROM node:20 AS build
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build

# SERVE STAGE
FROM nginx:alpine
COPY --from=build /app/dist/task-frontend /usr/share/nginx/html
EXPOSE 80