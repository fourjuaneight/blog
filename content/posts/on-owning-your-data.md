---
title: On Owning Your Data
date: 2022-03-02
tags:
  - indieweb
  - archiving
draft: false
---

This statement from [Nelson's recent post on Goodreads losing all his data](https://www.somebits.com/weblog/tech/bad/goodreads-lost-all-my-data.html) hits on something that, although we all know to be true, we tend to fall short on preventing against:

> Don't trust any cloud service with the only copy of your data. Most companies are not quite so reckless but consider what you'd miss if an uncaring company lost your data.

And it's true, most companies won't lose your data this recklessly. That data is often their source of revenue and they'll do anything to protect it and reassure you that it is best placed in their hands. And therein lies the other problem; if your data isn't at risk of being lost, it's being utilized to violate your privacy.

There are many angles to come at this issue. And it's something that's been exhaustively talked about everywhere. So instead, let me show you what I've been doing.

## Roll Your Own

The solution to this isn't hard to find. You simply need to host your data and publish it in the manner that best suits your needs. But like anything on the web, there are a plethora of ways to go about this. So let's take at one that should be approachable people that have published their blog at some point.

This site is built using Hugo. It's one of the relatively newer static site generators. And like most of them, it can read data from common file types like JSON. That means I can maintain a data file that looks like this and use it to create my digital bookshelf of sorts:
```json
[
  {
    "name": "Attack on Titan",
    "creator": "Hajime Isayama",
    "rating": 5,
    "comments": "What Game of Thrones wanted to be.",
    "category": "Anime"
  },
  {
    "name": "The Dark Forest",
    "creator": "Cixin Liu",
    "rating": 5,
    "comments": "Knowing it'll end, that it's coming, but you just don't know when. The anxiety eats away at you until you destroy yourself.",
    "category": "Books"
  },
  {
    "name": "Harry Potter and The Order of the Phoenix",
    "creator": "David Yates",
    "rating": 4,
    "comments": "It's your fault Sirius died, Harry.",
    "category": "Movies"
  }
]
```

From there, you can loop over each object in your templates and create a digital bookshelf where you keep records of the media you consume, like, and review. And the beautiful thing here is that you can make this look however you want. It can be clean and simple [like Tom's](https://macwright.com/reading/), or you can include cover art and filters [like Dave's](https://daverupert.com/bookshelf) to make it look more like an actual bookshelf.

But if the idea here is to maintain a massive shelf like Nelson's 600+ books on Goodreads, then a single JSON file is not feasible. That's where something like Airtable can come in handy. And you might be thinking to yourself, "Isn't the whole point of this to get away from hosting your data on other companies' servers?". True. But the idea here is more so not to depend on third-party social platforms to share your likes and ideas. After all, unless you're hosting your website on your basement's home server, it's likely hosted on some company's servers. But can have better control over our data. And that's the whole point; having control.

[Gabriel had some good insight based on his recent journey with Obsidian](https://www.macdrifter.com/2022/03/roll-your-own.html?utm_source=dlvr.it&utm_medium=twitter):

> One of the things I find fascinating (and refreshing) about the community of Obsidian users is how driven they are to build bespoke self-hosted tools. Even if Obsidian disappears or the plugins stop working, the data still exists on your own disk in files you control. Maybe I’m just old, but I’m tired of having to start from scratch because web services go away or pivot to something unrecognizable.

So it's that flexibility of making your data portable that we're looking for. What I like about Airtable is that their free tier is quite generous (I have a mountain of data there and haven't paid a dime yet) and their API documentation is quite accessible. But if you're not sure about Airtable, you could use Google Sheets. It's an Excel-like tool that most people are familiar with and like have access to. But also, their API is rich and allows you to pull any data.

Once your data is stored on one of these services, you can write a small script in the language of your choice to pull the bookshelf data and store it locally as a JSON file that your website can read.

## Why This Matters

I think [Brad said it best](https://bradfrost.com/blog/post/write-on-your-own-website/):

> Writing on your own website associates your thoughts and ideas with you as a person. Having a distinct website design helps strengthen that association.

Signing up for Twitter is free and easy. That is also true for Goodreads, Letterboxd, and just about any social platform. And although a lot of these platforms have done a lot to make your data a lot easier to export in recent years, the fact remains that you're placing trust on a group of individuals that have little to no interest in you or the value you place on that data. I'm not saying we should all leave X for Y. But if you can take anything away from this post is that you shouldn't **only** rely on one platform. Go ahead and review that book on Goodreads and fight with people on Twitter about your hot takes on it. But why not also publish on your site.