# Build stage
FROM oven/bun:1-alpine AS build
WORKDIR /app

COPY package.json svelte.config.js ./
RUN bun i --frozen-lockfile 

COPY . .
RUN bun run build

# Prod 
FROM oven/bun:1-alpine AS runtime
WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./

EXPOSE 3000

CMD ["bun", "build/index.js"]