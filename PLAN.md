# Design System Refactoring Plan

## 1. Current State Assessment

**Config File**: `tailwind.config.js` (Root)
**Status**: Currently mixed monolithic configuration.
*(Note: System indicates file might be missing or renamed to .bak, but analysis is based on active context).*

**Key Issues**:
- **Mixed Abstraction Levels**: Primitive color palettes (Gray, Pokemon Types) are mixed with Semantic aliases (Text, Background).
- **Hardcoded Overrides**: `theme.spacing` and `theme.fontSize` are strictly overridden in the main config.
- **Maintainability**: A single large configuration file makes it difficult to track relationships between tokens.

### Existing Tokens Inventory

| Category | Token Names / Scale | Current Location | Note |
| :--- | :--- | :--- | :--- |
| **Spacing** | `xs`(4px), `sm`(8px), `md`(12px), `lg`(16px), `xl`(24px), `2xl`(32px) | `theme.spacing` | Strict override. |
| **Typography** | `token-title-xl`, `token-body-md`, `token-body-md-bold`, etc. | `theme.fontSize` | Strict override. |
| **Colors (Base)** | `gray` (50-950) | `colors` | Standard palette. |
| **Colors (Domain)** | `type` (18 types, 50-950 steps) | `colors.type` | Massive definition block. |
| **Colors (Semantic)** | `text`, `background`, `border`, `icon` | `colors.*` | Mapped to Gray palette. |
| **Fonts** | `sans`, `display` | `fontFamily` | Roboto Mono / Press Start 2P. |
| **Radius** | `sm`(3px), `md`(4px), `lg`(8px), `DEFAULT`(3px) | `borderRadius` | 3px default is key. |
| **Z-Index** | `base`...`toast` | `zIndex` | Standard layering. |

## 2. Target Architecture (3-Layer Model)

We will introduce a dedicated `src/design-system` directory to manage these tokens.

### Directory Structure
```
src/
  design-system/
    tokens/
      index.ts        // Main entry point (exports for Tailwind)
      primitives.ts   // Layer 1: Raw values (Palette, Scale)
      semantics.ts    // Layer 2: Design decisions (Aliases)
```

### Layer Definition

#### 1. Primitives (`primitives.ts`)
Stores the raw values. No design intent, just data.
- **Palettes**: `Gray`, `PokemonTypes` (Fire, Water...)
- **Scales**: `SpacingScale`, `RadiusScale`, `FontFamily`

#### 2. Semantics (`semantics.ts`)
Maps primitives to usage contexts.
- **Colors**:
    - `fg.primary` -> `Gray.900`
    - `bg.surface` -> `Gray.White`
    - `brand.fire` -> `PokemonTypes.Fire.500`
- **Typography**:
    - `text.body.md` -> `14px` (etc)

## 3. Migration & Mapping Strategy

### Step 1: Create Token Files
We will define tokens in TypeScript to allow for strict typing.

**Example Structure:**
```typescript
// primitives.ts
export const Palette = {
  Gray: { 50: '#f9fafb', ... 900: '#111827' },
  Fire: { 500: '#EE8130', ... }
}

// semantics.ts
import { Palette } from './primitives';

export const SemanticColors = {
  text: {
    primary: Palette.Gray[900],
    secondary: Palette.Gray[600],
  },
  type: {
    fire: Palette.Fire[500], // Primary brand color for Fire
  }
}
```

### Step 2: Update Tailwind Config
We will update `tailwind.config.js` to require these files. Use `ts-node` or compile step if necessary, or simply keep token files as JS if build tooling is restrictive (Angular default).
**Recommendation**: Use `.ts` for source of truth, but if strictly needed for `tailwind.config.js`, we might use `module.exports` in `.js` files for simplicity in this specific environment, OR use `JSDoc` for type safety.

### Step 3: Refactoring Usage
- Ensure existing utility classes (`text-token-title-xl`, `bg-type-fire-500`) continue to work by mapping the new tokens to the same keys in `tailwind.config.js`.

## 4. Execution Plan (Next Steps)
1.  Create `src/design-system/tokens/` directory.
2.  Extract `primitives.ts` (Colors, Spacing, Radius).
3.  Extract `semantics.ts` (Text, Bg, Typography).
4.  Modify `tailwind.config.js` to import these new structures.
