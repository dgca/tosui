# Testing Patterns

**Analysis Date:** 2026-01-11

## Test Framework

**Runner:**
- Not configured

**Assertion Library:**
- Not configured

**Run Commands:**
```bash
# No test commands available
# Current validation approach:
pnpm f:lib typecheck    # Type checking
pnpm f:lib lint         # Linting
pnpm f:lib build        # Build verification
```

## Test File Organization

**Location:**
- Pattern planned: `src/**/*.test.ts`, `src/**/*.test.tsx` (from `tsconfig.build.json` exclude)
- No test files currently exist

**Naming:**
- Expected pattern: `{module-name}.test.ts` or `{ComponentName}.test.tsx`

**Structure:**
```
src/
  components/
    Box/
      Box.tsx
      Box.test.tsx       # (not implemented)
    Button/
      Button.tsx
      Button.test.tsx    # (not implemented)
```

## Test Structure

**Suite Organization:**
- Not implemented

**Patterns:**
- Not established

## Mocking

**Framework:**
- Not configured

**Patterns:**
- Not established

**What to Mock:**
- N/A (library has no external dependencies to mock)

## Fixtures and Factories

**Test Data:**
- Not implemented

**Location:**
- Not established

## Coverage

**Requirements:**
- No enforced coverage target
- Relies on TypeScript and ESLint for validation

**Configuration:**
- Not configured

**View Coverage:**
- Not available

## Test Types

**Unit Tests:**
- Not implemented
- Recommended: Test component prop handling, style generation

**Integration Tests:**
- Not implemented
- Recommended: Test component composition, responsive behavior

**E2E Tests:**
- Not implemented
- Could use Playwright for visual regression testing

## Current Validation Strategy

**TypeScript Compilation:**
- `pnpm f:lib typecheck` - Strict type checking
- Catches prop errors at compile time
- Settings in `tsconfig.app.json`:
  - `strict: true`
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - `noFallthroughCasesInSwitch: true`

**ESLint:**
- `pnpm f:lib lint` - Code quality
- TypeScript ESLint integration
- React Hooks rules
- React Refresh rules

**Build Verification:**
- `pnpm f:lib build` - Full build (tsc + vite)
- Catches import errors, missing exports
- Generates TypeScript declarations

**Manual Testing:**
- `pnpm f:lib dev` - Development server with HMR
- `App.tsx` serves as interactive playground
- Visual verification of component behavior

## Recommended Test Implementation

**Framework Suggestion:**
- Vitest (modern, TypeScript-native, Vite-integrated)

**Priority Test Areas:**
1. Component prop acceptance and type safety
2. Responsive styling behavior (breakpoint handling)
3. State prop handling (_hover, _focus, _active, _disabled)
4. Polymorphic component rendering (`as` prop)
5. Style part merging (combineStyles)
6. Accessibility attributes

**Example Test Structure:**
```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Box } from './Box';

describe('Box', () => {
  describe('padding props', () => {
    it('should apply padding CSS variable', () => {
      const { container } = render(<Box p={4} />);
      expect(container.firstChild).toHaveStyle('--t-pt: calc(var(--t-spacing-unit) * 4)');
    });

    it('should handle responsive padding', () => {
      const { container } = render(<Box p={{ base: 2, md: 4 }} />);
      // Verify responsive classes applied
    });
  });

  describe('polymorphic behavior', () => {
    it('should render as section when specified', () => {
      const { container } = render(<Box as="section" />);
      expect(container.querySelector('section')).toBeTruthy();
    });
  });
});
```

---

*Testing analysis: 2026-01-11*
*Update when test infrastructure is implemented*
