# ─────────────────────────────────────────────
# Stage 1: Build
# ─────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency manifests first for layer caching
COPY package.json pnpm-lock.yaml ./
COPY patches/ ./patches/

RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build the static site
RUN pnpm run build

# ─────────────────────────────────────────────
# Stage 2: Serve with nginx
# ─────────────────────────────────────────────
FROM nginx:alpine AS runner

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist/public /usr/share/nginx/html

# nginx config — SPA fallback so client-side routing works
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
