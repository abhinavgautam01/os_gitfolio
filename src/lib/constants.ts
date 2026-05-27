import type { ChartTheme, ContributionLevel } from '@/types';

// =============================================================================
// GitViz Pro — Constants
// =============================================================================

// -----------------------------------------------------------------------------
// Username Validation (SPEC §9.1)
// -----------------------------------------------------------------------------

/** Regex for validating GitHub usernames (SPEC §9.1) */
export const USERNAME_REGEX = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

/** Maximum allowed length for a GitHub username */
export const MAX_USERNAME_LENGTH = 39;

// -----------------------------------------------------------------------------
// Contribution Level Thresholds (SPEC §9.3)
// -----------------------------------------------------------------------------

/**
 * Thresholds for mapping contribution counts to intensity levels.
 * Mirrors GitHub's own calculation.
 */
export const CONTRIBUTION_LEVELS: Record<
  ContributionLevel,
  { min: number; max: number }
> = {
  0: { min: 0, max: 0 },
  1: { min: 1, max: 3 },
  2: { min: 4, max: 6 },
  3: { min: 7, max: 9 },
  4: { min: 10, max: Infinity },
} as const;

// -----------------------------------------------------------------------------
// Chart Themes (SPEC §9.14 + DESIGN.md)
// -----------------------------------------------------------------------------

/** Color definitions for all 12 chart themes — 5 levels each (0–4) */
export const CHART_THEMES: Record<ChartTheme, [string, string, string, string, string]> = {
  'github-green':  ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  'github-dark':   ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  'ocean-blue':    ['#eef2ff', '#93c5fd', '#3b82f6', '#1d4ed8', '#1e3a8a'],
  'dracula':       ['#282a36', '#bd93f9', '#ff79c6', '#ff5555', '#f8f8f2'],
  'halloween':     ['#161b22', '#631c03', '#bd561d', '#fa7a18', '#fddf68'],
  'panda':         ['#f5f5f5', '#ffb3ba', '#ff69b4', '#ff1493', '#8b0057'],
  'teal':          ['#f0fdfa', '#99f6e4', '#2dd4bf', '#0d9488', '#115e59'],
  'sunset':        ['#fff7ed', '#fed7aa', '#fb923c', '#ea580c', '#7c2d12'],
  'monochrome':    ['#f9fafb', '#d1d5db', '#6b7280', '#374151', '#111827'],
  'neon':          ['#0d0d0d', '#003300', '#006600', '#00cc00', '#00ff41'],
  'purple-rain':   ['#faf5ff', '#d8b4fe', '#a855f7', '#7c3aed', '#4c1d95'],
  'coral':         ['#fff5f5', '#fed7d7', '#fc8181', '#e53e3e', '#9b2c2c'],
} as const;

// -----------------------------------------------------------------------------
// Aurora Hues (DESIGN.md — per-theme aurora glow hue values)
// -----------------------------------------------------------------------------

/** CSS `--aurora-hue` values for each chart theme */
export const AURORA_HUES: Record<ChartTheme, number> = {
  'github-green':  140,
  'github-dark':   140,
  'ocean-blue':    220,
  'dracula':       270,
  'halloween':     30,
  'panda':         330,
  'teal':          170,
  'sunset':        15,
  'monochrome':    0,
  'neon':          130,
  'purple-rain':   280,
  'coral':         0,
} as const;

// -----------------------------------------------------------------------------
// Cache TTLs (SPEC §8)
// -----------------------------------------------------------------------------

/** Cache time-to-live values in seconds */
export const CACHE_TTLS = {
  /** contributions:{username}:{year} */
  contributions: 600,       // 10 minutes
  /** stats:{username} */
  stats: 600,               // 10 minutes
  /** languages:{username} — changes rarely */
  languages: 3600,          // 60 minutes
  /** repos:{username} */
  repos: 1800,              // 30 minutes
  /** og:{username} */
  og: 3600,                 // 60 minutes
  /** og:compare:{usernameA}:{usernameB} */
  ogCompare: 3600,          // 60 minutes
  /** Reduced TTL for authenticated users viewing own profile */
  authenticatedSelf: 120,   // 2 minutes
} as const;

// -----------------------------------------------------------------------------
// GitHub Language Colors
// Top 30+ languages sourced from github-linguist color data
// -----------------------------------------------------------------------------

/** Official GitHub language colors (hex) for the most popular languages */
export const GITHUB_LANGUAGE_COLORS: Record<string, string> = {
  'JavaScript':  '#f1e05a',
  'TypeScript':  '#3178c6',
  'Python':      '#3572A5',
  'Java':        '#b07219',
  'C':           '#555555',
  'C++':         '#f34b7d',
  'C#':          '#178600',
  'Go':          '#00ADD8',
  'Rust':        '#dea584',
  'Ruby':        '#701516',
  'PHP':         '#4F5D95',
  'Swift':       '#F05138',
  'Kotlin':      '#A97BFF',
  'Dart':        '#00B4AB',
  'Scala':       '#c22d40',
  'Shell':       '#89e051',
  'Lua':         '#000080',
  'Perl':        '#0298c3',
  'R':           '#198CE7',
  'MATLAB':      '#e16737',
  'Haskell':     '#5e5086',
  'Elixir':      '#6e4a7e',
  'Clojure':     '#db5855',
  'Erlang':      '#B83998',
  'Julia':       '#a270ba',
  'Objective-C': '#438eff',
  'HTML':        '#e34c26',
  'CSS':         '#563d7c',
  'SCSS':        '#c6538c',
  'Vue':         '#41b883',
  'Svelte':      '#ff3e00',
  'Astro':       '#ff5a03',
  'Zig':         '#ec915c',
  'Nim':         '#ffc200',
  'OCaml':       '#3be133',
  'F#':          '#b845fc',
  'PowerShell':  '#012456',
  'Dockerfile':  '#384d54',
  'Makefile':    '#427819',
  'HCL':         '#844FBA',
  'Nix':         '#7e7eff',
  'Jupyter Notebook': '#DA5B0B',
  'Vim Script':  '#199f4b',
  'Groovy':      '#4298b8',
  'Assembly':    '#6E4C13',
  'VHDL':        '#adb2cb',
  'Verilog':     '#b2b7f8',
  'TeX':         '#3D6117',
  'Fortran':     '#4d41b1',
  'COBOL':       '#b5a68e',
} as const;
