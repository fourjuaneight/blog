---
title: January Notes
description: "This was a solid start to the Year of Focus. I've been working hard this month on optimizing the site and cleaning up my feeds (podcast and RSS)."
date: 2020-01-31
tags:
  - monthly-notes
draft: false
---

This was a solid start to the Year of Focus. I've been working hard this month on optimizing the site and cleaning up my feeds (podcast and RSS). The latter is straightforward; I already had a task list with various items. The former was a bit harder initially, but PiHole ultimately made most of my decisions. Let me explain.

## Productivity
[PiHole](https://pi-hole.net) monitors and filters any trackers and ads at the DNS level. I use a few blocklists maintained by the community, but I recently started to manage one of my own for domains containing dynamic ad insertion on podcasts. This is becoming a common practice. And I was surprised at the amount of smaller[^1] podcasts that practice DAI—many of which I enjoy and consider making an exception for. However, I don't feel comfortable with this practice and would find similar content elsewhere. So that's what I've done, and my feed looks leaner while improving quality.

For RSS, I didn't have to unsubscribe from much. I've been working on this feed for years now, and I'm in a great spot with the amount and quality of the content. I recently switched from [Feedbin](https://feedbin.com) to [Feed Wrangler](https://feedwrangler.net) as well, though mainly to save a little on the annual subscription. Spending more time reading long-form content has helped me reduce my social media consumption; I find the content less appealing and, therefore, get off the platforms quicker, which is a nice side effect.

## Coding
As for the site, I wanted to work on backend optimizations and fixes before starting on a redesign. I like the current aesthetic and want to improve upon it. But before that, I need to make sure everything is running smoothly. Here are some nice lists of what I've done:

**Fixed**
- Redirects for broken links.
- Missing preload links for subset font files.
- Missing props validation on certain components.

**Optimized**
- [Goober](https://github.com/cristianbote/goober) for style components (smaller footprint).
- Filtering Twitter archive from the sitemap.
- Grouping posts by year in the [archive](/posts/).

**Added**
- Appearances section and links.
- [Uses](/uses/) page.
- Contact page.

These changes mean a leaner codebase and a faster site. And the few additions are to improve the UX as well.

## Digest
I'm trying to watch some older movies that have high praise but came out way before my time. I'm keeping track of my ratings at [Letterboxd](https://letterboxd.com/fourjuaneight/films/). With podcasts, I'm enjoying some of these newer one-off series that cover a specific topic. And I'm also looking to wrap up the [Remembrance of Earth's Past](https://www.goodreads.com/book/show/34569357) book series I left hanging last year.

### Watched
- [Vertigo](https://letterboxd.com/film/vertigo/): I wasn't a fan of the ending. But most of all, I wouldn't say I like the overall sexist vibe from back in the day. 
- [Doctor Sleep](https://letterboxd.com/film/doctor-sleep/): Not the best horror film I've seen --hard horror at all-- but I was still entertained throughout the 3 hours. This is more than I can say of most of the trash in the genre.
- [Foreign Correspondent](https://letterboxd.com/film/foreign-correspondent/): I liked this one far more than Vertigo, but it had the same vibe, which killed it for me. Also, The Star-Spangled Banner in the end credits was too on the nose.

### Listened
- [13 Minutes to the Moon](https://www.bbc.co.uk/programmes/w13xttx2): What a great show. Just the right amount of detail and add grandeur.
- [Sidedoor](https://www.si.edu/sidedoor): This came as a recommendation from [99% Invisible](https://99percentinvisible.org) and I've been loving every episode.
- [Up First](https://www.npr.org/podcasts/510318/up-first): I had to unsubscribe from [Today, Explained](https://www.vox.com/today-explained) because the Quip and KiwiCo ads were driving me insane. So, this filled the daily news spot perfectly with better-quality content.

### Read
- [The Dark Forest](https://www.goodreads.com/book/show/23168817): I thought this was better than the first book. If the series ended right here, I wouldn't be mad. But I can't wait to start the last book.

These three comics describe what goes through my head a lot of the time in magnificent detail. In this order:
1. [Worst Thing That Could Happen](https://xkcd.com/2261/)
2. [Anxious](http://www.kohney.com/comic/anxious/)
3. [Die](https://www.smbc-comics.com/comic/die)

[^1]: My small is separate from an extensive network. There are many "indie" podcasts with a massive following.