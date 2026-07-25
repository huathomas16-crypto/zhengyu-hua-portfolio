// ============================================================
// Core types for the photographer portfolio
// ============================================================

export interface ProjectImage {
  /** Image path — use /images/projects/{slug}/ for local, or full URL for placeholders */
  src: string;
  /** Accessible alt text describing the photograph */
  alt: string;
  /** Natural width in pixels (for aspect-ratio calculation) */
  width: number;
  /** Natural height in pixels (for aspect-ratio calculation) */
  height: number;
  /** Optional caption displayed below the image */
  caption?: string;
}

export interface Project {
  /** URL-safe slug, e.g. "quiet-objects" */
  slug: string;
  /** Project title displayed on work page and detail page */
  title: string;
  /** Chinese project title */
  titleZh?: string;
  /** Year of creation (e.g. "2025" or "2025–2026") */
  year: string;
  /** Location where the work was made */
  location: string;
  /** Chinese location */
  locationZh?: string;
  /** Short project description (60–100 words) */
  description: string;
  /** Chinese project description */
  descriptionZh?: string;
  /** Cover image used in the work listing grid */
  coverImage: ProjectImage;
  /** Ordered array of images for the project detail gallery */
  images: ProjectImage[];
}

/** Layout variant for home page curated grid */
export type GridLayoutVariant =
  | 'full'             // 100% width (spans all 3 columns)
  | 'wide-left'        // 66% width, left-aligned
  | 'wide-right'       // 66% width, right-aligned
  | 'half-left'        // 33% width, left column
  | 'half-right'       // 33% width, right column
  | 'centered-small';  // 33% width, centered

/** An entry in the home page curated selection grid */
export interface CuratedEntry {
  /** Slug of the project this image belongs to */
  projectSlug: string;
  /** Index into the project's images array (0 = cover image, 1+ = detail images) */
  imageIndex: number;
  /** How this image is positioned in the home page grid */
  layout: GridLayoutVariant;
}
