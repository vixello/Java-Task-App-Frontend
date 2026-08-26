# Build stage
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build Angular SSR WITHOUT prerender
RUN npm run build -- --no-prerender

# Run stage
FROM node:22-alpine
WORKDIR /app

COPY --from=build /app/dist/task-frontend/browser ./browser
COPY --from=build /app/dist/task-frontend/server ./server

COPY package*.json ./
RUN npm install --omit=dev

EXPOSE 4200

CMD ["node", "server/server.mjs"]
