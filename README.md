# Vesa.exe — Birthday Website

A responsive React + Vite + TypeScript birthday microsite with a dark-luxury purple/black theme, animated intro, developer-themed details, a personal note, memory gallery and final wish interaction.

## Run locally

Requirements: Node.js 20+

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Add your photos

Put three photos in `public/photos/` with these exact names:

- `memory-1.jpg`
- `memory-2.jpg`
- `memory-3.jpg`

The gallery uses these paths. If a photo is missing, a designed placeholder appears instead. You can use `.png` or `.webp` too, but then update the `src` values in `src/App.tsx`.

To change captions, dates, or the birthday message, edit the `photos` array and the `message-copy` paragraphs in `src/App.tsx`.

## Build for production

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy and share the generated URL.

No environment variables are required.

## Personalization note

The current note is intentionally warm and friendly, without implying romantic expectations. Adjust it if you want it to sound more like your own voice.
