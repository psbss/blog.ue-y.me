/**
 * Format date string "YYYY-MM-DD" to "YYYY.MM.DD"
 */
export function formatDate(dateStr: string): string {
  return dateStr.replace(/-/g, '.');
}

/**
 * Extract slug from content collection entry id.
 * e.g. "42tokyo/index.md" -> "42tokyo", "42tokyo" -> "42tokyo"
 */
export function getSlug(id: string): string {
  return id.replace(/\/index\.md$/, '').replace(/\.md$/, '');
}
