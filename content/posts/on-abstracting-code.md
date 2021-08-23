---
title: On Abstracting Code
date: '2021-05-31'
tags:
  - developement
draft: false
---

Early in a developer's career, we are exposed to several principles which are thought of as hard rules one must abide by. But unlike programming, where things are fluid and ever-changing, hard rules confine us to a limited set of stuff we can do and a lot of what we can't. And while constraints can be a great tool for producing great work, they shouldn't be at the cost of having a maintainable codebase. That's the basis of one of my favorite talks by [Dan Abramov](https://overreacted.io), a core maintainer for [React](https://reactjs.org), called [The WET Codebase](https://www.deconstructconf.com/2019/dan-abramov-the-wet-codebase).

We start with a common practice called DRY (Don't Repeat Yourself), which is prevalent in all languages and paradigms. It's almost drilled into every developer's head early on that duplicate code is bad code. As Dan puts it, we're told "you're not supposed to copy and paste code because it creates a maintenance burden". And to a certain extent that is true; you'll quickly find that maintaining 30 instances of the same functionality across any modestly sized project can lead to bugs, as you can only keep track of so many things in your head. So instead, what we do is create abstractions. By doing so, we move those repeating pieces into a module —small reusable chucks— that can be applied anywhere it's needed. Which is great! Now you don't have to keep track of 30 instances of the same code; if the project manager realizes a feature needs some extra juice, we simply need to update our module and it affects any associated component instantly. Development time goes down, the lead engineer doesn't have to spend hours reviewing new changes, and the client sees a faster turnaround time. It's a win-win-win for everyone.

Hmm, but what happens when one of these components that are using said module needs additional functionality? Our module is no longer so simple. One option could be to make another module that houses a variant of the original but with some added special cases. But we can't have that, we're running a DRY dev shop here, not an assembly line. So let's add those special cases to the components to keep our one single, and simple, module. This keeps the codebase small, moves complex logic where it's relevant, and we get the added benefit of keeping the module free of complexity and thus less prone to bugs. We just have to keep track of these special cases on each component where we bring in our module.

You can see where this is headed. Our problem began a while back. By strictly adhering to the DRY principle, we've backed ourselves to a corner, which is more like a room with no doors. If we oversimplify our module with the never-ending goal of keeping it generic, we force ourselves to keep track of multiple parameters across various components. Components that done share any similarities most likely and require more mental energy to keep track of. And while we could offload some of these special cases to our module, we've now opened up the possibility of introducing bugs that will inevitably infect several other areas of our project. So you quickly begin to realize that the solution to our problem is not to lock ourselves inside a room with no walls. A bit of duplication can prevent any of these issues from coming up in the first place. Dan continues on this point but reminds us that "duplication isn't perfect in long term, but [the] the wrong abstraction is also not perfect in [the] long term; [...] we need to balance these two problems". And we do that by inlining our abstractions. Like we mentioned before, code is fluid, projects change, and backing ourselves into a corner for the sake of enforcing a hard rule is setting ourselves up for failure. Best practices shouldn't be hard rules, but rather guidelines we should apply mindfully.

So what should we do then in situations like these where we can't peer into the future or move back in time? Well, we can plan a little better. Let's weigh the pros and cons of abstracting a functionality.

## Benefits of Abstractions
- **Focusing on intent**. The whole of computing is made up of myriad abstractions. By further abstracting a functionality we can focus on specific layers and better build and improve upon our codebase.
- **Code reuse**. Things have also become more modular, which has become the industry standard for a reason. Reusability allows a newer member of a team, for example, to come in and add the functionality elsewhere with less effort.
- **Avoiding some bugs**.  By encapsulation a functionality to a single module, we're able to quickly diagnose a bug and apply a fix that will cover a wide area inside a project.

## Costs of Abstractions
- **Accidental coupling**. Any changes to the abstraction can have cascading effects on all associated components. And that's when we find ourselves tracking multiple components, with varying degrees of complexity, to avoid introducing bugs everywhere. This accidentally increases the chances of bugs.
- **Extra indirection**. Dan said it best: "we try so hard to avoid the spaghetti code that we create this lasagna code where there are so many layers that you don't know what's going on anymore at all".
- **Inertia**. And so we create this slippery slope; once you start down this complicated path, every change makes it harder to go back and further complicates our "cleaner" solution.

## Abstract Responsibly
And so, want we ultimately want to do is make decisions like these responsibly. There also isn't a need to strictly abide by a solution; remember, code is fluid and our solutions should naturally adapt with it.

- **Test code with concrete business value**. Write tests for your components, not your abstractions. If the abstraction needs to be modified or undone, you won't find yourself re-writing tests; remember, the idea is to keep it agile.
- **Delay adding layers**. Restrain yourself; not everything requires refactoring and/or optimization.
- **Be ready to inline it**. If the abstraction doesn't work, don't force it to. And if you do find that a module that was justified in past could now benefit from not being an abstraction, don't be afraid to revert it and write a little duplication.