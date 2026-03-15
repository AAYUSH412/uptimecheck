# 📋 @uptime/eslint-config

Shared ESLint configurations for the UptimeCheck monorepo. Ensures consistent code style and quality across all packages.

## 🎯 Purpose

Provides reusable ESLint configurations to:
- Enforce consistent code style
- Catch common errors early
- Follow industry best practices
- Reduce configuration duplication

Each workspace imports a configuration matching its technology stack.

## 📦 Configurations

### `base.js`
**Use for**: Generic TypeScript/JavaScript packages

Core rules for:
- Variable naming
- Function complexity
- Error handling
- Import organization

```javascript
export default {
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'error',
    'no-implicit-any': 'warn'
  }
};
```

**Used by**:
- `packages/common`
- `packages/db`
- `apps/hub`
- `apps/validator`

### `next.js`
**Use for**: Next.js applications

Extends base with rules for:
- Next.js specific patterns
- React best practices
- Server/Client component boundaries
- Image optimization

```javascript
export default {
  extends: ['./base.js', 'next/core-web-vitals'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/no-unescaped-entities': 'warn'
  }
};
```

**Used by**:
- `apps/frontend`

### `react-internal.js`
**Use for**: Internal React component libraries

Enforces:
- Component prop types
- Hook dependencies
- Accessibility standards
- Performance optimizations

```javascript
export default {
  extends: ['./base.js', 'plugin:react/recommended'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off'
  }
};
```

**Current Usage**: Available for future React libraries.

## 🛠 Setup in a New Package

### 1. Install Dependencies

```bash
bun add --save-dev eslint eslint-config
```

### 2. Create `eslint.config.js`

For a **generic TypeScript package**:

```javascript
import { baseConfig } from 'eslint-config/base.js';

export default [
  baseConfig,
  {
    files: ['src/**/*.ts'],
    rules: {
      // Package-specific overrides
    }
  }
];
```

For a **Next.js app**:

```javascript
import { nextJsConfig } from 'eslint-config/next.js';

export default nextJsConfig;
```

### 3. Add npm Scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## 📖 Usage

### Check for Linting Issues

```bash
bun run lint
```

Reports all ESLint violations without fixing.

### Auto-fix Issues

```bash
bun run lint:fix
```

Automatically fixes:
- Formatting
- Import ordering
- Some code patterns
- Whitespace

Manual review still needed for warnings.

### Check Specific File

```bash
bun run lint src/utils.ts
```

## ⚙️ Common Rules

| Rule | Level | Purpose |
| :--- | :--- | :--- |
| `no-console` | warn | Discourage debug logs in production code |
| `no-unused-vars` | error | Remove dead code |
| `no-var` | error | Use `const`/`let` instead |
| `prefer-const` | warn | Use `const` when variable isn't reassigned |
| `eqeqeq` | error | Use `===` instead of `==` |
| `no-implicit-any` | warn | Require explicit types (TypeScript) |

## 🔧 Customization

To add package-specific rules without modifying shared config:

```javascript
import { baseConfig } from 'eslint-config/base.js';

export default [
  baseConfig,
  {
    files: ['src/**/*.ts'],
    rules: {
      'no-console': 'off' // Allow console here
    }
  }
];
```

## 🔗 Integration with Git Hooks

To lint before commit (with Husky):

```bash
bun add --save-dev husky lint-staged
npx husky install
```

Create `.husky/pre-commit`:

```bash
#!/bin/sh
npx lint-staged
```

Create `.lintstagedrc.json`:

```json
{
  "src/**/*.{ts,tsx}": "eslint --fix"
}
```

Now violations are caught before commit.

## 📚 Resources

- [ESLint Documentation](https://eslint.org/docs)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [TypeScript ESLint](https://typescript-eslint.io)
- [Next.js ESLint](https://nextjs.org/docs/basic-features/eslint)

## 🚨 Troubleshooting

### "Cannot find module 'eslint-config'"
Make sure you've installed it:
```bash
bun add --save-dev eslint-config
```

### Rule Conflicts Between Configs
Apply rules in order of specificity:

```javascript
export default [
  baseConfig,      // Most general
  nextJsConfig,    // More specific
  { rules: {...} } // Package-specific (highest priority)
];
```

### Too Many Warnings
Turn some `error` rules to `warn`:

```javascript
rules: {
  'no-implicit-any': 'warn'
}
```

## 🤝 Contributing

To add a new configuration:
1. Create `new-pattern.js`
2. Document in this README
3. Update `package.json` exports
4. Add usage examples

## 📄 License

MIT
