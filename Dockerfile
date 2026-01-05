# for building 
FROM node:20-alpine AS build
WORKDIR /app


COPY package.json package-lock.json ./
RUN npm ci



COPY . .

RUN npx prisma generate
RUN npm run build


# for ready to production

FROM node:20-alpine AS run
WORKDIR  /app

COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

CMD ["npm","run","start"]




