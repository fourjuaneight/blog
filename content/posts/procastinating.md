---
title: On Procrastinating
description: "For many of us, procrastinating is the norm, and getting some work done is the day's accomplishment. I have no idea how to solve that problem. And that's not what this post is about. But let's talk about it anyway."
date: 2017-07-23
tags:
  - productivity
draft: false
---

Have you ever gone down one of those online rabbit holes and ended up on [r/disneyvacation](https://www.reddit.com/r/disneyvacation/) for some odd reason? Yeah, me neither. For many of us, procrastinating is the norm, and getting some work done is the day's accomplishment. So we do a quick Google search on "how to stop procrastinating," and then you hit 2.3 million results with topics like "7 magical tips" or the "2-minute rule"—whatever that means—but nothing helps. Don't get me wrong; you'll probably find some excellent advice on mastering productivity. But these articles are written by sane people, which I am not.

Procrastination isn't optional; that nagging voice is always telling you that this one random thing needs your attention this instant. "It seems the Rational Decision-Maker in the procrastinator's brain is coexisting with a pet—the Instant Gratification Monkey," as [Tim Urban](https://waitbutwhy.com/2013/10/why-procrastinators-procrastinate.html) wonderfully puts it. Now, I'm not here to tell you how to conquer your brain; there are better people with outstanding advice that can help you with that. What I can do is share the many ways I've been able to circumvent these shortcomings (creatively) with automation. There are many ways to make computers work for us. So let's discuss how to get shit done efficiently while fighting that damn monkey screaming in your head all day.

## Do all the things at once
As many of you have figured out, there are better approaches than attempting to do too much at once. According to [David E. Meyer](http://www.apa.org/research/action/multitask.aspx), "multitasking may seem efficient on the surface but may take more time in the end and involve more error." There are, however, ways around this. This site, for example, is hosted on [GitHub](https://github.com). When any content is modified, [Netlify](https://www.netlify.com) detects these changes automatically, updating the site. Much of the heavy lifting is done for me, thus letting me focus on the writing and not running the site. But let's take things a step further with a [Workflow](https://itunes.apple.com/us/app/workflow/id915249334?mt=8) I put together:

0. A front matter is created with the title of the file and the correctly formatted date.
1. The tags are chosen and placed accordingly.
2. The front matter and body of the article are appropriately arranged.
3. The whole document is sent to [Working Copy](https://itunes.apple.com/us/app/id965019520).
4. Finally, the changes are committed to the master repo on GitHub.

A several-minute-long, multiple-step task took Workflow only a few seconds. So now I can go to Netlify to ensure the build went through successfully. How about getting notified instead and skipping all of that? Using webhooks and [IFTTT](https://ifttt.com/maker_webhooks), I can make two applets that catch the outcome and send a notification to my phone confirming if the build passed or failed. I've significantly reduced my production time and automated several repetitive tasks.

Although real multitasking is trying to accomplish the most tasks simultaneously, automating several processes to work by themselves effectively allows you to multitask without caveats.

## Productive Laziness
Productivity breaks down to a simple formula: "High-Quality Work Produced = (Time Spent) x (Intensity of Focus)," as Cal Newport brilliantly said in his book [Deep Work](https://www.amazon.com/dp/1455586692). The first 30 minutes of your morning could be spent catching up on emails and tweets. We've all done it and know well that those 30 minutes turn into an hour without us noticing. A quick 15-minute walk, however, would be more productive. That time can be used to capture your ideas and goals for the day. A study by [Stanford University](http://news.stanford.edu/2014/04/24/walking-vs-sitting-042414/) found "the overwhelming majority of the participants […] were more creative while walking than sitting".

I prefer to walk around in circles in my home office. It is the perfect time to prepare myself for the day. Several tools can help with this; I'm a fan of [Things](https://itunes.apple.com/us/app/id904237743) as it perfectly balances ease of use and functionality. The app has become an extension of my brain, keeping me focused throughout the day. My process looks something like this:

0. I write down my goals for the day and collect previous ideas.
1. Items are separated by actionable and not urgent.
    - Actionable tasks are taken care of promptly.
    - Timely matters are scheduled accordingly.
2. Once my day is organized, items are placed and tagged respectively in Things.

Relaxing after long work periods is also critical to a successful day. I make it a priority in my day to schedule regular breaks, both short and long ones. If you rob yourself of these small pockets of laziness, you sacrifice *Intensity of Focus*. We often consider ourselves computers that can run endlessly with a constant energy source. But we can't; we depend on a balanced cycle of work and rest. "Grey matter tires well before the body does," as [Joe Robinson](https://www.entrepreneur.com/article/237446) cleverly said it. Having scheduled breaks eliminates the ambiguity and guilt of pausing for a breather, giving your brain to sort things out and regain focus.

Effective planning sets you up for *success*. But remember that procrastinators love planning, as planning does not involve actually *doing*. Organizing your day with distractions in mind can help you avoid things that you know will cause you to drift away. An app like [Streaks](https://itunes.apple.com/us/app/id963034692) can help you set goals with reminders that track your progress and give you an overall view of how you are doing. Having something tell me what challenges to overcome today creates a feeling of responsibility that urges me to complete those goals. Incremental changes lead to a more significant improvement in the end. Persistence is critical to success, and reducing procrastination is gaining control over your life.

## What is this post about?
When I got the opportunity to work from home, I thought it would be all sunshine and double rainbows, but it quickly turned into a challenge. I easily drifted away in my head while working and lost track of time. At one point, I came close to losing my job. A while ago, I started to devise clever ways to get work done while being lazy. What has worked for me will only work for some. It's taken me years of trial and error to tailor a workflow that overcomes my shortcomings and takes advantage of my skills. But I have found something rather extraordinary that benefits anyone. I'm pretty good at coding and love solving problems, which is why automation caught my attention.

Many websites cover productivity and automation for iOS, macOS, and the web, but none focus entirely on the matter. That's different from what this blog is about. But if you find one, let me know.