# SEO Enhancement Guide

## Blog Post SEO Best Practices

When creating new blog posts, make sure to include the following frontmatter fields for optimal SEO:

### Required Fields
```yaml
---
layout: layouts/post.njk
title: "Your Post Title (50-60 characters ideal)"
description: "Your post description for meta tags (150-160 characters ideal)"
date: 2024-01-15
tags: [Engineering, Cloud, AI] # Choose relevant tags
cover: https://example.com/image.jpg # High-quality 1200x630px image
---
```

### Optional SEO Fields
```yaml
# For better organization
author: "Omar Gastón Chalas"
canonical: "https://example.com/original-post" # If reposted from elsewhere
robots: "index, follow" # Override default robots behavior if needed

# Table of Contents for better UX and SEO
toc:
  - { id: intro, text: "Introduction" }
  - { id: main-topic, text: "Main Topic" }
  - { id: conclusion, text: "Conclusion" }

# Related content (for navigation)
prevPost:
  url: /blog/previous-post/
  data:
    title: Previous Post Title
nextPost:
  url: /blog/next-post/
  data:
    title: Next Post Title
```

## SEO Guidelines

### Title Guidelines
- 50-60 characters
- Include primary keyword
- Be descriptive and compelling
- Avoid keyword stuffing

### Description Guidelines
- 150-160 characters
- Include primary keyword naturally
- Write compelling summary
- Include call-to-action when appropriate

### Image Guidelines
- Use high-quality images (minimum 1200x630px)
- Include descriptive alt text
- Optimize file sizes
- Use relevant, original images when possible

### Content Guidelines
- Use semantic HTML structure (h1, h2, h3 hierarchy)
- Include internal links to related posts
- Use meaningful anchor text for links
- Write for humans first, search engines second
- Aim for comprehensive, valuable content (1500+ words for major topics)

## Structured Data Features Included

Our blog automatically includes:
- JSON-LD structured data for articles
- Open Graph meta tags for social sharing
- Twitter Card meta tags
- Canonical URLs
- Author information
- Publication and modification dates
- Article tags and categories
- Word count and reading time
- Breadcrumb navigation
