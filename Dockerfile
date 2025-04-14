# Use official Node.js image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app
COPY . .

# Accept build-time environment variables
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG STRIPE_SECRET_KEY
ARG NEXT_PUBLIC_URL
ARG NEXTAUTH_URL
ARG MONGODB_URI

# Expose them to Next.js at runtime
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV MONGODB_URI=$MONGODB_URI

# Build the Next.js app
RUN npm run build

# Use minimal production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port
EXPOSE 8080

# Optional healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --spider -q http://localhost:8080 || exit 1

# Start the app
CMD ["npm", "start"]

