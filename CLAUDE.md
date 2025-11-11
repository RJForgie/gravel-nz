# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gravel NZ is a race directory website for gravel cycling and bikepacking events in New Zealand. Built with Astro 5 and Tailwind CSS 4, deployed to Cloudflare Pages.

## Development Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (localhost:4321)
pnpm build            # Production build
pnpm preview          # Preview production build
```

## Architecture

### Content Management

Race data is stored in a single JSON file at `src/content/races/races.json`. The content collection schema is defined in `src/content/config.ts` using Zod validation:

```typescript
{
  title: string;
  date: string;              // YYYY-MM-DD format
  location: string;
  terrain: "gravel" | "bikepacking" | "cyclocross";
  registrationUrl?: string;  // Optional
  raceOptions: number[];     // Array of race distances in km
  tentative: boolean;
}
```

Races are accessed via Astro's `getCollection('races')` API, which returns a single entry containing an array of all races.

### Layout System

The site uses a split-screen layout on desktop (defined in `src/pages/index.astro`):
- **Left half**: Fixed hero section with background image and title (`HeroContent.astro`)
- **Right half**: Scrollable races list (`RacesList.astro`)

On mobile, the hero section displays at the top, followed by the races list.

The background image uses multiple layered gradients for visual depth and backdrop blur on the right side.

### Race Display Logic

`RacesList.astro` handles:
1. Sorting races chronologically by date
2. Grouping races by month with section headers
3. Detecting month boundaries to insert month labels
4. Rendering individual race cards via `RaceCard.astro`
5. Month navigation via `MonthNav.astro` with smooth scroll-to-section
6. "Back to calendar" button that appears when user scrolls past the month navigation

Each race gets a `monthKey` (YYYY-MM format) for scroll targeting.

### Component Structure

- `Layout.astro`: Base HTML structure, SEO meta tags, font imports, fixed header
- `HeroContent.astro`: Main title and tagline
- `RacesList.astro`: Main races display with month grouping logic
- `RaceCard.astro`: Individual race card component
- `MonthNav.astro`: Month-based navigation with horizontal scroll

### Styling

- Tailwind CSS 4 via Vite plugin (`@tailwindcss/vite`)
- Two primary fonts: Outfit (headings) and Inter (body text)
- Dark theme with neutral colors as base
- Amber accent color for primary actions
- Global styles in `src/styles/global.css`

### Deployment

Configured for Cloudflare Pages via `wrangler.jsonc`:
- Build output: `./dist`
- Compatibility date: 2025-07-16

### Adding New Races

Edit `src/content/races/races.json` and add a new race object to the `races` array. The display will automatically sort by date and group by month.

### Path Aliases

Uses `@/` alias for `src/` directory (e.g., `@/components/RaceCard.astro`).
