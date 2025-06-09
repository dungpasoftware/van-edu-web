# VanEdu Admin Dashboard

A professional, responsive admin dashboard for the VanEdu online course platform built with Next.js, TypeScript, and shadcn/ui.

## Features

✅ **Authentication & Authorization**
- Mock authentication (admin@vanedu.com / admin123)
- Route protection with auth guards
- User session management

✅ **Internationalization (i18n)**
- Support for English and Vietnamese
- Language switcher in navigation
- Complete translations for all UI elements

✅ **Theme Support**
- Dark mode and Light mode toggle
- System theme detection
- Persistent theme preferences

✅ **Dashboard Pages**
- **Dashboard**: Overview with stats cards and user growth chart
- **Users**: User management with table, search, and CRUD operations
- **Categories**: Category management (API ready)
- **Courses**: Course management (API ready)
- **Media**: Media library management (API ready)
- **Payments**: Subscription plans and pending payments management
- **Settings**: Theme and language preferences

✅ **UI/UX Features**
- Responsive design (mobile-friendly)
- Loading skeletons for better UX
- Toast notifications for user feedback
- Confirm dialogs for destructive actions
- Professional sidebar and navbar
- Clean, modern interface with shadcn/ui

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod (ready for implementation)
- **State Management**: React Context
- **Internationalization**: react-i18next
- **Theme**: next-themes
- **Notifications**: Sonner

## Project Structure

```
van-edu-web/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx           # Login page
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # Dashboard overview
│   │   │   ├── users/
│   │   │   │   └── page.tsx          # Users management
│   │   │   ├── categories/
│   │   │   ├── courses/
│   │   │   ├── media/
│   │   │   ├── payments/
│   │   │   │   └── page.tsx          # Payments management
│   │   │   └── settings/
│   │   │   └── page.tsx          # Settings page
│   │   ├── api/
│   │   │   ├── users/                # Users API endpoints
│   │   │   ├── categories/           # Categories API endpoints
│   │   │   ├── courses/              # Courses API endpoints
│   │   │   ├── media/                # Media API endpoints
│   │   │   ├── payments/             # Payments API endpoints
│   │   │   └── subscriptions/        # Subscription plans API
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout with providers
│   │   └── page.tsx                  # Home page (redirects)
│   ├── components/
│   │   ├── auth/
│   │   │   └── route-guard.tsx       # Protected route component
│   │   ├── layout/
│   │   │   ├── dashboard-layout.tsx  # Main dashboard layout
│   │   │   ├── navbar.tsx            # Navigation bar
│   │   │   └── sidebar.tsx           # Sidebar navigation
│   │   ├── providers/
│   │   │   ├── auth-provider.tsx     # Authentication context
│   │   │   ├── i18n-provider.tsx     # Internationalization context
│   │   │   └── theme-provider.tsx    # Theme context
│   │   └── ui/                       # shadcn/ui components
│   ├── lib/
│   │   ├── i18n/
│   │   │   └── config.ts             # i18n configuration
│   │   └── utils.ts                  # Utility functions
│   ├── public/
│   │   └── locales/
│   │       ├── en/
│   │       │   └── common.json       # English translations
│   │       └── vi/
│   │           └── common.json       # Vietnamese translations
│   ├── types/
│   │   └── index.ts                  # TypeScript type definitions
│   └── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Login Credentials

```
Email: admin@vanedu.com
Password: admin123
```

## API Endpoints

The application includes mock API endpoints that can be easily replaced with real backend APIs:

### Users API
- `GET /api/users` - Get users with pagination and filters
- `POST /api/users` - Create new user
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Categories API
- `GET /api/categories` - Get categories
- `POST /api/categories` - Create category

### Payments API
- `GET /api/payments` - Get payments (with status filter)
- `PUT /api/payments/[id]` - Update payment status

### Subscriptions API
- `GET /api/subscriptions` - Get subscription plans
- `POST /api/subscriptions` - Create subscription plan

## Internationalization

The application supports English and Vietnamese languages. All text content is externalized to translation files:

- `public/locales/en/common.json` - English translations
- `public/locales/vi/common.json` - Vietnamese translations

## Customization

### Adding New Languages

1. Create a new locale file in `public/locales/[lang]/common.json`
2. Add the language to the i18n configuration in `lib/i18n/config.ts`
3. Update the language switcher in the navbar

### Replacing Mock APIs

1. Update the API endpoints in the `app/api/` directory
2. Connect to your backend API by replacing the mock data with real API calls
3. Update the TypeScript types in `types/index.ts` as needed

### Theme Customization

The application uses Tailwind CSS with shadcn/ui components. You can customize the theme by:

1. Modifying the CSS variables in `app/globals.css`
2. Updating the Tailwind configuration
3. Customizing shadcn/ui component styles

## Features to Implement

The following features are ready for implementation:

- [ ] Complete CRUD operations for all entities
- [ ] File upload functionality for courses and media
- [ ] Advanced search and filtering
- [ ] Bulk operations
- [ ] Email notifications
- [ ] Analytics and reporting
- [ ] User role management
- [ ] Settings management
- [ ] Data export functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and demonstration purposes.

---

**Note**: This is a demo application with mock data. In a production environment, you would replace the mock APIs with real backend services and implement proper authentication, authorization, and data validation.
