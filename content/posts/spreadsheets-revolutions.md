---
title: 'Spreadsheets Revolutions'
seo_title: 'Building a Custom Bookmarking Solution - Part 3'
description: "I was dissatisfied with the current bookmarking solutions out there, so I decided to make a custom one instead. This started with a myriad of Airtable bases and then —for some stupid reason— I decided to roll my own hosted database."
date: 2022-03-06
tags:
  - bookmarking
  - archiving
draft: false
---

> I don't recommend this approach; there are plenty of more user-friendly solutions to this "problem". But that's no fun. So let's over-engineer the hell out of this.

...

Anyhow, we're back on Airtable. It's nice, relatively inexpressive, and has a great API. And you know what's the best part? I don't have to maintain shit. I upload, download, and call it a day.

To get a little more context on what's going on, go read [Part 1](/posts/spreadsheets/) and [Part 2](/posts/spreadsheets-reloaded/) of the **Spreadsheets** series. But in short, I was dissatisfied with the current bookmarking solutions out there, so I decided to make a custom one instead. This started with a myriad of Airtable bases and then —for some stupid reason— I decided to roll my own hosted database.

Now, don't get me wrong; I loved having a custom database + API that I could tailor to my needs. However, not only did it not offer much more over Airtable, but it was also far more expensive. Aside from that, I simply didn't have the time to maintain another API on top of the growing list of personal projects and a day job.

That said, I think my mistake was focusing on the wrong area. Rather than rolling a custom database, I should've made an API for data entry, instead of relying on a small army of Shortcuts. So that's what I did.

## The Bookmarker
The primary (if not only) purpose of this whole thing is to save data. This comes from multiple sources, which means we have to pull and parse data from different websites. Some of these have public APIs I can leverage to extract the metadata I need. But for things like articles, I essentially read the HTML and pull what I need via a handful of regular expressions. It sounds a little daunting, but really it's just a matter of knowing what you're looking for. If you squint enough, you'll see that the web is made up of standards. So pulling a title and author from an article should be the same across the board. Right?

Like I mentioned before, this was originally all done via Shortcuts. But that quickly became cumbersome. So the next best thing was to grab the url for the bookmark and send it to an API where the relevant data could be extracted. For reference, these are the columns on these tables:

```ts
interface BookmarkData {
  title: string;
  creator: string;
  url: string;
  tags: string[];
}
```

Some of these column names change are based on the category, like tweets and Reddit posts. But for the majority, that's the data model. `url` and `tags` remain constant throughout them all. These two are the only thing I send to the API. Everything else is automatically extracted in the server for me.

Once the data arrives, the API figures out what the category is and if it needs to hit anything external APIs. It then gives the payload the shape according to the Airtable base and sends it over for saving. All of this takes place on a Cloudflare Worker. It's available on-demand and is compiled to plain JavaScript from Typescript. You can take a look at the code over at my [bookmarker repo](https://github.com/fourjuaneight/bookmarker).

But to get a better idea, this is what the setup looks like:

```goat
        +--------------+        
        |    Media     |        
        +--------------+        
                |               
                |               
     Add Bookmarks Shortcut     
                |               
                v               
+------------------------------+
|    +--------------------+    |
|    |    Select a Tag    |    |
|    +--------------------+    |
|               |              |
|               v              |
|  +-------------------------+ |
|  |Grab URL, Remove Trackers| |
|  +-------------------------+ |
|               |              |
|               v              |
|  +------------------------+  |
|  |   Determine Category   |  |
|  +------------------------+  |
+------------------------------+
                |               
          Bookmarker API        
                |               
                v               
+------------------------------+
|  +-------------------------+ |
|  |    Hit External APIs    | |
|  +-------------------------+ |
|               |              |
|               v              |
|       +-------------+        |
|       | Format Data |        |
|       +-------------+        |
+------------------------------+
                |               
                v               
      +------------------+      
      | Save to Airtable |      
      +------------------+      
```

All this is pretty standard stuff. I essentially just shifted the load from my phone to a server. The biggest feature here is archiving.

## The Archiver
I have a _not so irrational_ fear of losing my data. Not only that, but bookmarking a piece of content just to discover that the creator has taken it down, or worse, that the platform where it was hosted removed it themselves, is just awful.

This is commonly known as [link rot](https://en.m.wikipedia.org/wiki/Link_rot) or platforms being assholes. So circumvent that, I've invested a lot of time and effort to ensure all my data is backed up in several different places. In the case of my bookmarks, I keep a copy of the media type on a B2 bucket. That is a downloaded copy of the article, podcast, video, etc. I wrote an archiving script that runs on a scheduled CI called [archiver](https://github.com/fourjuaneight/archiver). Aside from archiving bookmarks, it also keeps a JSON file copy of every Airtable base. Here's a cool diagram for this setup:

```goat
          +---------------------+          
          |  Get Airtable Data  |          
          +---------------------+          
                     |                     
                     v                     
+-----------------------------------------+
|  Filter Bookmarks w/ Existing Archives  |
+-----------------------------------------+
                     |                     
                     v                     
        +------------------------+         
        |  Determine Media Type  |         
        +------------------------+         
                     |                     
                     v                     
      +----------------------------+       
      | Download Content as Buffer |       
      +----------------------------+       
                     |                     
                     v                     
   +----------------------------------+    
   |  Upload to B2 and Get File Link  |    
   +----------------------------------+    
                     |                     
                     v                     
  +------------------------------------+   
  |  Update Airtable w/ Archive Link   |   
  +------------------------------------+   
```

And although it might seem overkill, while testing this script I found over a dozen bookmarks were dead links already. And new ones have popped up since. So it's alrady paying off.

## Is It Worth The Trouble?
Yes. I'd like to re-quote [Reconcilable Differences 112](https://www.relay.fm/rd/112):

> it doesn't cost me very much at all to write these things down; it could cost me later in the future not to remember something

And I've found this to be true on several occasions. Be it for an article I'm writing or to solidify a point in a conversation. Or maybe I just want to re-listen to that podcast episode because it was pretty good. Our brains are relational databases. This bookmarks database is an external API I reference for additional information. I know what I'm looking for, I just don't know what I say. But I know where to look. And when I do, I need it to be there.