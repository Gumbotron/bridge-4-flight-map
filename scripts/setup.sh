#!/bin/bash
# Quick setup script for Bridge 4 Flight Map
# Simplified version of copilot-setup.sh for fast setup

set -e

echo "⚡ Bridge 4 Quick Setup"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install

# Setup .env if needed
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ Created .env file"
    else
        echo "⚠️  No .env.example found, skipping .env creation"
    fi
else
    echo "✅ .env file already exists"
fi

echo ""
echo "✅ Setup complete! Run 'npm run dev' to start."
