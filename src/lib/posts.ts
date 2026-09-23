import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'posts'> | CollectionEntry<'archive'>;

function byDateDesc(a: BlogPost, b: BlogPost): number {
  return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
}

/**
 * Posts shown in the listings (home, category, related).
 */
export async function getVisiblePosts(): Promise<BlogPost[]> {
  return (await getCollection('posts')).sort(byDateDesc);
}

/**
 * Archived posts, reachable only from /archive/.
 */
export async function getArchivedPosts(): Promise<BlogPost[]> {
  return (await getCollection('archive')).sort(byDateDesc);
}

/**
 * All posts, newest first. Includes archived ones.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  return [...(await getVisiblePosts()), ...(await getArchivedPosts())].sort(byDateDesc);
}

/**
 * Whether a post lives in the archive collection.
 */
export function isArchived(post: BlogPost): boolean {
  return post.collection === 'archive';
}
