# Reusable Copilot Configuration Guide

This document provides guidance on adapting the Copilot configuration files from Bridge 4 Flight Map to other projects.

## 📋 Configuration Files Overview

### Essential Files ⭐⭐⭐

These files are critical for effective Copilot integration and should be adapted for every project:

1. **`.github/copilot-instructions.md`** - Primary instructions for Copilot
   - Describes project structure, tech stack, and conventions
   - Provides coding guidelines and best practices
   - Includes common tasks and patterns
   - **Adaptation needed**: Update for your project's stack and conventions

2. **`.github/copilot-setup.sh`** - Environment setup script
   - Automates development environment setup
   - Validates dependencies and project structure
   - Runs initial tests and builds
   - **Adaptation needed**: Update for your build tools and dependencies

3. **`.github/ISSUE_TEMPLATE/feature_request.md`** - Feature request template
   - Structured template for proposing new features
   - Includes acceptance criteria and impact assessment
   - **Minimal adaptation needed**: Update labels and project-specific fields

4. **`.github/PULL_REQUEST_TEMPLATE.md`** - Pull request template
   - Comprehensive PR checklist
   - Testing and documentation requirements
   - Code review guidelines
   - **Adaptation needed**: Update for your testing and deployment process

5. **`CONTRIBUTING.md`** - Contributing guidelines
   - Development workflow documentation
   - Coding standards and conventions
   - Git commit guidelines
   - **Adaptation needed**: Update for your project's workflow and standards

### Recommended Files ⭐⭐

These files enhance the development experience:

6. **`.github/COPILOT_WORKFLOW.md`** - Copilot usage guide
   - How to use Copilot effectively with the project
   - Project-specific patterns and examples
   - Troubleshooting tips
   - **Minimal adaptation needed**: Add project-specific examples

7. **`.github/ISSUE_TEMPLATE/bug_report.md`** - Bug report template
   - Structured bug reporting with environment details
   - Reproduction steps and expected behavior
   - **Minimal adaptation needed**: Update environment-specific fields

8. **`.github/ISSUE_TEMPLATE/documentation.md`** - Documentation issue template
   - Request documentation improvements
   - Track documentation tasks
   - **Minimal adaptation needed**: Update documentation locations

9. **`.github/CODEOWNERS`** - Code ownership configuration
   - Defines code owners for automatic review requests
   - Organizes ownership by directory and file type
   - **Full adaptation needed**: Set owners based on your team

10. **`.devcontainer/devcontainer.json`** - Dev container configuration
    - VS Code dev container setup
    - Extensions and settings pre-configured
    - **Adaptation needed**: Update for your project's tools and extensions

11. **`scripts/setup.sh`** - Quick setup helper script
    - Fast setup for quick starts
    - Minimal validation
    - **Adaptation needed**: Update for your dependencies

## 🔧 Adaptation Guide by Stack

### React + Vite Projects (Current Stack)

The existing configuration is designed for React + Vite. Use as-is or with minimal changes:

```bash
# Copy all files directly
cp -r source/.github/ target/.github/
cp source/CONTRIBUTING.md target/
cp -r source/.devcontainer/ target/.devcontainer/
cp -r source/scripts/ target/scripts/
```

Update project-specific values:
- Repository name and URLs
- Team members in CODEOWNERS
- Project-specific color schemes or design systems

### Node.js / Express Backend

**Key changes to `.github/copilot-instructions.md`:**

```markdown
## Technology Stack
- **Runtime**: Node.js 18+ with Express 4.x
- **Database**: MongoDB/PostgreSQL/etc.
- **API**: RESTful API / GraphQL
- **Testing**: Jest/Mocha
- **Package Manager**: npm/yarn/pnpm

## Project Structure
```
src/
├── routes/       # Express route handlers
├── controllers/  # Business logic
├── models/       # Database models
├── middleware/   # Custom middleware
├── utils/        # Helper functions
└── config/       # Configuration files
```

## Common Tasks
### Adding a New API Endpoint
1. Create route handler in `src/routes/`
2. Implement controller logic
3. Add input validation
4. Write tests
5. Update API documentation
```

**Update `copilot-setup.sh`:**
```bash
# Test API
echo "🧪 Running tests..."
npm test

# Check for security vulnerabilities
npm audit
```

