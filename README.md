# CoreUI Dashboard — v2.1.0

Pure React + TypeScript dashboard core. Top-bar layout (no sidebar).
Drop your projects in as pages via the router.

---

## Stack

| Concern | Tool |
|---|---|
| UI | React 18 + TypeScript (strict) |
| Styling | Tailwind CSS (logical properties for RTL) |
| i18n | i18next + i18next-http-backend |
| Mock API | json-server |
| Routing | React Router v6 |
| Linting | ESLint + eslint-plugin-react-hooks |

---

## Quick start

```bash
npm install
npm run dev
```

This runs both Vite (port 5173) and json-server (port 3001) via `concurrently`.

Vite proxies `/api/*` → `http://localhost:3001/*`.

---

## Run json-server only

```bash
npm run api
# or directly:
npx json-server --watch mock-db/db.json --port 3001 --routes mock-db/routes.json
```

Available endpoints:
- `GET /api/menus` — navigation structure
- `GET /api/translations/en` — English i18n
- `GET /api/translations/fa` — Persian i18n
- `GET /api/settings` — app config

---

## Add your project as a new page

### 1. Create your page component

```
src/pages/YourProject/YourProjectPage.tsx
```

```tsx
import { useTranslation } from 'react-i18next'

export function YourProjectPage() {
  const { t } = useTranslation('yourProject')
  return (
    <div className="p-5">
      <h1 className="text-xl font-semibold">{t('title')}</h1>
      {/* your content */}
    </div>
  )
}
```

### 2. Register the route

In `src/app/router.tsx`, inside the `<DashboardLayout>` Route:

```tsx
import { YourProjectPage } from '@/pages/YourProject/YourProjectPage'

// Add:
<Route path="/your-project" element={<YourProjectPage />} />
```

### 3. Add a menu item

In `mock-db/db.json`, under `menus[0].items`:

```json
{
  "id": "your-project",
  "labelKey": "yourProject",
  "icon": "ti-folder",
  "route": "/your-project",
  "permission": "view:your-project"
}
```

### 4. Add translation keys

`public/locales/en/nav.json`:
```json
{ "yourProject": "Your Project" }
```

`public/locales/fa/nav.json`:
```json
{ "yourProject": "پروژه شما" }
```

### 5. Add your project's data endpoint

In `mock-db/db.json`, add a top-level key:
```json
{
  "your-project-data": [ ... ]
}
```

Fetch it in your page:
```tsx
// src/services/your-project.service.ts
import { apiService } from '@/services/api.service'
export const fetchYourData = () => apiService.get('/your-project-data')
```

---

## RTL/LTR behaviour

Click the FA button in the top bar. The entire layout flips:
- `html[dir]` switches to `rtl`
- `html[lang]` switches to `fa`
- Tailwind logical properties (`ps-`, `pe-`, `ms-`, `me-`) auto-invert
- Font switches to Vazirmatn
- All translations reload from json-server

**Rule:** Never use `pl-`/`pr-` (physical) Tailwind classes. Always use `ps-`/`pe-` (logical).

---

## CSP compliance

- No `eval()`, no `new Function()` — enforced by ESLint
- No `dangerouslySetInnerHTML` — enforced by ESLint rule `react/no-danger`
- No hardcoded inline event handlers in HTML
- Icon names from API are whitelisted in `menu.service.ts`
- All API responses typed with TypeScript — no `any`
- For production: move the `<meta>` CSP to an HTTP header in nginx/express with a per-request nonce

---

## Project structure

```
src/
├── app/
│   ├── providers.tsx       # All context providers + Suspense + ErrorBoundary
│   └── router.tsx          # ← ADD YOUR ROUTES HERE
├── components/
│   ├── primitives/
│   │   ├── Button/
│   │   ├── Badge/
│   │   └── ErrorBoundary/
│   └── features/
│       ├── TopBar/         # Unified top nav bar
│       ├── LanguageSwitcher/
│       └── UserMenu/
├── config/
│   └── i18n.ts             # i18next bootstrap
├── context/
│   └── AppContext.tsx       # lang, dir, setLang
├── hooks/
│   ├── useDirection.ts     # Syncs html[dir/lang]
│   └── useMenu.ts          # Fetches menu from json-server
├── layouts/
│   └── DashboardLayout.tsx # Shell: TopBar + <Outlet />
├── pages/
│   └── Home/
│       └── HomePage.tsx    # Empty core — replace with your content
├── services/
│   ├── api.service.ts      # Typed fetch wrapper
│   └── menu.service.ts     # Menu fetch + icon sanitization
├── types/
│   └── app.types.ts        # Lang, Dir, constants
└── styles/
    └── globals.css
mock-db/
├── db.json                 # All data (translations, menus, settings)
└── routes.json             # URL mappings
public/
└── locales/
    ├── en/                 # Fallback locale files (also served by json-server)
    └── fa/
```
# dashboard-core
# xatran-dashboard
