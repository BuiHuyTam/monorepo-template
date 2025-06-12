#!/bin/bash

# Navigate to the frontend directory
cd "$(dirname "$0")"

# Create a temporary build context directory
mkdir -p build_context

# Copy just the frontend files to the build context
cp -r * build_context/

# Create a simplified package.json without workspace references for the build
cat > build_context/package.json << EOF
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "15.3.2"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4"
  }
}
EOF

# Copy the Dockerfile but rename it
cp Dockerfile build_context/Dockerfile

# Build the Docker image using the isolated context
docker build -t frontend-app build_context

# Clean up
rm -rf build_context

echo "Build complete. You can now run: docker run -p 3000:3000 frontend-app" 