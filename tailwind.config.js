/** @type {import('tailwindcss').Config} */

// ============================================
// 1. PRIMARY TOKENS (基本色パレット)
// ============================================

// Neutral Colors (Gray Scale)
const colorGray = {
  50: '#f9fafb',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280',
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
  950: '#030712'
};

// Result Colors (Win/Lose with 10-scale)
const colorWin = {
  50: '#f7fee7',   // lime-50
  100: '#ecfccb',  // lime-100
  200: '#d9f99d',  // lime-200
  300: '#bef264',  // lime-300
  400: '#a3e635',  // lime-400
  500: '#84cc16',  // lime-500 - DEFAULT (黄緑系)
  600: '#65a30d',  // lime-600
  700: '#4d7c0f',  // lime-700
  800: '#3f6212',  // lime-800
  900: '#365314',  // lime-900
  950: '#1a2e05',  // lime-950
  DEFAULT: '#84cc16'
};

const colorLose = {
  50: '#fef2f2',   // red-50
  100: '#fee2e2',  // red-100
  200: '#fecaca',  // red-200
  300: '#fca5a5',  // red-300
  400: '#f87171',  // red-400
  500: '#ef4444',  // red-500 - DEFAULT (赤系)
  600: '#dc2626',  // red-600
  700: '#b91c1c',  // red-700
  800: '#991b1b',  // red-800
  900: '#7f1d1d',  // red-900
  950: '#450a0a',  // red-950
  DEFAULT: '#ef4444'
};

// Pokemon Type Colors (各タイプ10段階)
const colorTypeNormal = {
  50: '#f6f6f2', 100: '#ecece4', 200: '#d8d7c6', 300: '#c4c3a9', 400: '#b0af8b',
  500: '#A8A77A', 600: '#868662', 700: '#656449', 800: '#434331', 900: '#222118', 950: '#11110c',
  DEFAULT: '#A8A77A'
};

const colorTypeFire = {
  50: '#fef2ea', 100: '#fce6d5', 200: '#f9ccac', 300: '#f5b282', 400: '#f29959',
  500: '#EE8130', 600: '#be6726', 700: '#8f4d1d', 800: '#5f3413', 900: '#301a0a', 950: '#180d05',
  DEFAULT: '#EE8130'
};

const colorTypeWater = {
  50: '#eff4fe', 100: '#e0e9fc', 200: '#c1d2fa', 300: '#a1bcf7', 400: '#82a6f4',
  500: '#6390F0', 600: '#4f73c0', 700: '#3b5690', 800: '#283a60', 900: '#141d30', 950: '#0a0e18',
  DEFAULT: '#6390F0'
};

const colorTypeElectric = {
  50: '#fefbea', 100: '#fef6d5', 200: '#fdecaa', 300: '#fce280', 400: '#fad956',
  500: '#F7D02C', 600: '#c6a623', 700: '#947d1a', 800: '#635312', 900: '#312a09', 950: '#191504',
  DEFAULT: '#F7D02C'
};

const colorTypeGrass = {
  50: '#f2f9ed', 100: '#e4f4db', 200: '#c9e9b8', 300: '#aede94', 400: '#94d371',
  500: '#7AC74C', 600: '#629f3d', 700: '#49772e', 800: '#314f1e', 900: '#18280f', 950: '#0c1408',
  DEFAULT: '#7AC74C'
};

const colorTypeIce = {
  50: '#f4fbfb', 100: '#eaf7f7', 200: '#d5efee', 300: '#c0e7e5', 400: '#abe0dd',
  500: '#96D9D6', 600: '#78aeab', 700: '#5a8280', 800: '#3c5756', 900: '#1e2b2b', 950: '#0f1616',
  DEFAULT: '#96D9D6'
};

const colorTypeFighting = {
  50: '#f9eaeb', 100: '#f3d5d6', 200: '#e7abad', 300: '#db8285', 400: '#cf585c',
  500: '#C22E28', 600: '#9b2520', 700: '#741c18', 800: '#4e1210', 900: '#270908', 950: '#130504',
  DEFAULT: '#C22E28'
};

const colorTypePoison = {
  50: '#f6ecf6', 100: '#edd8ec', 200: '#dbb2da', 300: '#c98cc7', 400: '#b765b5',
  500: '#A33EA1', 600: '#823281', 700: '#622561', 800: '#411940', 900: '#210c20', 950: '#100610',
  DEFAULT: '#A33EA1'
};

