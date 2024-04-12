---
title: The WET Codebase
description: "Early in our careers, we're exposed to several principles which are thought of as hard rules one must abide by. And while constraints can yield innovation, they shouldn't be at the cost of having a maintainable codebase."
date: 2021-05-31
tags:
  - development
draft: false
---

Early in our careers, we're exposed to several principles considered complex rules one must abide by. And while constraints can yield innovation, they shouldn't be at the cost of a maintainable codebase. That's the basis of one of my favorite talks by [Dan Abramov](https://overreacted.io), a core maintainer for [React](https://reactjs.org), called [The WET Codebase](https://www.deconstructconf.com/2019/dan-abramov-the-wet-codebase).

We start with a common practice called DRY (Don't Repeat Yourself), which is prevalent in all languages and paradigms. It's almost drilled into every developer's head early on that duplicate code is destructive. As Dan puts it, we're told, "You're not supposed to copy and paste code because it creates a maintenance burden." To a certain extent, that is true; you'll quickly find that maintaining 30 instances of the same functionality across any modestly sized project can lead to bugs, as you can only keep track of so many things in your head. So, instead, what we do is create abstractions. By doing so, we move those repeating pieces into small reusable modules that can be applied anywhere as needed. Which is excellent! Now you don't have to keep track of 30 instances of the same code. If the project manager realizes a feature needs extra juice, we only need to update our single module, which instantly affects any associated component. Development time goes down, the lead engineer doesn't have to spend hours reviewing new changes, and management see a faster turnaround time. It's a win-win-win for everyone.

But what happens when one of these components using that module needs additional functionality? Our module then becomes a little more complex. One option could be to make another module that houses a variant of the original but with some added exceptional cases. But we can't have that; we're running a DRY dev shop, not an assembly line. So, let's add those outstanding cases to the components to keep our one single and simple module. This keeps the codebase small, moves complex logic where relevant, and we get the added benefit of keeping the module free of complexity and thus less prone to bugs. We must keep track of these exceptional cases on each component we bring into our module.

You can see where this is headed. Our problem began a while back. By strictly adhering to the DRY principle, we've backed ourselves to a corner. If we oversimplify our module with the never-ending goal of keeping it generic, we force ourselves to keep track of multiple parameters across various components. Components that share similarities will likely require more mental energy to keep track of. And while we could offload some of these exceptional cases to our module, we've now opened up the possibility of introducing bugs that will inevitably infect several other areas of our project. So you quickly realize that the solution to our problem is not to lock ourselves inside a room with no walls. A bit of duplication can prevent any of these issues from coming up in the first place. Dan continues on this point but reminds us that "duplication isn't perfect in the long term, but the wrong abstraction is also not perfect in the long term; [...] we need to balance these two problems". And we do that by inlining our abstractions. As mentioned, code is fluid, projects change, and backing ourselves into a corner to enforce a hard rule sets us up for failure. Best practices shouldn't be complex rules but guidelines we should apply mindfully.

So what should we do when we can't peer into the future or move back? We can plan a little better. Let's weigh the pros and cons of abstracting a functionality.

## Benefits of Abstractions
- **Focusing on intent**. The whole of computing is made up of myriad abstractions. By further abstracting a functionality, we can focus on specific layers and build and improve our codebase better.
- **Code reuse**. Things have also become more modular, which is now the industry standard for a reason. Reusability allows a newer team member, for example, to come in and add the functionality elsewhere with less effort.
- **Avoiding some bugs**.  By encapsulating functionality in a single module, we can quickly diagnose a bug and apply a fix covering a wide area inside a project.

## Costs of Abstractions
- **Accidental coupling**. Any changes to the abstraction can have cascading effects on all associated components. And that's when we track multiple components with varying complexity to avoid introducing bugs everywhere. This accidentally increases the chances of bugs.
- **Extra indirection**. Dan said it best: "We try so hard to avoid the spaghetti code that we create this lasagna code where there are so many layers that you don't know what's going on anymore."
- **Inertia**. And so we create this slippery slope; once you start down this complicated path, every change makes it harder to go back and further complicates our "cleaner" solution.

## Abstract Responsibly
We ultimately want to make decisions like these responsibly. There also isn't a need to strictly abide by a solution; remember, code is fluid, and our solutions should naturally adapt to it.

- **Test code with concrete business value**. Write tests for your components, not your abstractions. If the abstraction needs to be modified or undone, you won't find yourself re-writing tests; remember, the idea is to keep it agile.
- **Delay adding layers**. Restrain yourself; not everything requires refactoring and/or optimization.
- **Be ready to inline it**. If the abstraction doesn't work, don't force it to. And if you find that a module that was justified in the past could now benefit from not being an abstraction, don't be afraid to revert it and write a little duplication.