**Update `.devcontainer/devcontainer.json`:**
```json
{
  "image": "mcr.microsoft.com/devcontainers/javascript-node:18",
  "features": {
    "ghcr.io/devcontainers/features/node:1": {},
    "ghcr.io/devcontainers-contrib/features/mongodb:1": {}
  },
  "forwardPorts": [3000, 27017]
}
```

### Python / Django Projects

**Key changes to `.github/copilot-instructions.md`:**

```markdown
## Technology Stack
- **Language**: Python 3.11+
- **Framework**: Django 4.x
- **Database**: PostgreSQL
- **Testing**: pytest
- **Package Manager**: pip + requirements.txt

## Project Structure
```
src/
├── apps/           # Django apps
├── templates/      # HTML templates
├── static/         # Static files
├── tests/          # Test files
└── manage.py       # Django management
```

## Code Style & Conventions
- Follow PEP 8
- Use type hints
- Docstrings for all public functions
- Class-based views preferred

## Common Tasks
### Adding a New Django App
1. Run `python manage.py startapp appname`
2. Add to INSTALLED_APPS
3. Create models
4. Create migrations
5. Write tests
```

**Update `copilot-setup.sh`:**
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Run tests
pytest
```

**Update `.devcontainer/devcontainer.json`:**
```json
{
  "image": "mcr.microsoft.com/devcontainers/python:3.11",
  "features": {
    "ghcr.io/devcontainers/features/python:1": {},
    "ghcr.io/devcontainers-contrib/features/postgres:1": {}
  },
  "postCreateCommand": "pip install -r requirements.txt"
}
```

### Go Projects

**Key changes to `.github/copilot-instructions.md`:**

```markdown
## Technology Stack
- **Language**: Go 1.21+
- **Framework**: net/http, Gin, or Echo
- **Database**: PostgreSQL with pgx
- **Testing**: Go testing package
- **Package Manager**: Go modules

## Project Structure
```
.
├── cmd/          # Application entrypoints
├── internal/     # Private application code
├── pkg/          # Public libraries
├── api/          # API definitions
└── configs/      # Configuration files
```

## Code Style & Conventions
- Follow Go standards (gofmt, golint)
- Use context for cancellation
- Error handling with explicit returns
- Table-driven tests

## Common Tasks
### Adding a New Handler
1. Define handler in appropriate package
2. Add route to router
3. Write table-driven tests
4. Update API documentation
```

**Update `copilot-setup.sh`:**
```bash
# Install dependencies
go mod download

# Build
go build -o bin/app ./cmd/app

# Run tests
go test ./...

# Run linter
golangci-lint run
```

**Update `.devcontainer/devcontainer.json`:**
```json
{
  "image": "mcr.microsoft.com/devcontainers/go:1.21",
  "features": {
    "ghcr.io/devcontainers/features/go:1": {}
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "golang.go",
        "GitHub.copilot"
      ]
    }
  }
}
```

### TypeScript Projects

**Key changes to `.github/copilot-instructions.md`:**

```markdown
## Technology Stack
- **Language**: TypeScript 5.x
- **Runtime**: Node.js 18+
- **Framework**: Express/NestJS/Next.js
- **Testing**: Jest + Testing Library
- **Package Manager**: npm/yarn/pnpm

## Code Style & Conventions
- Strict TypeScript configuration
- Use interfaces over types where possible
- Explicit return types for functions
- No `any` types (use `unknown` if needed)

## Common Tasks
### Adding a New Service
1. Create service file with interface
2. Implement service class
3. Add dependency injection
4. Write unit tests with mocks
5. Update types/interfaces
```

**Update `.eslintrc.cjs`:**
```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json'
  }
};
```

## 🔄 Step-by-Step Adaptation Process

### 1. Copy Base Files

```bash
# Create target directories
mkdir -p target-project/.github/ISSUE_TEMPLATE
mkdir -p target-project/.devcontainer
mkdir -p target-project/scripts

