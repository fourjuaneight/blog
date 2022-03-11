---
title: Uses
footer:
  img: bookbag.png
  alt: Illustration of a bookbag, laying on the floor half-open.
draft: false
---

Here's some of the stuff I use for work and procrastination.

## Hardware
I used to be a Mac guy. Maybe I still am. But after having to part ways with my M1 Air, I started using an old gaming PC I built a while back. I'm not a lunatic, so I replaced Windows with Linux —Pop OS specifically. Now, I don't think I'd go back to Mac.

- **[HHKB Pro 2](https://www.amazon.com/dp/B07K9QHF4P)** - I got the all-black keys and it took me a while to get used to the new layout without being able to tell which key is which. Worth every penny, though.
- **[Logitech MX Ergo](https://www.logitech.com/en-us/products/mice/mx-ergo-wireless-trackball-mouse.html)** - So nice and comfortable.
- **[UpDesk Standing Desk](https://updesk.com/products/updesk-electric-lift-standing-desk-upwrite-midnight-black-top-on-black-frame-closeout)** - The table is pretty good, but the customer service is nonexistent.
- **[Secretlab Omega Chair](https://secretlab.co/collections/omega-series)** - Great chair.
- **[Tripp Lite 1500VA 900W UPS](https://www.amazon.com/dp/B009TZTGWK/)** - I believe I heard about the brand from Marco Arment. Solid UPS.
- **[Ubiquiti Dream Machine Pro](https://store.ui.com/collections/unifi-network-unifi-os-consoles/products/udm-pro)** - The only reason I got the Pro was to mount it on a rack.
- **[Ubiquiti Switch 8 (PoE)](https://store.ui.com/collections/unifi-network-switching/products/unifi-switch-8-60w)** - I have a couple of these around the house to extend the ports coming out the wall.
- **[Ubiquiti UniFi AC Pro](https://store.ui.com/collections/wireless/products/unifi-ac-pro)** - Solid access point.
- **[Ubiquiti Access Point In-Wall HD](https://store.ui.com/products/unifi-in-wall-hd)** - Another solid access point. Running in mesh with the other AP.
- **Raspberry Pi ([PiHole](https://pi-hole.net))** - This is the best decision I've made for my home network.

### Audio Gear
- **[Bluesound NODE](https://www.bluesound.com/products/node/)** - This serves as audio input for the TV as well as an AirPlay and Roon endpoint. Pretty sweet.
- **[Schiit Modius](https://www.schiit.com/products/modius)** - This takes the SPDIF digital signal from the NODE.
- **[Schiit Aegir](https://www.schiit.com/products/aegir)** - Then two of these (monoblock) take the balanced signal from the Modius.
- **[Klipsch RP-600M](https://www.klipsch.com/products/rp-600m-bookshelf-speakers)** - These sounds great and sweet for my messed up hearing.
- **[beyerdynamic DT 990 Pro](https://north-america.beyerdynamic.com/dt-990-pro.html)** - These are overkill for essentially Zoom and podcasts. But TOOL does sound lovely in lossless.
- **[Schiit Modi](https://www.schiit.com/products/modi-1)** - Solid DAC for my listening needs.
- **[Schiit Magni](https://www.schiit.com/products/magni-1)** - Solid Amp to power the DT 990 Pros.

## Software
Because of the aforementioned jump to Linux, all of these Mac apps are no longer part of my daily usage. But more so, my job was switched over to [GitHub Codespaces](https://github.com/features/codespaces). And I've done the same for my projects.

* [Dracula Theme](https://draculatheme.com) all the things.
- **[VS Code](https://code.visualstudio.com)** - Honestly, I've tried all the editors at this point. This is by far the most decent one. It is solid enough, way too customizable, and integrates perfectly with all my tooling.
- **[iTerm](https://iterm2.com)** - Best macOS terminal.
- **[Blink](https://www.blink.sh)** - Best iOS terminal.
- **[Working Copy](https://workingcopyapp.com)** - I can't believe this is an iOS app; paramount for mobile Git-ing.
- **[Transmit](https://panic.com/transmit/)** - Rarely use it, but it's nice to look at.
- **[ShellFish](https://secureshellfish.app)** - _The_ iOS FTP app.
- **[Affinity Designer](https://affinity.serif.com/en-us/)** - Who needs Photoshop.
- **[Things](https://culturedcode.com/things/)** - I've tried them all and this UI is simply the best for me.
- **[Drafts](https://getdrafts.com)** - All text starts here.
- **[Jayson](https://jayson.app)** - Nice UI for JSON on iOS.
- **[Scriptable](https://scriptable.app)** - Sometimes you _just_ need a little JavaScript.
- **[Alfred](https://www.alfredapp.com/)** - Spotlight is great and Launchbar looks nicer, but you just can't compare to the power of Alfred.
- **[Hazel](https://www.noodlesoft.com/)** - A computer should run itself. This does the trick.
- **[Moom](https://manytricks.com/moom/)** - Nifty little window manager.
- **[Bartender](https://www.macbartender.com/)** - Too much crap on the menu bar.

### Daily Apps
- **[Castro](https://castro.fm)** - I always go back and forth between this and [Overcast](https://overcast.fm). I love Overcast for its quality build, but Castro has a fantastic UI.
- **[Reeder](https://reederapp.com)** - I've been using the iOS sync feature and works perfectly.
- **[GoodLinks](https://goodlinks.app)** - This is honestly the best read-it-later app you can find. It's pretty much perfect.
- **[Apollo](https://apolloapp.io)** -  The _only_ Reddit app.
- **[Tweetbot](https://tapbots.com/tweetbot/)** - You're an animal if you use the official Twitter app.

There are several more hardware and software I use. But these are the main things I cannot live without daily.

## Tools

Although there's a plethora of tools and apps available for development work, I often find some of them lacking. So this is a combination of handmade tools and some great open source options. These lists are the amalgamation of years of trial and error to find just the right combinations. I've also included some stuff I'm testing out.

### Custom
- **[tenjin](https://github.com/fourjuaneight/tenjin)** - Early on in my development career, I realize a lot of time was spent copying and pasting previously use code. So I started to keep a repo full of commonly used scripts, stylings, configs, templates, and snippets. That eventually morphed into a JS CLI utility. This later iteration is written in Go —for no reason other than fun— and has a slimmed-down collection with just the stuff I need for work and personal projects. I quite like this little tool.
- **[showrunner](https://github.com/fourjuaneight/showrunner)** - I run a Plex server at home for all my media. Oftentimes I need to rename entire tv shows to the correct formatting. I've tried using a couple of shell scripts before, but this tool does it in a single command. But better yet, it also pulls the metadata from TMDB API.
- **[scriptable](https://github.com/fourjuaneight/scriptable)** - There is so much automation that happens on my phone. Most of it is through [Shortcuts](https://support.apple.com/guide/shortcuts/welcome/ios). But there's only so much it can do before it becomes unmanageable. Unless you [Federico](https://www.macstories.net/shortcuts/). These are the various JS scripts, running on [Scriptable](https://scriptable.app), that make iOS automation so much easier.
- **[dotfiles](https://github.com/fourjuaneight/dotfiles)** - I think most devs have dotfiles repo somewhere. I took what I liked the most from others and made something easy to maintain and expand.

### CLI
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

### Plugins
These are entirely for [VSCode](https://code.visualstudio.com), my text editor of choice. I've tried them all and this is what I like the best. And so do many many other developers. I try to keep my plugin use to a minimum to prevent the app from running slow. Most of them are for syntax highlighting. But the ones listed here are what enhance my everyday experience.

- **[GitHub Copilot](https://copilot.github.com)** - A lot has been said about Copilot. I think it's a great idea in the early stages. [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense) was already a bit obtrusive —in my opinion— and this can often make it worse. But your mileage may vary.
- **[GitLense](https://github.com/eamodio/vscode-gitlens)** - If you use the built-in Git functionality, this thing will add a lot of the features you might be missing.
- **[Git History](https://github.com/pomber/git-history)** - I'll go as far as to say you need this plugin. Grab a file, run this plugin, and easily scroll through the version history. Such a life improvement.
- **[GitHub Pull Request](https://github.com/Microsoft/vscode-pull-request-github)** - Instead of my usual [fzf + Git + gh utility](https://github.com/fourjuaneight/dotfiles/blob/master/homedir/.zsh/func.zsh#L458-L468) for CLI PR creation, I've been trying out this plugin. There were some early bugs, but they've since been ironed out. Overall, it's great. If you're already using the built-in Git functionality of VSCode as I do now, this will integrate nicely into your existing workflow make it feature complete.
- **[TODO Tree](https://github.com/Gruntfuggly/todo-tree)** - If you're a TODO person, this will make finding them far easier.
- **[Better Comments](https://github.com/aaron-bond/better-comments)** - This makes code comments easier to parse.

### Trying Out
- **[gitui](https://github.com/extrawurst/gitui)** - [Tower](https://www.git-tower.com/mac) was my GUI of choice for Git, but with the help of a handful of [utilities](https://github.com/fourjuaneight/dotfiles/blob/master/homedir/.zsh/func.zsh#L340-L490) I've written for myself, I find CLI to be as useful and often faster. But this thing sorta merges the two to bring you a pretty cool CLI "GUI". I've been using it on and off for some time and like it. At the time of writing this (2021-08-26), they do not have GPG commit signing, which makes it hard to use on a regular. But it's currently in the works.

---

For an even nerdier list, take a look at my [dotfiles](https://github.com/fourjuaneight/dotfiles) and see into the soul of my Mac.
