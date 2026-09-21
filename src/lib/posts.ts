import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

function byDateDesc(a: BlogPost, b: BlogPost): number {
  return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
}

/**
 * All posts, newest first. Includes archived ones.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  return (await getCollection('blog')).sort(byDateDesc);
}

/**
 * Posts shown in the listings (home, category, related). Archived ones are excluded.
 */
export async function getVisiblePosts(): Promise<BlogPost[]> {
  return (await getAllPosts()).filter((post) => !post.data.archived);
}

/**
 * Archived posts, reachable only from /archive/.
 */
export async function getArchivedPosts(): Promise<BlogPost[]> {
  return (await getAllPosts()).filter((post) => post.data.archived);
}
