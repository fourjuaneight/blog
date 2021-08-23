---
title: January Notes
date: 2020-01-31
tags:
  - monthly-notes
draft: false
---

This was a solid start to the Year of Focus. I've been working hard on two things this month: optimizations to the site and cleaning up my feeds (podcast and RSS). The latter is relatively straightforward; I already had a task list with various items. The former was a bit harder at first, but PiHole ultimately made most of the decisions for me. Let me explain.

## Productivity
[PiHole](https://pi-hole.net) monitors and filters any trackers and ads at the DNS level. I use a few blacklists maintained by the community, but recently started to manage one of my own for domains containing dynamic ad insertion on podcasts. This is becoming a bit of a common practice, unfortunately. And I was surprised at the amount of smaller[^1] podcasts that practice DAI. Many of which I really enjoy and considered making an exception for. But I simply don't feel comfortable with this practice and would rather find similar content elsewhere. So that's what I've done and my feed is looking leaner while improving quality.

For RSS, I didn't have to unsubscribe from much. I've been working on this feed for years now and feel like I'm in a great spot with the amount and quality of the content. I recently switched from [Feedbin](https://feedbin.com) to [Feed Wrangler](https://feedwrangler.net) as well, though mostly to save a little on the annual subscription. Spending more time reading long-form content has helped me reduced my social media consumption; I find the content less appealing and therefore get off the platforms quicker, which is a nice side effect.

## Coding
As for the site, I wanted to work on backend optimizations and fixes before starting on a redesign. I like the current aesthetic and want to improve upon it. But before that, I need to make sure everything is running smoothly. Here are some nice lists of what I've done:

**Fixed**
- Redirects for broken links.
- Missing preloads links for subset font files.
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
I'm trying to watch some older movies that have high praise but came out way before my time. I'm keeping track of my ratings over at [Letterboxd](https://letterboxd.com/fourjuaneight/films/). With podcasts, I'm enjoying some of these newer one-off series that cover a specific topic. And I'm also looking to wrap up the [Remembrance of Earth's Past](https://www.goodreads.com/book/show/34569357) book series I left hanging last year.

### Watched
- [Vertigo](https://letterboxd.com/film/vertigo/): I wasn't a fan of the ending. But most of all, I really dislike the overall sexist vibe from back in the day. 
- [Doctor Sleep](https://letterboxd.com/film/doctor-sleep/): Not the best horror film I've seen --hard horror at all-- but I was still entertained throughout the 3 hours. This is more than I can say of most of the trash that comes out in the genre.
- [Foreign Correspondent](https://letterboxd.com/film/foreign-correspondent/): I liked this one far more than Vertigo, but had the same vibe which killed it for me. Also, I thought The Star-Spangled Banner in the end credits was a bit too on the nose.

### Listened
- [13 Minutes to the Moon](https://www.bbc.co.uk/programmes/w13xttx2): What a great show. Just the right amount of detail and add grandeur.
- [Sidedoor](https://www.si.edu/sidedoor): This came as a recommendation from [99% Invisible](https://99percentinvisible.org) and I've been loving every episode.
- [Up First](https://www.npr.org/podcasts/510318/up-first): I had to unsubscribe from [Today, Explained](https://www.vox.com/today-explained) because the Quip and KiwiCo ads were driving me insane. So this filled the daily news spot perfectly, with better quality content.

### Read
- [The Dark Forest](https://www.goodreads.com/book/show/23168817): I thought this was better than the first book. If the series ended right here I wouldn't be mad. But I can't wait to start the last book.

I think these 3 comics describe what goes through my head a lot of the time in magnificent detail. In this order:
1. [Worst Thing That Could Happen](https://xkcd.com/2261/)
2. [Anxious](http://www.kohney.com/comic/anxious/)
3. [Die](https://www.smbc-comics.com/comic/die)

[^1]: And my small I mean not part of a large network. There are a large amount of "indie" podcasts with a massive following.