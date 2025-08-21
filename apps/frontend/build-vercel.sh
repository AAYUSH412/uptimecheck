#!/bin/bash

# Vercel Build Script for Frontend
# This script ensures a clean build for Vercel deployment

echo "🚀 Starting Vercel build for UptimeCheck Frontend"

# Clean any existing node_modules and build artifacts
echo "🧹 Cleaning existing build artifacts..."
rm -rf node_modules .next

# Install dependencies with retry logic for network issues
echo "📦 Installing dependencies..."
for i in {1..3}; do
  echo "Attempt $i of 3..."
  if bun install --frozen-lockfile --verbose; then
    echo "✅ Dependencies installed successfully"
    break
  else
    echo "❌ Install failed, retrying in 10 seconds..."
    sleep 10
  fi
  
  if [ $i -eq 3 ]; then
    echo "🔄 Final attempt with npm fallback..."
    npm ci
  fi
done

# Build the application
echo "🔨 Building Next.js application..."
bun run build

echo "✅ Build completed successfully!"
