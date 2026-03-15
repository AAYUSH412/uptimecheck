# ⚙️ @uptime/typescript-config

Shared TypeScript configurations for the UptimeCheck monorepo. Ensures consistent compiler settings and type checking across all packages.

## 🎯 Purpose

Provides reusable `tsconfig.json` bases to:
- Enforce consistent TypeScript compilation
- Standardize output targets and module formats
- Enable consistent strict type checking
- Reduce configuration duplication

Each workspace extends a base configuration matching its runtime environment.

## 📦 Configurations

### `base.json`
**Use for**: All TypeScript projects (default baseline)

Enforces strict type checking:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

**Key Settings**:
- `strict: true` → Strictest type checking
- `moduleResolution: "bundler"` → Modern module resolution
- `target: "ES2020"` → Modern JavaScript features
- `declaration: true` → Generate `.d.ts` files

**Used by**:
- `packages/common`
- `packages/db`
- `apps/hub`
- `apps/validator`

### `nextjs.json`
**Use for**: Next.js frontend applications

Extends base with Next.js-specific settings:

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "incremental": true,
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "tsBuildInfoFile": ".next/.tsbuildinfo"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", ".next"]
}
```

**Key Settings**:
- `jsx: "preserve"` → Let Next.js handle JSX
- `noEmit: true` → Next.js builds output, tsconfig just type-checks
- `lib: ["DOM", "DOM.Iterable"]` → Browser API types
- `incremental: true` → Faster builds

**Used by**:
- `apps/frontend`

### `react-library.json`
**Use for**: Standalone React component libraries

Optimized for exporting reusable components:

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "declaration": true,
    "declarationDir": "dist",
    "outDir": "dist",
    "allowSyntheticDefaultImports": true
  }
}
```

**Key Settings**:
- `jsx: "react-jsx"` → Modern React JSX transform
- `declaration: true` → Export type definitions
- `outDir: "dist"` → Compiled JavaScript output

**Current Usage**: Available for future React component packages.

## 🛠 Setup in a New Package

### Option 1: Bun Workspace (Generic)

Create `tsconfig.json`:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig.json",
  "extends": "typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Option 2: Next.js App

Create `tsconfig.json`:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig.json",
  "extends": "typescript-config/nextjs.json"
}
```

Next.js auto-generates `next-env.d.ts` and merges settings.

### Option 3: React Component Library

Create `tsconfig.json`:

```json
{
  "extends": "typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

## ✅ Type Checking

### Check for Type Errors

```bash
bun run check-types
```

Typically runs:
```bash
tsc --noEmit
```

(Checks types without emitting compiled output)

### Generate Type Declarations

```bash
bun run build
```

Generates `.d.ts` files based on `declaration` setting.

### Watch Mode

```bash
tsc --watch
```

Continuously type-check as you edit files.

## 🔧 Customization Per Package

Override settings in individual `tsconfig.json`:

```json
{
  "extends": "typescript-config/base.json",
  "compilerOptions": {
    "strict": false,  // Override base's strict mode
    "lib": ["ES2020"]
  }
}
```

⚠️ Use sparingly — inconsistency leads to type errors.

## 📊 Compiler Option Reference

### `strict: true` Enables:

| Option | Meaning |
| :--- | :--- |
| `noImplicitAny` | Reject `any` types without explicit declaration |
| `strictNullChecks` | Distinguish `null` from values |
| `strictFunctionTypes` | Strict function parameter checking |
| `strictBindCallApply` | Strict `.bind()`, `.call()`, `.apply()` |
| `strictPropertyInitialization` | All fields must be initialized |
| `noImplicitThis` | Reject `this` without explicit type |
| `alwaysStrict` | Emit `"use strict"` in all files |

### Module Resolution:

| Setting | Behavior |
| :--- | :--- |
| `"node"` | CommonJS style (legacy) |
| `"bundler"` | ESM + specifiers (modern) |
| `"nodenext"` | Node with ESM |

## 🔗 Path Aliases

Enable `@` imports in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@types/*": ["types/*"]
    }
  }
}
```

Then in code:

```typescript
import { Button } from '@/components/Button';
import type { User } from '@types/user';
```

## 🚨 Troubleshooting

### "Declaration file not generated"
Ensure `compilerOptions.declaration: true` in tsconfig.json.

### "Cannot find module 'typescript-config'"
Make sure it's installed in the workspace:
```bash
bun add --save-dev typescript-config
```

### Type Errors in Previously Working Code
May indicate base config was updated. Run:
```bash
tsc --explainFiles
```

To see all files being checked.

### Monorepo Path Resolution Issues
Check `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": "../../",
    "paths": {
      "common/*": ["packages/common/*"],
      "db/*": ["packages/db/*"]
    }
  }
}
```

## 📚 Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [tsconfig.json Reference](https://www.typescriptlang.org/tsconfig)
- [Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [Type Safety Deep Dive](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

## 🤝 Contributing

To add a new configuration:
1. Create `newconfig.json`
2. Document in this README
3. Update `package.json` exports
4. Provide example usage
5. Test with actual package

## 📄 License

MIT

