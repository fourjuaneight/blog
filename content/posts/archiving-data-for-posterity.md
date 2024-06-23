---
title: "Archiving Data for Posterity: My Move to M-DISC"
og: "Archiving Data for Posterity"
description: "I've been thinking a lot about data preservation. My ever-expanding digital collection grows exponentially. And while the average person might stream all their media and rely on some online drive for photos, I prefer a local-first approach. So what happens when my digital treasure trove is threatened by the impermanence of modern storage solutions? Enter the M-DISC."
date: 2024-05-10
tags:
  - archiving
draft: false
---

I've been thinking a lot about data preservation. My ever-expanding digital collection grows exponentially. And while the average person might stream all their media and rely on some online drive for photos, I prefer a local-first approach. So what happens when my digital treasure trove is threatened by the impermanence of modern storage solutions? Enter the M-DISC. A technology that promises something that deeply resonates with anyone who cherishes their digital memories: longevity.

## The Purpose and Rationale

Our digital lives are fragile. One moment you have cherished family photos securely saved, and the next, they could be lost to a corrupt hard drive or an overlooked deletion. Many of us rotate through backup solutions and providers over the years, increasing the risk of losing important files. What's more, tech companies that swear by their commitment to their users, are [usually the first to wipe out their data on a whim](/posts/on-owning-your-data). So even cloud backups are 100% trust-worthy.

But even if you do keep your data locally on your computer, you still risk loosing it. Take an old family photo, for instance. If it gets corrupted, it might be years before you even realize the mishap, and by then, your backups could be long gone. Even with the best backup intentions, frequently changing providers or solutions often lead to the inadvertent purging of older files. Without meticulously checking every single photo, you risk discarding the only remaining copy. I've lost precious memories exactly this way, things I can never get back.

## So Why M-DISC?

[M-DISC](https://www.mdisc.com) (Millennial Disc) claims to offer a reliable solution, asserting a storage lifespan of up to 1,000 years. This longevity is a significant selling point for my archiving mission. That said, there's no way to accurately verify these claims. But at the very least I'm confident it will outlast me. Everything I've read seems to indicate that [these discs are quite robust and durable to extreme wear and tear](http://www.microscopy-uk.org.uk/mag/indexmag.html?http://www.microscopy-uk.org.uk/mag/artsep16/mol-mdisc-review.html).

DVDs and Blu-ray players remain ubiquitous, and logic suggests they'll be around for quite a while. CDs, which were invented nearly 40 years ago, are still readable today without issues. Betting on the continued existence of drives that can read discs feels like a sound decision.

To further ensure future accessibility though, I plan on purchasing an additional M-DISC compatible drive and, if necessary, an entire system specifically for running these drives. For now, disc drives are easily obtainable, but I'm hedging my bets. I'll store an extra drive for use if the day comes when these devices start becoming scarce.

## The Setup

I'm buying an internal LG Blu-ray writer ([WH16NS58DUP](https://a.co/d/fgXMYRn)), an external Pioneer Blu-ray writer ([BDR-XD08B](https://a.co/d/1ks1Qbc)) for redundancy, and a stack of 25GB Blu-ray M-DISCs from [Verbatim](https://a.co/d/je8ZJLw). Additionally, I'm looking into a small disc binder. The idea is to store it inside a safe that's water and fireproof.

Burning discs is straightforward with the right software. I'm considering either using [Burn](https://burn-osx.sourceforge.io/Pages/English/home.html) or [K3b](https://apps.kde.org/k3b/), depending on the OS. They are both reliable, free, and have stood the test of time. I'm deliberately avoiding fancy software like Nero SecurDisc since their tailored solutions might not be usable in the far-off future when I'm still accessing these M-DISCs.

For data integrity, I'll generate SHA-256 checksums via [shasum](https://linux.die.net/man/1/shasum). A copy for all files is included on the disc and with the source. This way, I can quickly verify the files' integrity and detect any corruption.

## Cost Considerations

Cost is a pivotal consideration when it comes to data archiving, and M-DISCs aren't exactly budget-friendly compared to standard optical discs. If you prize your digital memories and crucial data, though, the investment quickly becomes justifiable. Yes, the upfront price for an M-DISC is steeper, but when weighed against the potential cost of losing irreplaceable data, the value is clear; it's priceless.

Additionally, the need for specific hardware does bump up the total cost. But these expenses are largely one-time investments that offer the peace of mind of long-term data security. It's about paying a premium now to avoid the incalculable cost of data loss down the line.

## Practically Speaking

Nothing about this process screams convenience. Burning discs is labor-intensive, organizing and labeling them takes time, and securely storing them is another challenge. But I'm investing in my peace of mind. Knowing that my data has a shelf life longer than my own, barring physical destruction, is a rare gift in our digital age.

When it comes to organizing my data, I've been toying with a few different strategies, and I've kind of landed on a system that might just work. My collection includes a mix of data files, ebooks, audio, video, ROMs—you name it. Initially, I had everything categorized by type but without any chronological order. Not ideal, right?

So, I started thinking: What if I assigned hex values as serial numbers to each file? Each hex value could correspond to a unique entry in an SQLite database where all the relevant metadata is stored. It sounds more complicated than it is—hex values are compact and unique, making them perfect for serial numbers. Plus, SQLite is lightweight and widely supported.

By tying each file to a specific hex value that's logged in a database, I can easily track not just the type of file but also important details like the year, format, and any other metadata I find useful.

## Final Thoughts

Digital archiving has never been more critical, especially as we accumulate vast amounts of invaluable data. While M-DISC presents a robust option for those who prioritize long-term preservation, it's clear that this solution isn't accessible to everyone due to its higher initial costs and hardware requirements.

For many, employing a 3-2-1 backup strategy—keeping three copies of your data, stored on two different types of media, with one copy offsite—still remains a sound and practical approach. This method ensures that your data is safeguarded against various types of failures.

Ultimately, if you can invest in M-DISC, it provides unparalleled peace of mind for securing your most cherished memories and critical documents for centuries. However, regardless of the method you choose, the real key lies in having a reliable and thought-out backup strategy in place.