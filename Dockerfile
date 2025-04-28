name: Build and Deploy to Google Compute Engine

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      # Step 1: Checkout source
      - name: Checkout repository
        uses: actions/checkout@v3

      # Step 2: Authenticate with Google Cloud
      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v2
        with:
          credentials_json: '${{ secrets.GCP_SA_KEY }}'

      # Step 3: Configure Docker to push to GCR
      - name: Configure Docker for GCR
        run: gcloud auth configure-docker --quiet

      # Step 4: Build Docker image
      - name: Build Docker image
        run: |
          docker build -t gcr.io/melodic-bazaar-455504-q5/jewelry-ecommerce:latest .

      # Step 5: Push Docker image to GCR
      - name: Push Docker image to GCR
        run: |
          docker push gcr.io/melodic-bazaar-455504-q5/jewelry-ecommerce:latest

      # Step 6: SSH and deploy on GCP VM
      - name: SSH and Deploy to Compute Engine
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VM_IP }}
          username: ${{ secrets.VM_SSH_USER }}
          key: ${{ secrets.VM_SSH_KEY }}
          script: |
            docker pull gcr.io/melodic-bazaar-455504-q5/jewelry-ecommerce:latest
            docker stop jewelry-ecommerce || true
            docker rm jewelry-ecommerce || true
            docker run -d --name jewelry-ecommerce -p 8080:8080 \
              -e NEXT_PUBLIC_URL="${{ secrets.NEXT_PUBLIC_URL }}" \
              -e NEXTAUTH_URL="${{ secrets.NEXTAUTH_URL }}" \
              -e NEXTAUTH_SECRET="${{ secrets.NEXTAUTH_SECRET }}" \
              -e MONGODB_URI="${{ secrets.MONGODB_URI }}" \
              -e STRIPE_SECRET_KEY="${{ secrets.STRIPE_SECRET_KEY }}" \
              -e NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="${{ secrets.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY }}" \
              -e GOOGLE_CLIENT_ID="${{ secrets.GOOGLE_CLIENT_ID }}" \
              -e GOOGLE_CLIENT_SECRET="${{ secrets.GOOGLE_CLIENT_SECRET }}" \
              -e GITHUB_CLIENT_ID="${{ secrets.GITHUB_CLIENT_ID }}" \
              -e GITHUB_CLIENT_SECRET="${{ secrets.GITHUB_CLIENT_SECRET }}" \
              -e EBAY_CLIENT_ID="${{ secrets.EBAY_CLIENT_ID }}" \
              -e EBAY_CLIENT_SECRET="${{ secrets.EBAY_CLIENT_SECRET }}" \
              -e OPENAI_API_KEY="${{ secrets.OPENAI_API_KEY }}" \
              gcr.io/melodic-bazaar-455504-q5/jewelry-ecommerce:latest
