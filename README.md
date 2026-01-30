# Earth Observation Platform

A professional futuristic Earth observation platform that unifies satellite data from Sentinel, Landsat, and ISRO into a single intelligent system.

## Features

- Real-time satellite orbital visualization with glowing digital Earth
- Live data feed showing satellite acquisitions
- Multi-stage processing pipeline (Data Ingestion, Standardization, AI/ML Fusion, Cloud Processing)
- Real-world impact metrics for agriculture, disaster response, climate monitoring, and smart cities
- Professional space analytics lab aesthetic with responsive design

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Environment Variables

The following environment variables are required for Supabase integration:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Netlify Deployment

1. Push your code to GitHub, GitLab, or Bitbucket
2. Connect your repository to Netlify
3. Set environment variables in Netlify dashboard:
   - Go to Site Settings → Build & Deploy → Environment
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. Netlify will automatically build and deploy on push

The `netlify.toml` file handles build configuration, redirects, and security headers.

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Supabase
- Lucide React Icons
