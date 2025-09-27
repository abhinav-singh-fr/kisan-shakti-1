# Kishan Shakti Agricultural App

## Overview

Kishan Shakti is a modern agricultural IoT application designed for farmers, featuring real-time sensor monitoring, automated irrigation management, weather tracking, and voice assistance. The app supports offline functionality and multiple Indian languages, making it accessible to farmers across different regions. It combines sensor data visualization, government scheme notifications, and smart farming automation in a mobile-first design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite for fast development and building
- **UI Library**: Radix UI components with shadcn/ui design system for consistent, accessible components
- **Styling**: Tailwind CSS with custom agricultural color scheme (greens, browns, earth tones)
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Mobile-First Design**: Responsive layout with bottom navigation for mobile, sidebar for desktop

### Backend Architecture
- **Server**: Express.js with TypeScript for API endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: connect-pg-simple for PostgreSQL-backed session storage
- **Development**: Hot module replacement with Vite integration for seamless development

### Component Structure
- **Sensor Monitoring**: Real-time display of soil moisture, pH, NPK levels, flow rate, pressure, and environmental data
- **Irrigation Control**: Automated and manual pump control with scheduling and zone management
- **Weather Integration**: Local weather conditions, forecasts, and agricultural alerts
- **Voice Assistant**: Multi-language voice commands and feedback system
- **Alert System**: Critical notifications for soil conditions, weather warnings, and equipment status

### Data Storage Solutions
- **PostgreSQL Database**: Primary data storage for user accounts, sensor readings, and system configuration
- **Offline Support**: Local storage for critical data when connectivity is limited
- **Session Storage**: Secure user authentication and preference management

### Authentication and Authorization
- **User Management**: Simple username/password authentication with session-based security
- **Language Preferences**: Multi-language support (Hindi, Punjabi, Tamil, Bengali, Marathi, English)
- **Offline Access**: Cached authentication for continued app functionality without internet

## External Dependencies

### Database and Storage
- **@neondatabase/serverless**: Serverless PostgreSQL database connection for scalable data management
- **drizzle-orm**: Type-safe ORM for PostgreSQL with schema validation
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI and Design System
- **@radix-ui/***: Comprehensive set of accessible, unstyled UI primitives (dialogs, forms, navigation, etc.)
- **tailwindcss**: Utility-first CSS framework with custom agricultural color palette
- **class-variance-authority**: Component variant management for consistent styling
- **lucide-react**: Modern icon library for agricultural and IoT-related icons

### Charts and Visualization
- **recharts**: React charting library for sensor data visualization and trend analysis
- **embla-carousel-react**: Touch-friendly carousel for mobile data browsing

### Development and Build Tools
- **vite**: Fast build tool with hot module replacement for development
- **typescript**: Type safety across the entire application stack
- **@replit/vite-plugin-***: Replit-specific development enhancements

### Form Handling and Validation
- **react-hook-form**: Efficient form state management
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Runtime type validation and schema definition

### State Management and Data Fetching
- **@tanstack/react-query**: Server state management with caching, background updates, and offline support
- **wouter**: Lightweight routing solution for single-page application navigation

### Agricultural-Specific Features
- **Voice Recognition**: Web Speech API integration for hands-free operation
- **Offline Functionality**: Service worker implementation for offline sensor data access
- **Multi-language Support**: Internationalization for Indian regional languages
- **Government Integration**: API endpoints for agricultural schemes and weather alerts