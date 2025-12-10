# Typography Token Plan

## 1. Design Philosophy
Typography is strictly controlled with a limited set of semantic tokens.
All fonts use:
- **Titles**: 'Press Start 2P' (Retro Game feel)
- **Body**: 'Roboto Mono' (Systematic/Digital feel)

## 2. Token Definitions

### Titles (Headings & Emphasis)
Used for game titles, section headers, and card titles. All Titles are **Bold** (700).

| Token | Size | Line Height | Usage |
| :--- | :--- | :--- | :--- |
| `.text-title-l` | 22px | 1.2 | Game Title, Main Section Headers |

### Body (Readability & UI)
Used for all standard text, descriptions, and UI elements.
Available in Regular (400) and Bold (700) variants.

| Token | Size | Usage |
| :--- | :--- | :--- |
| `.text-body-md` | 14px | **Default**. Main content, paragraphs. |
| `.text-body-sm` | 12px | Supplementary text, metadata, tooltips. |

**Bold Variants:**
- `.text-body-md-bold`
- `.text-body-sm-bold`

## 3. Strict Rules
- **Primary Title**: `Title XL` (22px). Used for Page Titles and Major Section Headers.
- **Standard Body**: `Body MD` (14px). Used for paragraphs and main descriptions.
- **Supplementary / Headings**: `Body SM` (12px). Used for sub-headings, labels, component text, and secondary information.
- **Avoid**: Use of other sizes (LG, XS) is discouraged unless strictly necessary for specific UI constraints.
