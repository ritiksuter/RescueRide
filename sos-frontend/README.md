# SOS Frontend 🚨

**SOS Frontend** is a React + Vite single-page application that provides the user, mechanic, and admin interfaces for the SOS Vehicle system. It uses Leaflet for mapping, Socket.IO for realtime updates, TailwindCSS for styling, and integrates with the backend services via an API gateway.

---

## 🚀 Quick start

Requirements:

- Node.js 18+ (Node 20 recommended)
- npm (or pnpm/yarn if you prefer)

Install dependencies:

```bash
npm install
```

Run in development (Vite dev server):

```bash
npm run dev
# opens at http://localhost:5173 by default
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Lint the code:

```bash
npm run lint
```

---

## 🧰 Scripts

- `dev` - start Vite dev server
- `build` - build production bundle (output: `dist`)
- `preview` - preview production build
- `lint` - run ESLint across `.js`/`.jsx` files

---

## ⚙️ Environment variables

The app expects Vite-style environment variables in a `.env` file (or provided to the container):

```
VITE_API_BASE_URL=http://localhost:8000
VITE_SOCKET_URL=http://localhost:9007
VITE_MAP_DEFAULT_LAT=12.9716
VITE_MAP_DEFAULT_LNG=77.5946
VITE_MAP_DEFAULT_ZOOM=13
VITE_APP_NAME=SOS Vehicle
```

These are used in `src/config/env.js` to configure API base URL, socket URL and default map settings.

---

## 🐳 Docker

A Dockerfile is provided to build a static production image served by Nginx.

Build and run locally:

```bash
# build
docker build -t sos-frontend:latest .

# run (maps container port 80 to host 3000 in examples)
docker run -p 3000:80 sos-frontend:latest
```

A `docker-compose.yml` in the repo root also provisions backend services and the frontend. When using compose, frontend is served on port `3000` and depends on the API gateway service.

---

## 🧭 Main Technologies

- React 18
- Vite
- TailwindCSS + PostCSS
- Leaflet + react-leaflet (maps)
- Socket.IO client (realtime)
- Axios (HTTP client)
- Zustand (lightweight state)

---

## 📁 Project structure

A simplified tree of important folders/files:

```
src/
├─ api/            # API wrappers (auth, user, sos, tracking, etc.)
├─ components/     # Reusable UI components
├─ config/         # env.js (reads VITE_* variables), routes config
├─ context/        # React context providers (Auth, Socket, Sos, Toast)
├─ hooks/          # Custom hooks (useAuth, useSos, useSocket, useTracking)
├─ layout/         # Page layouts and navigation components
├─ map/            # Map components & markers
├─ pages/          # App pages (user, mechanic, admin, auth)
├─ router/         # App router setup
├─ socket/         # socket event handlers and client
└─ styles/         # Tailwind and global styles
```

---

## ✅ Notes & tips

- The app uses Vite aliasing (see `vite.config.js`) for convenient imports. Example aliases:
  - `@components`, `@api`, `@hooks`, `@map`, etc.
- Ensure backend services (API gateway and notification/socket service) are running for full functionality (auth, realtime SOS/tracking updates).
- Map behaviour and default location are controlled by `VITE_MAP_DEFAULT_*` variables.

---

## 🛠️ Contributing

- Follow existing code style (ESLint + Tailwind utilities)
- Add tests in the `tests/` folder for critical logic
- Open a PR with a brief description and a link to an issue when relevant

---

## 📄 License

This project follows the license defined at the repository root. If none exists, add one (e.g., MIT) before sharing publicly.

---

If you'd like, I can also add a short `CONTRIBUTING.md` or a `DEVELOPMENT.md` with more detailed local dev workflows (e.g., testing, pre-commit hooks, / husky) — tell me which you'd prefer.
