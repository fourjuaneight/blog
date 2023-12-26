---
title: Spreadsheets
seo_title: 'Building a Custom Bookmarking Solution - Part 1'
description: "I like lists. I make them all the time to help me keep track of just about anything I need to know. After some time, these became spreadsheets. And now, it's a sizable amount of Airtables."
date: 2019-09-08
tags:
  - bookmarking
  - productivity
draft: false
---

I like lists. I make them all the time to help me keep track of just about anything I need to know. I can only hold so much in my head at a given time. So, offloading certain information for later use frees my head to focus on executing tasks relating to the listed information.

That being said, I also make lists of mundane things. After some time, these became spreadsheets. And now, it's a sizable amount of [Airtables](https://airtable.com). I'm trying to understand why I make them. I guess I want to keep track of things.

I have a simple spreadsheet that keeps a record of my bookmarks. These are articles, podcasts, tweets, videos, and webcomics that I like and want to reference at some point. I don't think I ever have. They're there in case I need that information.

And that's the whole reason for making these. If, for whatever reason, I require something I saw/heard/read at some point in the past, it's a couple of taps away. And not having to bear the mental burden of keeping track of them in the head is excellent.

As [Merlin Mann](http://www.merlinmann.com) said in the last [Reconcilable Differences](https://www.relay.fm/rd) episode ([112](https://www.relay.fm/rd/112)), "it doesn't cost me very much at all to write these things down; it could cost me later in the future not to remember something."

## Upgrades
As I said, these are now mostly Airtables. And that's worked very nicely. They have a great API, and I've made a couple of shortcuts on my iPhone (where I do almost all my captures) that require little interaction to save something. I'm also in the process of making a Chrome extension for capture on my desktop. And this is all very convenient and unnecessary and cool. But I'm also about to hit my free limit on Airtable.

And while I'm happy to pay for something as vital as my spreadsheets, Airtable's pricing is too high for my needs. I thought of using Google Sheets since I already pay for a G Suite account, and they also have a decent API. But then, I would need a nice UI to look at my spreadsheets.

So, it's time to up my game. The next step is to make a PostgreSQL database for all my stuff. [Hasura](https://hasura.io) provides an easy setup for PostgreSQL + GraphQl that can be launched on a small Heroku app. I can then create a nice UI on my site and add some authentication. Yeah. This sounds awesome.
