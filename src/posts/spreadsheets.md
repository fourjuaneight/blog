---
title: Spreadsheets
date: '2019-09-08'
tag: productivity
draft: false
---

I like lists. I make them all the time to help me keep track of just about anything I need to know. There's only so much I can hold in my head at a given time. So offloading certain information for later use frees up my head to focus on executing tasks relating to the listed information.

That being said, I also make lists for mundane things. After some time, these became spreadsheets. And now, it's a sizable amount of [Airtables](https://airtable.com). I'm not sure why I make them. I guess I just want to keep track of things.

I have a pretty simple spreadsheet which keeps a record of my bookmarks. These are articles, podcasts, tweets, videos, and webcomics that I really like and want to reference at some point in the future. I don't think I ever have. But hey, they're there in case I need that information.

And I guess that's the whole reason for making these. If for whatever reason I'm in need of something I saw/heard/read at some point in the past, it's a couple of taps away. And not having to bear the mental burden of keep track of them in the head is nice.

Like [Merlon Mann](http://www.merlinmann.com) said in the last [Reconcilable Differences](https://www.relay.fm/rd) episode ([112](https://www.relay.fm/rd/112)), "it doesn't cost me very much at all to write these things down; it could cost me later in the future not to remember something".

## Upgrades

As I said, these are now mostly Airtables. And that's worked very nicely. They have a great API and I've made a couple of Shortcuts on my iPhone (where I do almost all my capture) that require little interaction to save something. I'm also in the process of making a chrome extension for capture on my desktop. And this is all very convenient and unnecessary and cool. But I'm also about to hit my free limit on Airtable.

And while I'm happy to pay for something as vital as my spreadsheets, Airtables pricing is a bit too high for my needs. So I thought of using Google Sheets since I already pay for a G Suite account and they have a decent API as well. But then I wouldn't have a nice UI to look at my spreadsheets.

So I think it's time to up my game. The logical next step here is to make a PostgreSQL database for all my stuff. [Hasura](https://hasura.io) provides an easy setup for PostgreSQL + GraphQl that can be launched on a small Heroku app. I can then create a nice UI for it on my personal site and add some authentication. Yeah. This sounds awesome.
