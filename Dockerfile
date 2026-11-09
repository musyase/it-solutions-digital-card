FROM node:24-bookworm-slim

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig*.json prisma.config.ts ./
COPY prisma ./prisma
COPY src ./src
COPY scripts ./scripts

# Generation reads Prisma config at build time, but does not connect to the database.
ENV DATABASE_URL=postgresql://profile:profile@postgres:5432/profile?schema=public
RUN npm run db:generate && npm run build

EXPOSE 3000
CMD ["sh", "-c", "npm run db:deploy && npm run db:seed && npm run start"]
