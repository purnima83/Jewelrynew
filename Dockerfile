# ---- Stage 1: Build ----
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only package.json first
COPY package.json ./

# Install dependencies
RUN npm install --prefer-offline

# Copy the rest of the application
COPY . .

# Manually set environment variables required at build time
ARG NEXT_PUBLIC_URL
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG MONGODB_URI
ARG STRIPE_SECRET_KEY
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET
ARG EBAY_CLIENT_ID
ARG EBAY_CLIENT_SECRET
ARG OPENAI_API_KEY

# Make them available inside build
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV MONGODB_URI=$MONGODB_URI
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID
ENV GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET
ENV EBAY_CLIENT_ID=$EBAY_CLIENT_ID
ENV EBAY_CLIENT_SECRET=$EBAY_CLIENT_SECRET
ENV OPENAI_API_KEY=$OPENAI_API_KEY

# Build the app
RUN npm run build

# ---- Stage 2: Run ----
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary build outputs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the production port
EXPOSE 8080

# ✅ Start the app on correct port
CMD ["npm", "run", "start", "--", "-p", "8080"]
