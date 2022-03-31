---
title: February Notes
date: 2020-02-29
tags:
  - monthly-notes
draft: false
---

It's been quite the month. So much craziness happened in such a short amount of time. My family and I have luckily been safe from most of it. And I've occupied myself with my work to the point that I hardly did anything else but code this month. But, I still managed to squeeze in some interesting stuff during what little spare time I had that I wanted to share with y'all.

## Coding
I've been working on this new project for a client. Unfortunately, I can't share what it is just yet. But I can, however, talk a bit about the stack we're using. For the majority of my work, I develop in React/Gatsby. It's not so much a personal choice, but rather where the industry is at this moment. So whenever I get the chance to work with something different, I try to make the most of it and learn everything I can.

This time I'm working with [Eleventy](https://www.11ty.dev). This isn't the first time I've worked with it; I originally attempted to build this site with 11ty a while ago. Back then, I was looking to retrofit an assets pipeline to avoid having to run two processes at once (task runner/bundler + SSG). And I came up with a nice little setup that leveraged [JS class templates](https://www.11ty.dev/docs/languages/javascript/) to transpile SCSS and JS at build time. I think it'll make more sense if you see the code:

- [SCSS pipeline](https://github.com/fourjuaneight/static-templates/blob/master/templates/11ty/styles.11ty.js)
- [JS pipeline](https://github.com/fourjuaneight/static-templates/blob/master/templates/11ty/scripts.11ty.js)

Then, any changes on the SCSS/JS will trigger an 11ty rebuild. And it's all done with a single CLI command: `npx @11ty/eleventy`.

I revived these old templates for the client's project and it worked like a charm. I've also had the chance to work with [Nunjucks](https://mozilla.github.io/nunjucks/) for the first time and reading their docs has been a joy; plain and simple with easy to understand examples.

## Digest
I watched an entire show in a single month and I'm not ashamed of it. All 700 episodes and 3 movies were worth it.

### Watched
- [Naruto](https://www.crunchyroll.com/naruto): I watched this show during its original run and covered a long period of my life. I experienced loss, pain, and marriage while watching it. And so much more in between. Watching it a second time with my partner brought back many memories and feelings. And now it holds a precious spot in my life.
- [Little Women](https://letterboxd.com/film/little-women-2019/): Life is often shit and sometimes the best you can do is make the most of it and move on. I think this movie did a lovely job of showing that and I enjoyed it.
- [How Rockets Are Made](https://youtu.be/o0fG_lnVhHw): It's a video about how rockets are made. Filmed by an engineer; [Destin Sandlin](https://www.youtube.com/user/destinws2). It's just 30 minutes of awesomeness.

### Listened
- [Lord of the Rings Style Beacon System](https://www.nodumbquestions.fm/listen/2020/1/31/076-lord-of-the-rings-style-beacon-systems): Destin talking about the science behind the Gondor beacons system. So more awesomeness.
- [New Listeners Start Here](https://www.nodumbquestions.fm/listen/2020/2/13/077-new-listeners-start-here): Aside from his amazing YouTube channel, Destin has a wonderful podcast covering all sorts of great topics and the science behind them. This is a great first episode for anyone interested.
- [Making Gatsby Easy to Understand with Laurie Barth](https://www.software-engineering-unlocked.com/episode-11-staff-engineer-gatsby/): A wonderful discussion about the inner workings of Gatsby as a company and Laurie's journey.

### Read
- [Legion: Son of X](https://www.marvel.com/comics/collection/66037/legion_son_of_x_vol_1_-_prodigal_trade_paperback): I finally finished watching the show and wanted to brush up on my Legion lore. This is a great series and has one of the best representations of how Legion's mind works, IMHO.
- [A Spreadsheet Way of Knowledge](https://www.wired.com/2014/10/a-spreadsheet-way-of-knowledge/): This is an older article —reposting an '84 article— I came across about the rise of the spreadsheet and the impact it had on almost every industry. It's a great read for any nerd.