# build stage
FROM oven/bun AS build-stage
WORKDIR /app
COPY package*.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
ARG VITE_API_BASE
ENV VITE_API_BASE=${VITE_API_BASE}
RUN bun run build

# production stage
FROM oven/bun:alpine AS production-stage
WORKDIR /app

# Copy built frontend and API server
COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/server ./server
COPY --from=build-stage /app/node_modules ./node_modules

EXPOSE 3001

CMD ["bun", "run", "server/index.ts"]