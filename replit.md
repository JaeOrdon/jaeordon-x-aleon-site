# Jae Ordon - Official Artist Website

## Overview

This is the official website for musician **Jae Ordon** (aka "Mascot's Distance"), a Folk-Jazz-Rock fusion artist. The site serves as a promotional platform featuring music releases, an artist bio, visual diary/art gallery, embedded YouTube videos, a Mailchimp newsletter signup, and a merch page (currently a "coming soon" placeholder). The application follows a full-stack architecture with a React frontend and Express backend, backed by a PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router) with three main pages: Home (`/`), About (`/about`), and Merch (`/merch`)
- **Styling**: Tailwind CSS v4 with CSS variables for theming, using a dark theme with accent colors. Shadcn/ui component library (new-york style) provides the UI primitives.
- **Animations**: Framer Motion for page transitions, scroll-triggered animations, and interactive elements. A custom cursor effect is implemented for desktop.
- **State Management**: TanStack React Query for server state (fetching releases from the API)
- **Build Tool**: Vite with path aliases (`@/` → `client/src/`, `@shared/` → `shared/`, `@assets/` → `attached_assets/`)
- **Fonts**: Google Fonts - Inter (sans-serif) and Playfair Display (serif)
- **Key UI Features**: Preloader animation, grain texture overlay, marquee ticker, glassmorphism navbar, grayscale-to-color hover effects on images

### Backend
- **Framework**: Express.js running on Node with TypeScript (tsx for dev, esbuild for production)
- **API Pattern**: RESTful JSON API under `/api/` prefix with CRUD operations for releases
- **Static Assets**: The `attached_assets/` directory is served at `/assets` for artist images and content
- **Dev Server**: Vite middleware is integrated into Express during development for HMR
- **Production**: Client is built to `dist/public/` and served as static files with SPA fallback

### Database
- **Database**: PostgreSQL (required via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema validation
- **Schema** (`shared/schema.ts`):
  - `users` table: `id` (UUID, auto-generated), `username` (unique text), `password` (text)
  - `releases` table: `id` (serial), `title`, `type`, `imageUrl`, `link`, `platform` (all text), `sortOrder` (integer, default 0)
- **Migrations**: Managed via `drizzle-kit push` (`npm run db:push`)
- **Connection**: Uses `pg.Pool` with the `DATABASE_URL` connection string

### Database Connection
- **File**: `server/db.ts` - Creates a `pg.Pool` connection using `DATABASE_URL` and wraps it with Drizzle ORM

### Storage Layer
- **Pattern**: Repository pattern via `IStorage` interface in `server/storage.ts`
- **Implementation**: `DatabaseStorage` class wraps Drizzle queries for users and releases
- **Exported as**: `storage` singleton used by route handlers

### API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/releases` | List all releases (ordered by sortOrder) |
| GET | `/api/releases/:id` | Get single release |
| POST | `/api/releases` | Create a release |
| PATCH | `/api/releases/:id` | Update a release |
| DELETE | `/api/releases/:id` | Delete a release |

### Page Structure
- **Home**: Hero section (with background image linking to Bandcamp), YouTube video embed (auto-plays muted on scroll), Bio section with stats, Music/Releases grid (fetched from API), Mailchimp newsletter form
- **About**: Extended bio with artist photos, visual diary/art gallery, critic reviews section
- **Merch**: Coming soon placeholder page

### Key Scripts
- `npm run dev` - Start development server with Vite HMR
- `npm run build` - Build client (Vite) and server (esbuild) for production
- `npm start` - Run production build
- `npm run db:push` - Push schema changes to database

## External Dependencies

### Third-Party Services
- **Mailchimp**: Email newsletter signup form embedded directly in the Newsletter component. Uses Mailchimp's hosted form action URL (`jaeordon.us16.list-manage.com`) and their `mc-validate.js` script. The Mailchimp tracking script is also loaded in `index.html`.
- **YouTube**: Embedded video player for the "Madman's Warehouse" music video (iframe embed)
- **Spotify**: Links to artist profile and individual tracks
- **SoundCloud**: Links to playlists
- **Bandcamp**: Links to artist page and tracks
- **Apple Music**: Links to artist profile
- **Google Fonts**: Inter and Playfair Display font families

### Database
- **PostgreSQL**: Required. Connection via `DATABASE_URL` environment variable. Uses `pg` (node-postgres) driver with Drizzle ORM.

### Key NPM Dependencies
- **UI**: `@radix-ui/*` primitives, `shadcn/ui` components, `framer-motion`, `embla-carousel-react`, `cmdk`, `vaul`
- **Data**: `@tanstack/react-query`, `drizzle-orm`, `drizzle-zod`, `zod`
- **Server**: `express`, `connect-pg-simple`, `pg`
- **Replit-specific**: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`