---
title: "Location-Based Things Reminders"
description: "Things v3.17 was released and brought a much-needed overhauled Shortcuts integration. This means you can now create your location-based reminders with the help of travel triggers."
date: 2023-01-29
tags:
  - productivity
  - shortcuts
draft: false
---

Things v3.17 was released and brought a much-needed overhauled Shortcuts integration. The possibilities of what you can do now are too much to cover here. I'd suggest you read [MacStories' excellent article on this update](https://www.macstories.net/reviews/things-3-17-overhauls-the-apps-shortcuts-actions/). What I want to focus on is how you can create your location-based reminders with the enhanced Shortcuts support.

Most reminder apps have been able to do this for a while now. Why Cultured Code has neglected this feature for so long is beyond me. But this is the whole purpose of Shortcuts; it allows **you** to fill in the functional gaps.

The setup is quite simple. First, we'll need a couple of tags allowing Shortcuts to filter Things reminders by "location." This can be as simple as `Out` and `Home` to restrict items that should occur at a set location or when we leave.

![Shopping list reminder with a list of items on the Things app.](posts/reminder.png)

With that, we can use the **Find Items** action to retrieve any reminders that are:
- Due today
- Open
- Marked as Out/Home

This will return a list of items if anything is found. We can then loop over them and update the reminder via the Edit Items action to a Reminder Time soon after we leave/enter the location. I like to set mine to 30 minutes later. It gives me enough time to get out or in and go about my business. This is done with the help of the Adjust Date action.

![Two screenshots side-by-side of Siri Shortcuts, showing how to filter reminders and loop over the results.](posts/shortcut.png)

Once we have the Shortcut built, all that's left is to run it as a [Personal Automation that'll trigger when you Leave/Arrive at a specific location](https://support.apple.com/guide/shortcuts/travel-triggers-apd8ebfc4e8e/ios). This automation allows for fine-grained control over the location radius and block of times you wish for it to trigger. From there, we'll need to use the Run Shortcut action to run our newly created Shortcuts.

![Three screenshots side-by-side of Siri Shortcuts, showing how to add location-based triggers on Personal Automations.](posts/automation.png)

> While you could create all these steps within the automation, I prefer to keep mine as standalone Shortcuts that can be utilized elsewhere.

And that's all there is to it. I've used it a few times since the update came out, and it's been a massive improvement over my previous solution. I plan to do something when I leave the house.

I hope this helps!