#!/bin/bash
# GitHub Copilot Setup Script for Bridge 4 Flight Map
# This script sets up the development environment for the project

set -e  # Exit on error

echo "🌩️  Bridge 4 Flight Map - Development Setup"
echo "==========================================="
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Warning: Node.js 18+ is recommended. Current version: $(node -v)"
else
    echo "✅ Node.js version: $(node -v)"
fi

# Check npm
echo ""
echo "📦 Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi
echo "✅ npm version: $(npm -v)"

# Install dependencies
echo ""
echo "📥 Installing dependencies..."
npm install

# Setup environment file
echo ""
echo "🔧 Setting up environment configuration..."
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ Created .env file from .env.example"
        echo "   Please review and update .env with your configuration"
    else
        echo "⚠️  No .env.example found"
    fi
else
    echo "✅ .env file already exists"
fi

# Check for required directories
echo ""
echo "📁 Checking project structure..."
REQUIRED_DIRS=("src/components" "src/hooks" "src/utils" "src/styles" "public")
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir exists"
    else
        echo "⚠️  $dir not found"
    fi
done

# Run linter check
echo ""
echo "🔍 Running linter check..."
if npx eslint . --ext js,jsx 2>/dev/null; then
    echo "✅ Linter check passed (no errors)"
else
    EXIT_CODE=$?
    if [ $EXIT_CODE -eq 1 ]; then
        echo "⚠️  Linter found warnings or errors. Run 'npm run lint' for details."
    else
        echo "❌ Linter configuration issue. Check .eslintrc.cjs"
        exit 1
    fi
fi

# Test build
echo ""
echo "🏗️  Testing production build..."
if npm run build; then
    echo "✅ Build successful"
    # Clean up build artifacts
    rm -rf dist
    echo "   (Cleaned up test build)"
else
    echo "❌ Build failed"
    exit 1
fi

# Summary
echo ""
echo "==========================================="
echo "✨ Setup Complete!"
echo ""
echo "🚀 Available commands:"
echo "   npm run dev      - Start development server"
echo "   npm run build    - Build for production"
echo "   npm run preview  - Preview production build"
echo "   npm run lint     - Run ESLint"
echo ""
echo "📚 Documentation:"
echo "   README.md           - Project overview"
echo "   ARCHITECTURE.md     - Architecture details"
echo "   DATA_SOURCES.md     - Data integration info"
echo "   DEPLOYMENT.md       - Deployment guide"
echo "   CONTRIBUTING.md     - Contributing guidelines"
echo ""
echo "🌩️  Life before death. Strength before weakness. Journey before destination."
echo "==========================================="
