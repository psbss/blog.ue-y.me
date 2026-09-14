const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));

// Preserve the Markdown extensions used by the Gatsby articles.
export default function legacyMarkdown() {
  return (tree) => {
    function walk(parent) {
      if (!parent.children) return;
      parent.children = parent.children.flatMap((node) => {
        if (node.type === 'code' && node.lang?.includes(':title=')) {
          const [language, ...title] = node.lang.split(':title=');
          node.lang = language;
          return [{ type: 'html', value: `<div class="gatsby-code-title">${escapeHtml(title.join(':title='))}</div>` }, node];
        }
        if (node.type === 'paragraph' && node.children.length === 1) {
          const child = node.children[0];
          if (child.type === 'inlineCode' && child.value.startsWith('youtube:')) {
            const url = new URL(child.value.slice('youtube:'.length));
            if (url.protocol === 'https:' && ['www.youtube.com', 'youtube.com'].includes(url.hostname)) {
              return [{ type: 'html', value: `<div class="video-embed"><iframe src="${escapeHtml(url.href)}" width="650" height="365" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>` }];
            }
          }
        }
        walk(node);
        return [node];
      });
    }
    walk(tree);
  };
}
