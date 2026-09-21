# Blog
This is uetyo's Tech and Life blog.

## Build and start development server
1. `mise install`
2. `pnpm install`
3. `pnpm dev`

## Archive
Set `archived: true` in a post's frontmatter to drop it from the top page, the
category pages, the related posts and the sitemap. The post keeps its own URL
and is linked from `/archive/`, which groups archived posts by year.

```yaml
---
title: "..."
date: "2024-09-04"
category: "other"
archived: true
---
```

## Note
This blog design was created by [catnose’s blog](https://github.com/catnose99/CatKnows), which is published under the MIT License.
