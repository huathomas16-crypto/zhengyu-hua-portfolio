# Zhengyu Hua — Photography Portfolio

A minimalist photographer portfolio website. Quiet, image-led, with the visual
rhythm of a photo book.

Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To create a production build:

```bash
npm run build
npm start
```

---

## How to Replace Photography Images

All image paths are centralized in **`src/lib/projects.ts`**.

Each image object looks like this:

```ts
{
  src: 'https://picsum.photos/seed/quiet-01/1600/1067',
  alt: 'Folded linen on a windowsill',
  width: 1600,
  height: 1067,
  caption: 'Morning light, studio', // optional
}
```

### Step-by-step

1. **Add your images** to `public/images/projects/{project-slug}/`.
   For example: `public/images/projects/quiet-objects/01.jpg`.

2. **Update the `src` field** in `src/lib/projects.ts`:
   ```ts
   src: '/images/projects/quiet-objects/01.jpg',
   ```

3. **Update `width` and `height`** to match your actual image dimensions
   (this preserves the correct aspect ratio and prevents layout shift).

4. **Update `alt` text** for accessibility.

5. **Update `caption`** (or remove it) as needed.

### About page photo

Replace the `ABOUT_PHOTO` object in **`src/app/about/page.tsx`**:

```ts
const ABOUT_PHOTO = {
  src: '/images/about/portrait.jpg',
  alt: 'Your name — photographer portrait',
  width: 800,
  height: 1000,
};
```

---

## How to Add a New Photography Project

### 1. Create the project folder

```
public/images/projects/{new-project-slug}/
├── cover.jpg
├── 01.jpg
├── 02.jpg
├── ...
```

### 2. Add project data

In **`src/lib/projects.ts`**, add a new object to the `projects` array:

```ts
{
  slug: 'new-project-slug',
  title: 'New Project Title',
  year: 2026,
  location: 'City, Country',
  description: 'A 60–100 word description of the project...',
  coverImage: {
    src: '/images/projects/new-project-slug/cover.jpg',
    alt: 'Description of cover image',
    width: 1200,
    height: 900,
  },
  images: [
    {
      src: '/images/projects/new-project-slug/01.jpg',
      alt: 'Description',
      width: 1600,
      height: 1067,
      caption: 'Optional caption',
    },
    // ... more images
  ],
},
```

### 3. Feature it on the home page

Add entries to the `curatedEntries` array to include images from your
new project on the home page grid:

```ts
{ projectSlug: 'new-project-slug', imageIndex: 0, layout: 'full' },
{ projectSlug: 'new-project-slug', imageIndex: 1, layout: 'wide-left' },
```

Available layouts: `full`, `wide-left`, `wide-right`, `half-left`,
`half-right`, `centered-small`.

---

## How to Modify Fonts, Spacing, and Colors

### Fonts

Fonts are configured in **`src/app/layout.tsx`** via `next/font/google`.
To change the font:

```ts
// Example: swap Inter for Instrument Sans
import { Instrument_Sans } from 'next/font/google';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',  // keep the CSS variable name
  display: 'swap',
});
```

Then update `fontFamily` in **`tailwind.config.ts`**.

### Colors

Edit the color palette in **`tailwind.config.ts`**:

```ts
colors: {
  background: '#f5f2ed',   // page background
  foreground: '#1a1a1a',   // main text
  muted: '#8c8c8c',        // secondary text
  border: '#e5e0d8',       // divider lines
},
```

### Spacing

Key spacing values in **`tailwind.config.ts`**:

```ts
spacing: {
  section: '6rem',   // vertical padding for page sections
},
```

### Typography scale

Body text uses `text-sm` (mobile) / `text-base` (desktop) with
`font-light` (weight 300). Headings use `text-2xl` to `text-3xl`
with `font-light` and `tracking-wide`.

Adjust these in individual page and component files.

---

## Site Structure

```
/                  Home — curated photo grid
/work              Project listing
/work/quiet-objects  Project detail (example)
/about             Photographer bio
/contact           Email, Instagram, location
```

---

## Design Notes

- No shadows, gradients, rounded corners, or card containers
- Images float directly on the warm off-white background
- All transitions are slow and subtle (< 2% hover scale, 600–800ms fades)
- Font weight 300 (light) is the default; nothing is bold
- The aesthetic references Japanese photo books, European gallery sites,
  and independent art publications

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Inter (Google Fonts) | Typography |
| IntersectionObserver | Scroll-triggered fade-in |
| Native `<img>` loading="lazy" | Lazy loading |
