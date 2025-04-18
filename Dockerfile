# ---- Stage 1: Build ----
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies (ci = clean install)
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline

# Copy the rest of the code
COPY . .

# Accept build-time environment variables
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG STRIPE_SECRET_KEY
ARG NEXT_PUBLIC_URL
ARG NEXTAUTH_URL
ARG MONGODB_URI
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET
ARG EBAY_CLIENT_ID
ARG EBAY_CLIENT_SECRET

# Expose them to Next.js during build time
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV MONGODB_URI=$MONGODB_URI
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID
ENV GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET
ENV EBAY_CLIENT_ID=$EBAY_CLIENT_ID
ENV EBAY_CLIENT_SECRET=$EBAY_CLIENT_SECRET


# Build the Next.js app
RUN npm run build

# ---- Stage 2: Production Runner ----
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose environment variables at runtime again
ENV NODE_ENV=production

# Expose port
EXPOSE 8080

# Healthcheck (optional but good for GCP)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --spider -q http://localhost:8080 || exit 1

# Start the app
CMD ["npm", "start"]