# Copy files
cp source/.github/copilot-instructions.md target-project/.github/
cp source/.github/copilot-setup.sh target-project/.github/
cp source/.github/COPILOT_WORKFLOW.md target-project/.github/
cp source/.github/CODEOWNERS target-project/.github/
cp source/.github/PULL_REQUEST_TEMPLATE.md target-project/.github/
cp source/.github/ISSUE_TEMPLATE/*.md target-project/.github/ISSUE_TEMPLATE/
cp source/CONTRIBUTING.md target-project/
cp source/.devcontainer/devcontainer.json target-project/.devcontainer/
cp source/scripts/setup.sh target-project/scripts/

# Make scripts executable
chmod +x target-project/.github/copilot-setup.sh
chmod +x target-project/scripts/setup.sh
```

### 2. Update copilot-instructions.md

1. **Replace project name**: Bridge 4 Flight Map → Your Project Name
2. **Update technology stack**: List your actual dependencies
3. **Describe project structure**: Match your directory layout
4. **Update coding conventions**: Add language-specific guidelines
5. **Customize color schemes**: Replace Stormlight Archive theme if not applicable
6. **Adjust common tasks**: Document your typical workflows

### 3. Update copilot-setup.sh

1. **Check version requirements**: Node/Python/Go version
2. **Update dependency installation**: npm/pip/go mod/cargo
3. **Modify build commands**: Update for your build tool
4. **Adjust test commands**: Match your test framework
5. **Update linter commands**: Your linting setup
6. **Customize checks**: Add project-specific validations

### 4. Update CONTRIBUTING.md

1. **Setup instructions**: Match your development environment
2. **Coding standards**: Add language-specific standards
3. **Git workflow**: Update branch naming, commit messages
4. **Testing requirements**: Document your test expectations
5. **Review process**: Describe your PR review workflow

### 5. Update Issue Templates

1. **Labels**: Match your GitHub labels
2. **Environment fields**: Add relevant environment info
3. **Custom fields**: Add project-specific sections

### 6. Update PR Template

1. **Testing checklist**: Match your test commands
2. **Build steps**: Update for your build process
3. **Deployment notes**: Add deployment-specific items
4. **Review criteria**: Customize for your team

### 7. Update CODEOWNERS

1. **Add team members**: Replace with actual GitHub usernames
2. **Organize by area**: Match your project structure
3. **Set team ownership**: Use GitHub teams if applicable

### 8. Update devcontainer.json

1. **Base image**: Choose appropriate dev container image
2. **Features**: Add required development tools
3. **Extensions**: Add language/framework-specific extensions
4. **Ports**: Update forwarded ports for your services
5. **Post-create command**: Update setup command

### 9. Test the Configuration

```bash
cd target-project

# Test setup script
./.github/copilot-setup.sh

# Verify build
# (use your build command)

# Check Copilot instructions are readable
cat .github/copilot-instructions.md
```

## 📝 Customization Checklist

Use this checklist when adapting configurations:

- [ ] Project name updated everywhere
- [ ] Technology stack documented accurately
- [ ] Directory structure matches your project
- [ ] Coding conventions reflect your team's standards
- [ ] Setup script works on clean environment
- [ ] Build commands are correct
- [ ] Test commands are correct
- [ ] Linting configuration exists and works
- [ ] CODEOWNERS has correct team members
- [ ] Issue templates use correct labels
- [ ] PR template has relevant checklist items
- [ ] Dev container has required tools
- [ ] All scripts are executable
- [ ] Documentation is clear and accurate

## 🎯 Best Practices

### Keep It Simple
- Start with essential files only
- Add recommended files as needed
- Don't over-complicate instructions

### Make It Specific
- Include actual commands, not placeholders
- Use real examples from your codebase
- Document actual patterns used

### Keep It Updated
- Review configuration quarterly
- Update when tech stack changes
- Incorporate team feedback

### Test Thoroughly
- Test setup script on clean machine
- Verify all commands work
- Ask new contributors to try it

## 🔗 Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Best Practices Guide](https://gh.io/copilot-coding-agent-tips)
- [Dev Containers](https://containers.dev/)
- [GitHub Issue Templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests)

## 🤝 Contributing Back

If you create adaptations for other stacks not covered here:
1. Document your changes
2. Share back to the community
3. Help improve this guide

---

**Remember**: These configurations are living documents. Adapt them to your team's needs and keep them updated as your project evolves.

⚡ **Happy coding with Copilot!** ⚡
