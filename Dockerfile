# Stage 1: Install dependencies only
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build
FROM node:22-alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Fail the build fast if DATABASE_URL is not provided
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN if [ -z "$DATABASE_URL" ]; then \
    echo "ERROR: Missing required environment variable: DATABASE_URL" && exit 1; \
  fi

RUN npx prisma generate

RUN npm run build

# Stage 3: Production image
FROM node:22-alpine AS run
WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "run", "start"]
