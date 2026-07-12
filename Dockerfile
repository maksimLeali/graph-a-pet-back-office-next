# syntax=docker/dockerfile:1
# Next.js 16 richiede Node >= 20; usiamo 22 LTS.

# ---- deps: installa node_modules una sola volta, cache-friendly ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ---- builder: compila l'app ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Le variabili NEXT_PUBLIC_* vengono inlined nel bundle client al momento
# della build: vanno passate come build args, non come env a runtime.
ARG NEXT_PUBLIC_GRAPHQL_URL
ARG NEXT_PUBLIC_BASE_FETCH_URL
ENV NEXT_PUBLIC_GRAPHQL_URL=$NEXT_PUBLIC_GRAPHQL_URL
ENV NEXT_PUBLIC_BASE_FETCH_URL=$NEXT_PUBLIC_BASE_FETCH_URL
ENV NEXT_TELEMETRY_DISABLED=1

# fetch:graphql e generate NON girano qui: i file generati sono committati
# nel repo e rover richiederebbe il backend raggiungibile in build.
RUN yarn build

# ---- runner: immagine finale minimale con output standalone ----
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3101
ENV HOSTNAME=0.0.0.0

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3101

CMD ["node", "server.js"]
