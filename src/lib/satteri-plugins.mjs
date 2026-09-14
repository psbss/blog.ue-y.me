import { defineMdastPlugin, defineHastPlugin } from 'satteri';

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));

// Preserve the Markdown extensions used by the Gatsby articles.
export const legacyMarkdown = defineMdastPlugin({
  name: 'legacy-markdown',
  code(node, ctx) {
    if (node.lang?.includes(':title=')) {
      const [language, ...title] = node.lang.split(':title=');
      ctx.replaceNode(node, [
        { type: 'html', value: `<div class="gatsby-code-title">${escapeHtml(title.join(':title='))}</div>` },
        { ...node, lang: language },
      ]);
    }
  },
  paragraph(node, ctx) {
    if (node.children.length !== 1) return;
    const child = node.children[0];
    if (child.type !== 'inlineCode' || !child.value.startsWith('youtube:')) return;
    const url = new URL(child.value.slice('youtube:'.length));
    if (url.protocol === 'https:' && ['www.youtube.com', 'youtube.com'].includes(url.hostname)) {
      ctx.replaceNode(node, { type: 'html', value: `<div class="video-embed"><iframe src="${escapeHtml(url.href)}" width="650" height="365" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>` });
    }
  },
});

// Declare the real rendered width of article images so the browser picks a
// candidate from srcset that fits the 722px content column, not the viewport.
// Astro only fills in a default `sizes` when the property is absent.
export const imageSizes = defineHastPlugin({
  name: 'image-sizes',
  element: {
    filter: ['img'],
    visit(node, ctx) {
      const src = node.properties?.src;
      if (typeof src !== 'string' || !src.startsWith('.')) return;
      if (node.properties?.sizes) return;
      ctx.setProperty(node, 'sizes', '(min-width: 951px) 722px, calc(100vw - 40px)');
    },
  },
});

// Open external links in a new tab (formerly rehype-external-links).
export const externalLinks = defineHastPlugin({
  name: 'external-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const href = node.properties?.href;
      if (typeof href === 'string' && /^https?:\/\//.test(href)) {
        ctx.setProperty(node, 'target', '_blank');
        ctx.setProperty(node, 'rel', ['nofollow', 'noopener', 'noreferrer']);
      }
    },
  },
});
