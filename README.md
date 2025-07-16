# GravelNZ

Gravel cycling and bikepacking race directory for New Zealand. Built with Astro and Tailwind CSS.

## Development

```bash
pnpm install
pnpm dev          # localhost:4321
pnpm build        # production build
```

## Project Structure

```
src/
├── components/    # Astro components
├── content/races/ # Race data (races.json)
├── layouts/       # Base layouts
├── pages/         # Routes
└── styles/        # Global CSS
```

## Adding Races

Edit `src/content/races/races.json`:

```json
{
  "title": "Race Name",
  "date": "YYYY-MM-DD",
  "location": "City, Region",
  "terrain": "gravel" | "bikepacking",
  "registrationUrl": "https://...",
  "raceOptions": [100, 50]
}
```
