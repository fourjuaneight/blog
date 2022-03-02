---
title: Tools
footer:
  img: keyboard.png
  alt: Illustration of a purple mechanical keyboard with white keycaps.
draft: false
---

Although there's a plethora of tools and apps available for development work, I often find some of them lacking. So this is a combination of handmade tools and some great open source options. These lists are the amalgamation of years of trial and error to find just the right combinations. I've also included some stuff I'm testing out.

## Custom
- **[tenjin](https://github.com/fourjuaneight/tenjin)** - Early on in my development career, I realize a lot of time was spent copying and pasting previously use code. So I started to keep a repo full of commonly used scripts, stylings, configs, templates, and snippets. That eventually morphed into a JS CLI utility. This later iteration is written in Go —for no reason other than fun— and has a slimmed-down collection with just the stuff I need for work and personal projects. I quite like this little tool.
- **[showrunner](https://github.com/fourjuaneight/showrunner "")** - I run a Plex server at home for all my media. Oftentimes I need to rename entire tv shows to the correct formatting. I've tried using a couple of shell scripts before, but this tool does it in a single command. But better yet, it also pulls the metadata from TMDB API.
- **[scriptable](https://github.com/fourjuaneight/scriptable)** - There is so much automation that happens on my phone. Most of it is through [Shortcuts](https://support.apple.com/guide/shortcuts/welcome/ios). But there's only so much it can do before it becomes unmanageable. Unless you [Federico](https://www.macstories.net/shortcuts/). These are the various JS scripts, running on [Scriptable](https://scriptable.app), that make iOS automation so much easier.
- **[dotfiles](https://github.com/fourjuaneight/dotfiles)** - I think most devs have dotfiles repo somewhere. I took what I liked the most from others and made something easy to maintain and expand.

## CLI
I started finding Rust alternatives to some of the default CLI tooling for greater security (debatable) and an overall nicer UX. So mostly aesthetics. But also, the [cargo](https://doc.rust-lang.org/cargo/guide/) experience is superior to any other package manager.

- **[cargo-update](https://github.com/nabijaczleweli/cargo-update)** - This little utility brings the cargo experience up to 11. A simple package updater.
- **[sheldon](https://github.com/rossmacarthur/sheldon)** - There are so many zsh plugin managers. This one is lightweight and easily managed via a TOML file.
- **[starship](https://github.com/starship/starship)** - I love cool prompts. This one is robust and highly customizable. Again, via a single TOML file.
- **[zellij](https://github.com/zellij-org/zellij)** - Tmux is great and all. But I can across this on Twitter and found it faster. You can write your plugins, define them via a YAML config file, and what got me is the ability to define layout configurations via various YAML files, which are then called via flags.
- **[zoxide](https://github.com/ajeetdsouza/zoxide)** - Ths is just `cd` on steroids.
- **[exa](https://github.com/ogham/exa)** - A prettier and feature-rich `ls`.
- **[fd](https://github.com/sharkdp/fd)** - A prettier and superior `find`.
- **[bat](https://github.com/sharkdp/bat)** - A prettier and more useful `cat`.
- **[delta](https://github.com/dandavison/delta)** - If you're a CLI Git user, you'll love this thing. It makes diff output far more readable and thus more useful. You can also use a custom theme and who doesn't love that.
- **[fzf](https://github.com/junegunn/fzf)** - This thing is one of the most crucial binaries on my computer. It powers the majority of my [CLI utilities](https://github.com/fourjuaneight/dotfiles/blob/master/homedir/.zsh/func.zsh).
- **[atuin](https://github.com/ellie/atuin)** - Amazing quality of lifr improvement utility. It creates a simple but powerful searchable shell history UI.

## Plugins
These are entirely for [VSCode](https://code.visualstudio.com), my text editor of choice. I've tried them all and this is what I like the best. And so do many many other developers. I try to keep my plugin use to a minimum to prevent the app from running slow. Most of them are for syntax highlighting. But the ones listed here are what enhance my everyday experience.

- **[GitLense](https://github.com/eamodio/vscode-gitlens)** - If you use the built-in Git functionality, this thing will add a lot of the features you might be missing.
- **[Git History](https://github.com/pomber/git-history)** - I'll go as far as to say you need this plugin. Grab a file, run this plugin, and easily scroll through the version history. Such a life improvement.
- **[TODO Tree](https://github.com/Gruntfuggly/todo-tree)** - If you're a TODO person, this will make finding them far easier.
- **[Better Comments](https://github.com/aaron-bond/better-comments)** - This makes code comments easier to parse.

## Trying Out
- **[gitui](https://github.com/extrawurst/gitui)** - [Tower](https://www.git-tower.com/mac) was my GUI of choice for Git, but with the help of a handful of [utilities](https://github.com/fourjuaneight/dotfiles/blob/master/homedir/.zsh/func.zsh#L340-L490) I've written for myself, I find CLI to be as useful and often faster. But this thing sorta merges the two to bring you a pretty cool CLI "GUI". I've been using it on and off for some time and like it. At the time of writing this (2021-08-26), they do not have GPG commit signing, which makes it hard to use on a regular. But it's currently in the works.
- **[GitHub Pull Request](https://github.com/Microsoft/vscode-pull-request-github)** - Instead of my usual [fzf + Git + gh utility](https://github.com/fourjuaneight/dotfiles/blob/master/homedir/.zsh/func.zsh#L458-L468) for CLI PR creation, I've been trying out this plugin. There were some early bugs, but they've since been ironed out. Overall, it's great. If you're already using the built-in Git functionality of VSCode as I do now, this will integrate nicely into your existing workflow make it feature complete.
- **[GitHub Copilot](https://copilot.github.com)** - A lot has been said about Copilot. I think it's a great idea in the early stages. [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense) was already a bit obtrusive —in my opinion— and this can often make it worse. But your mileage may vary.
