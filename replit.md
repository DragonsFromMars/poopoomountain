# Poo Poo Mountain - Email Signup Application

## Overview

This is a full-stack TypeScript application for collecting email signups for the "Poo Poo Mountain" card game. It features a React frontend with shadcn/ui components and an Express backend with PostgreSQL database support via Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom theming
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Ready for PostgreSQL sessions via connect-pg-simple
- **Development**: Hot reload with tsx

## Key Components

### Database Schema
- **emails table**: Stores email subscriptions with source tracking
  - id (serial primary key)
  - email (text, not null)
  - source (text, not null) - tracks which form submitted the email
  - createdAt (timestamp, default now)
- **users table**: Basic user structure (unused in current implementation)
  - id (serial primary key)
  - username (text, unique)
  - password (text)

### API Endpoints
- `POST /api/subscribe`: Email subscription with duplicate prevention
- `GET /api/emails`: Retrieve all emails (admin endpoint)

### Storage Layer
- **Interface**: IStorage defines contract for data operations
- **Implementation**: MemStorage (in-memory) for development
- **Production Ready**: Designed for easy PostgreSQL integration

### UI Components
- Custom themed shadcn/ui components
- Toast notifications for user feedback
- Form validation with error handling
- Responsive design with mobile support

## Data Flow

1. User submits email through form component
2. Frontend validates input using Zod schema
3. TanStack Query mutation sends POST request to API
4. Backend validates data and checks for duplicates
5. Email stored in database with source tracking
6. Success/error response sent to frontend
7. Toast notification shows user feedback

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **Build & Dev Tools**: Vite, TypeScript, ESBuild
- **Database**: Drizzle ORM, Neon Database serverless driver
- **UI & Styling**: Tailwind CSS, Radix UI components, Lucide icons
- **Utilities**: Zod validation, date-fns, clsx/tailwind-merge

### Development Dependencies
- **Replit Integration**: Vite plugins for development experience
- **Type Safety**: TypeScript with strict mode enabled
- **Code Quality**: ESLint and Prettier configurations implied

## Deployment Strategy

### Build Process
- Frontend: Vite builds React app to `dist/public`
- Backend: ESBuild bundles server code to `dist/index.js`
- Database: Drizzle migrations in `migrations/` directory

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment detection (development/production)
- Database migrations managed via `drizzle-kit push` command

### Production Considerations
- Server serves static files in production
- Database connection pooling via Neon serverless
- Error handling with proper HTTP status codes
- CORS and security headers ready for implementation

### Development Workflow
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build
- `npm run start`: Production server
- `npm run db:push`: Apply database schema changes

## Architecture Decisions

### Database Choice
- **Chosen**: PostgreSQL via Neon Database
- **Rationale**: Reliable, scalable, and serverless for easy deployment
- **Alternative**: SQLite considered but PostgreSQL chosen for production scalability

### ORM Selection
- **Chosen**: Drizzle ORM
- **Rationale**: Type-safe, minimal overhead, great TypeScript integration
- **Alternative**: Prisma considered but Drizzle preferred for performance

### UI Framework
- **Chosen**: shadcn/ui with Radix UI primitives
- **Rationale**: Accessible, customizable, modern design system
- **Alternative**: Material-UI considered but shadcn/ui preferred for customization

### State Management
- **Chosen**: TanStack Query for server state
- **Rationale**: Excellent caching, background updates, error handling
- **Alternative**: Native fetch considered but TanStack Query preferred for UX