const colorTypeGround = {
  50: '#fcf9f0', 100: '#f9f2e0', 200: '#f3e6c1', 300: '#edd9a3', 400: '#e7cd84',
  500: '#E2BF65', 600: '#b59951', 700: '#88733d', 800: '#5a4c28', 900: '#2d2614', 950: '#17130a',
  DEFAULT: '#E2BF65'
};

const colorTypeFlying = {
  50: '#f6f4fe', 100: '#ede9fc', 200: '#dbd2f9', 300: '#c9bcf6', 400: '#b7a5f3',
  500: '#A98FF3', 600: '#8772c2', 700: '#655692', 800: '#443961', 900: '#221d31', 950: '#110e18',
  DEFAULT: '#A98FF3'
};

const colorTypePsychic = {
  50: '#ffeef3', 100: '#ffdde7', 200: '#ffbbce', 300: '#ff99b6', 400: '#fb779e',
  500: '#F95587', 600: '#c7446c', 700: '#953351', 800: '#642236', 900: '#32111b', 950: '#19080d',
  DEFAULT: '#F95587'
};

const colorTypeBug = {
  50: '#f6f8e8', 100: '#edf1d1', 200: '#dce4a3', 300: '#cad676', 400: '#b8c948',
  500: '#A6B91A', 600: '#859415', 700: '#646f10', 800: '#424a0b', 900: '#212505', 950: '#101203',
  DEFAULT: '#A6B91A'
};

const colorTypeRock = {
  50: '#f8f6eb', 100: '#f1ecd7', 200: '#e3d9af', 300: '#d5c687', 400: '#c6b35e',
  500: '#B6A136', 600: '#92812b', 700: '#6d6120', 800: '#494016', 900: '#24200b', 950: '#121005',
  DEFAULT: '#B6A136'
};

const colorTypeGhost = {
  50: '#f1eef5', 100: '#e3deeb', 200: '#c7bdd6', 300: '#ab9cc2', 400: '#8f7bad',
  500: '#735797', 600: '#5c4679', 700: '#45345b', 800: '#2e233c', 900: '#17111e', 950: '#0b090f',
  DEFAULT: '#735797'
};

const colorTypeDragon = {
  50: '#f1ebfe', 100: '#e2d7fe', 200: '#c6affd', 300: '#a986fc', 400: '#8d5dfc',
  500: '#6F35FC', 600: '#592aca', 700: '#431f97', 800: '#2c1565', 900: '#160b32', 950: '#0b0519',
  DEFAULT: '#6F35FC'
};

const colorTypeSteel = {
  50: '#f8f8fa', 100: '#f1f1f5', 200: '#e2e2eb', 300: '#d4d4e1', 400: '#c5c5d8',
  500: '#B7B7CE', 600: '#9292a5', 700: '#6e6e7c', 800: '#494952', 900: '#252529', 950: '#121215',
  DEFAULT: '#B7B7CE'
};

const colorTypeDark = {
  50: '#f1eeed', 100: '#e3dedb', 200: '#c6bcb7', 300: '#a99b93', 400: '#8d796e',
  500: '#705746', 600: '#5a4638', 700: '#43342a', 800: '#2d231c', 900: '#16110e', 950: '#0b0907',
  DEFAULT: '#705746'
};

const colorTypeFairy = {
  50: '#fbf3f7', 100: '#f7e7ee', 200: '#efcedd', 300: '#e7b6cc', 400: '#df9dba',
  500: '#D685AD', 600: '#ab6a8a', 700: '#805068', 800: '#563545', 900: '#2b1b23', 950: '#150d11',
  DEFAULT: '#D685AD'
};

// ============================================
// 2. SEMANTIC TOKENS (意味的な色)
// ============================================

// Text Colors
const semanticText = {
  primary: colorGray[900],      // #111827: Main text
  secondary: colorGray[600],    // #4b5563: Descriptions, helpers
  tertiary: colorGray[400],     // #9ca3af: Placeholders
  inverse: '#ffffff',           // white: Text on dark background
};

// Background Colors
const semanticBackground = {
  canvas: colorGray[50],        // #f9fafb: Page background
  surface: '#ffffff',           // white: Cards, Modals
  subtle: colorGray[100],       // #f3f4f6: Secondary areas
  overlay: 'rgba(0, 0, 0, 0.5)',// Semi-transparent black
};

// Border Colors
const semanticBorder = {
  default: colorGray[200],      // #e5e7eb: Standard borders
  subtle: colorGray[100],       // #f3f4f6: Dividers
  focus: colorGray[700],        // #374151: Input focus rings
};

// Icon Colors
const semanticIcon = {
  default: colorGray[600],      // #4b5563
  interactive: colorGray[700],  // #374151: Key actions
  subtle: colorGray[400],       // #9ca3af
};

