# Contributing to UptimeCheck

Thank you for your interest in contributing to UptimeCheck! We welcome contributions from the community and are pleased to have you join us.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/uptimecheck.git
   cd uptimecheck
   ```
3. **Install dependencies**:
   ```bash
   bun install
   ```
4. **Set up the development environment** following the [README.md](README.md) instructions

## 🛠️ Development Workflow

### Making Changes

1. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Commit your changes** with a descriptive message:
   ```bash
   git commit -m "feat: add new monitoring feature"
   # or
   git commit -m "fix: resolve websocket connection issue"
   ```

### Commit Message Convention

We follow conventional commits format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Code Style

- Use **TypeScript** for all new code
- Follow **ESLint** and **Prettier** configurations
- Write **meaningful variable and function names**
- Add **comments** for complex logic
- Ensure **type safety** throughout

### Testing

Before submitting a pull request:

1. **Run the linter**:
   ```bash
   bun run lint
   ```

2. **Check types**:
   ```bash
   bun run check-types
   ```

3. **Test all services**:
   ```bash
   # Test API
   cd apps/api && bun run dev

   # Test Hub
   cd apps/hub && bun index.ts

   # Test Validator
   cd apps/validator && bun index.ts

   # Test Frontend
   cd apps/frontend && bun run dev
   ```

## 📝 Pull Request Process

1. **Update documentation** if needed
2. **Add or update tests** for your changes
3. **Ensure all checks pass** (linting, type checking, tests)
4. **Create a pull request** with:
   - Clear description of changes
   - Reference any related issues
   - Screenshots/demos if applicable

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (please describe)

## Testing
- [ ] Tested locally
- [ ] All services start correctly
- [ ] No TypeScript errors
- [ ] Linting passes

## Screenshots (if applicable)
Add screenshots or GIFs here

## Related Issues
Closes #issue_number
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the problem
3. **Expected behavior** vs actual behavior
4. **Environment details** (OS, Node version, etc.)
5. **Error messages** or logs if applicable
6. **Screenshots** if relevant

## 💡 Feature Requests

For feature requests, please provide:

1. **Clear description** of the feature
2. **Use case** and motivation
3. **Proposed implementation** (if you have ideas)
4. **Alternative solutions** you've considered

## 🏗️ Architecture Guidelines

### Microservices Structure
- **API**: REST endpoints and business logic
- **Hub**: WebSocket coordination and validator management  
- **Validator**: Distributed monitoring workers
- **Frontend**: Next.js user interface
- **Packages**: Shared code and configurations

### Database Changes
- Use **Prisma migrations** for schema changes
- Update **seed data** if needed
- Test migrations in development environment

### Adding New Services
1. Create service in `apps/` directory
2. Add package.json with proper metadata
3. Update root workspace configuration
4. Add README.md with service documentation
5. Update main README.md architecture section

## 🔐 Security

- **Do not commit secrets** or API keys
- Use **environment variables** for configuration
- Follow **security best practices** for authentication
- Report security issues privately to: aayushvaghela412@gmail.com

## 📖 Documentation

- Update **README.md** for significant changes
- Add **code comments** for complex logic
- Update **API documentation** if adding endpoints
- Include **examples** in documentation

## 🎯 Areas for Contribution

We especially welcome contributions in:

- **New monitoring features** (SSL monitoring, API checks)
- **Performance improvements** (optimization, caching)
- **UI/UX enhancements** (dashboard improvements)
- **Testing** (unit tests, integration tests)
- **Documentation** (guides, tutorials, API docs)
- **Mobile responsiveness** improvements
- **Accessibility** enhancements

## 🤝 Community

- Be **respectful** and **inclusive**
- Help **newcomers** get started
- **Share knowledge** and best practices
- **Collaborate** and support each other

## 📞 Contact

- **GitHub Issues**: For bugs and feature requests
- **Email**: aayushvaghela412@gmail.com
- **Website**: https://aayush-vaghela.vercel.app/

## 📜 License

By contributing to UptimeCheck, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for contributing to UptimeCheck! 🚀
