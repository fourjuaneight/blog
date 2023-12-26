---
title: Spreadsheets Reloaded
seo_title: 'Building a Custom Bookmarking Solution - Part 2'
description: "In this second installment of Spreadsheets, I want to detail my attempt at making a database for all my lists. I don't recommend this approach; there are plenty of more user-friendly solutions to this problem. But that's no fun."
date: 2019-11-20
tags:
  - bookmarking
  - productivity
draft: false
---

My love for lists has taken me to new extremes I never thought of before. And I love it. In this second installment of "Spreadsheets," I want to detail my attempt at making a database for all my lists. I don't recommend this approach; there are plenty of more user-friendly solutions to this "problem". But that's no fun. So let's over-engineer the hell out of this.

To get more context on what's going on, read [Part 1](/posts/spreadsheets/).

## Tech
- [Postgres](https://www.postgresql.org)
- [GraphQL](https://graphql.org)
- [Hasura](https://hasura.io)

## Setup
Getting this up and running was pretty straightforward. Hasura can run off a Docker container and be deployed on anything. I wanted to decouple the database from the API, so I opted for a [Managed Database](https://www.digitalocean.com/products/managed-databases/) on DigitalOcean. It's a relatively inexpensive solution. The Hasura API is also hosted there; they have an excellent [one-click app](https://marketplace.digitalocean.com/apps/hasura-graphql).

Once that was ready, I needed to edit the Docker Compose and update `HASURA_GRAPHQL_DATABASE_URL` with the new database[^1].

```bash
cd /etc/hasura
vi docker-compose.yaml
```

Now, If you're familiar with GraphQL, you'll quickly get the hang of Hasura. It uses [GraphiQL](https://github.com/graphql/graphiql), so finding your way around the schema is easy. Still, reviewing the documentation for all these tools will make things easier to navigate.

With everything set up, I just needed to start adding content. The API has a nice GUI console where tables and rows can be added. But the primary use of this will be via XHR Posts to the API.

## Moving to Hasura
My use case is simple: add and get data. So, the first thing I did was migrate my existing data to Hasura. That was a simple request to the [Airtable API](https://airtable.com/api), then loop over the data to parse and format, and then a final request to the Hasura API.

GraphQL APIs will work like any other XHR request. We POST our query or mutation to the API. I could do this via the **Get Contents of URL** action on iOS Shortcuts. The query must be formatted by escaping the line breaks via `\n.` You can then give it a Content-Type of `application/json and pass the data via **Request Body** as a **File**. Using **Magic Variables**, the data can be attached to the request.

## Adding New Data
With everything in Hasura, I could start adding new data. Most of my media consumption is via my iPhone. I also always have my phone at hand, so this is my primary data input source. That can quickly be done via Shortcuts.

Data is coming from apps and websites. But all of the apps I use have their website counterparts. This means the parameters for new data entry can be extracted from the source code. Assuming most websites are consistent in HTML, I can maintain various regex corresponding to each parameter. And that's precisely what I did.

```json
{
  "overcast": {
    "creator": "<a\\shref=\\\"/itunes\\d+.*\\\"\\s?>(.*)</a>",
    "title": "<h2\\sclass=\\\"margintop0 marginbottom0\\\"\\sclass=\\\"title\\\">(.*)<\\/h2>",
    "url": "<source\\ssrc=\\\"(.*)\\\"\\stype=\\\"audio\\/\\w+\\\"\\s?\\/>"
  },
  "castro": {
    "creator": "<h2><a\\shref=\\\".*\\\"\\salt=\\\".*\\\">(.*)</a><\\/h2>",
    "title": "<h1>(.*)<\\/h1>",
    "url": "<source\\ssrc=\\\"(.*)\\\"\\stype=\\\"audio\\/\\w+\\\">"
  },
  "reddit": {
    "creator": "<title>.*\\s:\\s(.*)<\\/title>",
    "title": "<title>(.*)\\s:\\s.*<\\/title>",
    "url": "<meta\\sproperty=\\\"og:url\\\"\\scontent=\\\"(https://www.reddit.com/.*/)\\\"\\/>"
  },
  "twitter": {
    "creator": "<a\\sclass=\\\"PermalinkProfile-overlay js-nav\\\"\\shref=\\\"\\/(.*)\\\">",
    "title": "<link\\srel=\\\"alternate\\\"\\stype=\\\"application\\/json\\+oembed\\\"\\shref=\\\".*\\\"\\stitle=\\\".*\\son\\sTwitter:\\s&quot;(.*)&quot;\\\">",
    "url": "<link\\srel=\\\"canonical\\\"\\shref=\\\"(.*)\\\">"
  },
  "vimeo": {
    "creator": "<button\\sdata-action=\\\"actions.follow\\\"\\sclass=\\\"[a-z_\\s-]+\\\"\\sdata-url=\\\"[a-z0-9/]+\\\"\\sdata-name=\\\"(.*)\\\"\\sdata-user=\\\"\\d+\\\"?\\s>",
    "title": "<meta\\sproperty=\\\"og:title\\\"\\scontent=\\\"(.*)\\\">",
    "url": "<meta\\sproperty=\\\"og:url\\\"\\scontent=\\\"(.*)\\\">"
  },
  "youtube": {
    "creator": "<div\\sclass=\\\"yt-user-info\\\">?\\n?\\s+<a\\shref=\\\".*\\\"\\sclass=\\\".*\\\"\\sdata-sessionlink=\\\".*\\\"?\\s>(.*)</a>",
    "title": "<meta\\sname=\\\"title\\\"\\scontent=\\\"(.*)\\\">",
    "url": "<link\\srel=\\\"canonical\\\"\\shref=\\\"(https://www.reddit.com/.*)\\\"\\/>"
  }
}
```

The source URL is matched to the corresponding object in the parsing JSON. The same is done for each parameter regex used to parse and grab the data. Anything else that isn't coming from these particular apps (regular articles and blog posts) can be handled by the **Get Article using Safari Reader** action. After all this process, the shortcut needs to generate the mutation and send it to the API.

```graphql
mutation {
  insert_bookmarks(
    objects: {
      category: "Articles",
      creator: "André Staltz",
      title: "A plan to rescue the Web from the Internet",
      url: "https://staltz.com/a-plan-to-rescue-the-web-from-the-internet.html"
    }
  ) {
    returning {
      title
      url
    }
  }
}
```

If correctly formatted for Shortcuts, it would look like this:

```text
{"query":"mutation {\n  insert_bookmarks(\n    objects: {\n      category: \"Articles\",\n      creator: \"André Staltz\",\n      title: \"A plan to rescue the Web from the Internet\",\n      url: \"https://staltz.com/a-plan-to-rescue-the-web-from-the-internet.html\"\n    }\n  ) {\n    returning {\n      title\n      url\n    }\n  }\n}"}
```

So far, the source code for every site has been consistent enough for me to parse with my regex correctly. I've saved several items with no issues. And because I'm using an appearance file for the parsing code, I can easily add another source, and the shortcut would just read the latest version. Having it on GitHub also means I can use it anywhere else I want to create similar apps for saving bookmarks.

I keep my Shortcuts modular; everything is a component. For example, the shortcut for adding Bookmarks is to 4 different smaller ones. So, sharing them would be a nightmare. Also, this setup is particular to my use case. However, if anyone is adamant about getting your hands on any of this, hit me on Twitter, and I'll see what I can do.

After everything is put together, this is what we're looking at:

```goat
         +-------------+         
         |    Media    |         
         +-------------+         
                |                
                v                
+-------------------------------+
|    +--------------------+     |
|    |  Match Categories  |     |
|    +--------------------+     |
|               |               |
|               v               |
|  +-------------------------+  |
|  | Get Page Data via Regex |  |
|  +-------------------------+  |
+-------------------------------+
                |                
                v                
     +--------------------+      
     |   Save to Hasura   |      
     +--------------------+      
```

## Going Further
I'm happy with the API setup. The shortcuts will get some optimizations here and there to reduce the amount of input I need; ideally, I'd like to hit the shortcut from the share sheet and hate to do everything with my intervention.

There's so much more to do on the front end. I plan to create a nice table UI for all my lists, not just Bookmarks. I'm still debating whether it should go on this site or if I should make a completely separate app with authentication. I'm leaning towards the latter just because I want to have the option of adding and deleting items from the front-end. But we'll see.

There's absolutely no need for all of this. I have another shortcut that makes a fetch to the API and gives me a nice list of Bookmarks. This works well for all of my lists. But that's just boring. So stay tuned for more to come.

[^1]: This used to be documented, but with their recent move from beta to full release, I can't find it. Editing the Docker Compose should still work, though I only recommend this if you know what you're doing.