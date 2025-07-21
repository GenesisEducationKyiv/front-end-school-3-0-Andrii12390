# 🎵 Music Player

Web application for managing and playing music tracks with a modern and intuitive interface.

## ✨ Features

- 🎶 **Track Management**: Create, edit and delete tracks, manage audio files
- 🎧 **Audio Player**: Convenient and stylized player with basic functionality for control
- 🔍 **Search & Filters**: Find tracks by title, artist, or genre
- 📱 **Responsive Design**: Fully responsive application that works correctly on devices with any screen size

## How to Run

### ⚠️ Important!

**First, you need to start the backend server on `http://localhost:8000`**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd music_player
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🛠️ Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **TailwindCSS 4**
- **Shadcn**
- **TanStack Query + Zustand**

## 🧪 Testing

Core functionality is covered by **E2E**, **component** and **integration** tests

## 🏗️ Building setup and optimization

### 1. Analyze bundle size

before optimization

| Files    | Size       |
| -------- | ---------- |
| index.js | **685 KB** |

After

| Files    | Size       |
| -------- | ---------- |
| index.js | **567 KB** |

bundle still quite large, but for SPA it's ok

### 2. Code splitting & lazy loading

| Component             | Method                                                      | Place                                     |
| --------------------- | ----------------------------------------------------------- | ----------------------------------------- |
| **TrackFileDialog**   | `lazy(() => import('./TrackFileDialog'))`                   | `components/tracks/item/TrackActions.tsx` |
| **TrackDeleteDialog** | `lazy(() => import('./TrackDeleteDialog'))`                 | `components/tracks/item/TrackItem.tsx`    |
| **EditTrackForm**     | `lazy(() => import('@/components/forms/EditTrackForm'))`    | `components/tracks/list/TracksList.tsx`   |
| **CreateTrackForm**   | `lazy(() => import('@/components/forms/CreateTrackForm'))`  | `components/tracks/toolbar/Toolbar.tsx.`  |
| **AudioPlayer**       | `lazy(() => import('@/components/player'))`                 | `pages/Tracks.tsx.`                       |
| **Filters**           | `lazy(() => import('@/components/tracks/toolbar/Filters'))` | `components/tracks/toolbar/Toolbar.tsx.`  |

Chunks appear on‑demand, reducing initial load.

### 3. Tree shaking

Vite’s production build tree‑shakes unused ESM exports out of the box.

### 4. Source maps

Enabled via `vite.config.ts`:

```ts
export default defineConfig({
  build: { sourcemap: true },
});
```
