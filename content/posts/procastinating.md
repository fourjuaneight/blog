---
title: Procrastinating
date: '2017-07-23'
tags:
  - procrastination
draft: false
---

Have you ever gone down one of those online rabbit holes and end up on [r/disneyvacation](https://www.reddit.com/r/disneyvacation/) for some odd reason? Yeah, me neither. For a lot of us procrastinating is the norm and getting some work done is the accomplishment of the day. So we do a quick Google search on "how to stop procrastinating," and then you hit 2.3 million results with topics like "7 magical tips" or the "2-minute rule" — whatever that means — but nothing helped. Now don't get me wrong, you'll probably find some wonderful advice on how to master productivity. But these articles are written by sane people, which we are not.

Procrastination isn't optional; there's always that nagging voice in your head telling you that one random thing needs your attention this instant. "It seems the Rational Decision-Maker in the procrastinator's brain is coexisting with a pet—the Instant Gratification Monkey," as [Tim Urban](https://waitbutwhy.com/2013/10/why-procrastinators-procrastinate.html) wonderfully put it. Now I'm not here to tell you how to conquer your brain; there are better people than me with some outstanding advice on the matter. What I can do is share the many ways in which I've been able to circumvent these shortcomings (creatively) with automation. A plethora of technologies is available to everyone that leverage the power of apps and the web to make computers work for us. So let's discuss how to get shit done, efficiently, while fighting that damn monkey screaming in your head all day.

## Do all the things at once
Attempting to do too much at once, as many of you may have figured out by now, is not the best approach. According to [David E. Meyer](http://www.apa.org/research/action/multitask.aspx), "multitasking may seem efficient on the surface but may take more time in the end and involve more error." There are, however, ways around this. This site, for example, is hosted on [GitHub](https://github.com). When any content is modified, [Netlify](https://www.netlify.com) detects these changes automatically, updating the site. A lot of the heavy lifting is done for me, thus letting me focus on the writing and not running the site. But let's take things a step further with a [Workflow](https://itunes.apple.com/us/app/workflow/id915249334?mt=8) I put together:

0. A front matter is created with the title of the note and the correctly formatted date.
1. The tags are chosen and placed accordingly.
2. The front matter and body of the article are arranged properly.
3. The whole document is then sent to [Working Copy](https://itunes.apple.com/us/app/working-copy-enterprise/id965019520?mt=8).
4. Finally, the changes are committed to the master repo on Github.

A several minutes long, multiple steps task took Workflow only a few seconds. So now I simply go to Netlify and make sure the build went through successfully, right? How about just getting notified instead and skip all of that. Using webhooks and [IFTTT](https://ifttt.com/maker_webhooks), I can make two applets that catch the outcome and send a notification to my phone confirming if the build passed or failed. I've now cut down my production time significantly and automated several repetitive tasks.

Although real multitasking is trying to accomplish the most amount of tasks at once, automating several processes to work by themselves does effectively give you multitasking without the caveats.

## Productive Laziness
Productivity breaks down to a simple formula: "High-Quality Work Produced = (Time Spent) x (Intensity of Focus)," as Cal Newport brilliantly said in his book [Deep Work](https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692). The first 30 minutes of your morning could be spent catching up on email and tweets. We've all done it and know very well those 30 minutes turn into an hour without us even noticing. A quick 15-minute walk, however, would be more productive. That time can be used to capture your ideas and goals for the day. A study by [Stanford University](http://news.stanford.edu/2014/04/24/walking-vs-sitting-042414/), found "the overwhelming majority of the participants […] were more creative while walking than sitting".

I prefer to walk around in circles in my home office. I find it to be the perfect time to prepare myself for the day. There as several tools that can help with this; I'm a fan of [Things](https://itunes.apple.com/us/app/things-3/id904237743?mt=8) as it strikes a perfect balance between ease of use and functionality. The app has become an extension of my brain that keeps me focused throughout the day. My process looks something like this:

0. I write down my goals for the day and collect previous data.
1. Items are separated by actionable and not urgent.
  * Actionable tasks are taken care of promptly.
  * Timely matters are scheduled accordingly.
2. Once my day is organized, items are placed and tagged respectively in Todoist.

Relaxing after long periods of work is critical to a successful day as well. I make it a priority in my day to schedule regular breaks, both short and long ones. If you rob yourself of these small pockets of laziness, you sacrifice *Intensity of Focus*. We often think of ourselves as computers, which can run endlessly with a constant source of energy. We can't; we depend on a balanced cycle of work and rest. "Grey matter tires well before the body does," as [Joe Robinson](https://www.entrepreneur.com/article/237446) cleverly said it. Having scheduled breaks eliminates the ambiguity and guilt out of pausing for a breather, giving your brain to sort things out and regain focus.

Effective planning sets you up for *success*. But remember that procrastinators love planning, as planning does not involve actually *doing*. Organizing your day with distractions in mind can help avoid things that you know will cause you to drift away. An app like [Streaks](https://itunes.apple.com/us/app/streaks/id963034692?mt=8) can help you set goals with reminders that track your progress and gives you an overall view of how you are doing. Personally, having something tell me what challenges there are to overcome today, creates a feeling of responsibility that urges me to complete those goals. Incremental changes lead to a greater improvement in the end. Persistence is such a critical component of success, and reducing procrastination is gaining control over your own life.

## What is this post about?
When I got the opportunity to work from home, I thought it would be all sunshine and double rainbows, but it quickly turned into a challenge. I easily drifted away in my head while working and lost track of time. At one point I came close to losing my job because of this. So a while ago I started to devise clever ways to get work done while being lazy. What has worked for me won't necessarily work for everyone. It's taken me years of trial and error to tailor a workflow that overcomes my shortcomings and takes advantage of my skills. But I believe I have found something rather wonderful that benefits anyone. I'm fairly good at coding and love solving problems, which is why automation caught my attention.

There's plenty of websites covering productivity and automation for iOS, macOS, and the web, but none of them focus entirely on the matter. That's not what this blog is about. But if you find one, let me know.