// Action/Button Colors
const semanticAction = {
  primary: {
    DEFAULT: colorGray[800],    // #1f2937
    hover: colorGray[700],      // #374151
    active: colorGray[900],     // #111827
    foreground: '#ffffff'
  },
  secondary: {
    DEFAULT: colorGray[200],    // #e5e7eb
    hover: colorGray[300],      // #d1d5db
    active: colorGray[400],     // #9ca3af
    foreground: colorGray[800]  // #1f2937
  },
  ghost: {
    hover: colorGray[100],      // #f3f4f6
    active: colorGray[200],     // #e5e7eb
    foreground: colorGray[600]  // #4b5563
  },
  outline: {
    hover: colorGray[100],      // #f3f4f6
    active: colorGray[200],     // #e5e7eb
    border: colorGray[200],     // #e5e7eb
    foreground: colorGray[400]  // #9ca3af
  }
};

// Result Colors (Semantic)
const semanticResult = {
  win: {
    bg: colorWin[100],          // #dcfce7
    text: colorWin[500],        // #22c55e
    DEFAULT: colorWin[500],
  },
  lose: {
    bg: colorLose[100],         // #fef9c3 (黄緑系の背景)
    text: colorLose[600],       // #ca8a04 (黄緑系のテキスト)
    DEFAULT: colorLose[600],
  }
};

// ============================================
// 3. TAILWIND CONFIG
// ============================================

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-type-(normal|fire|water|electric|grass|ice|fighting|poison|ground|flying|psychic|bug|rock|ghost|dragon|dark|steel|fairy)/,
    },
    {
      pattern: /(bg|text)-result-(win|lose)(-(bg|text))?/,
    },
    {
      pattern: /(text)-outcome-(critical|effective|neutral|resisted|immune)/,
    },
    {
      pattern: /grid-cols-.+/,
    },
    {
      pattern: /(bg|text|border)-gray-\d+/,
    }
  ],
  theme: {
    // STRICT OVERRIDES
    spacing: {
      '0': '0',
      'xs': '4px',
      'sm': '8px',
      'md': '12px',
      'lg': '16px',
      'xl': '24px',
      '2xl': '32px',
    },
    fontSize: {
      // Titles
      'token-title-l': ['15px', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '700' }],
      'token-title-m': ['14px', { lineHeight: '1.4', fontWeight: '700' }],
      'token-title-s': ['13px', { lineHeight: '1.4', fontWeight: '700' }],

      // Body
      'token-body-md': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      'token-body-md-bold': ['14px', { lineHeight: '1.5', fontWeight: '700' }],
      'token-body-sm': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
      'token-body-sm-bold': ['12px', { lineHeight: '1.5', fontWeight: '700' }],
    },

    extend: {
      // PRIMARY TOKENS
      colors: {
        // Neutral
        gray: colorGray,

        // Result States
        win: colorWin,
        lose: colorLose,

        // Pokemon Types
        type: {
          normal: colorTypeNormal,
          fire: colorTypeFire,
          water: colorTypeWater,
          electric: colorTypeElectric,
          grass: colorTypeGrass,
          ice: colorTypeIce,
          fighting: colorTypeFighting,
          poison: colorTypePoison,
          ground: colorTypeGround,
          flying: colorTypeFlying,
          psychic: colorTypePsychic,
          bug: colorTypeBug,
          rock: colorTypeRock,
          ghost: colorTypeGhost,
          dragon: colorTypeDragon,
          steel: colorTypeSteel,
          dark: colorTypeDark,
          fairy: colorTypeFairy,
        },

        // SEMANTIC TOKENS
        text: semanticText,
        background: semanticBackground,
        border: semanticBorder,
        icon: semanticIcon,
        action: semanticAction,
        result: semanticResult,
      },

      fontFamily: {
        sans: ['"Roboto Mono"', '"BIZ UDGothic"', 'monospace'],
        display: ['"Press Start 2P"', '"DotGothic16"', 'cursive'],
      },

      borderRadius: {
        none: '0',
        sm: '3px',
        DEFAULT: '3px',
        md: '4px',
        lg: '8px',
        full: '9999px',
      },

      borderWidth: {
        DEFAULT: '2px',
      },

      zIndex: {
        base: '0',
        dropdown: '100',
        modal: '200',
        overlay: '300',
        toast: '500',
      },

      boxShadow: {
        DEFAULT: '0 0 8px rgba(0, 0, 0, 0.12)',
        sm: '0 0 4px rgba(0, 0, 0, 0.12)',
        md: '0 0 12px rgba(0, 0, 0, 0.12)',
        lg: '0 0 20px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
