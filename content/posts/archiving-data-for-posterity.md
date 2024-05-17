---
title: "Archiving Data for Posterity: My Move to M-DISC"
og: "Archiving Data for Posterity"
description: ""
date: 2024-05-10
tags:
  - archiving
draft: true
---

I've been thinking a lot about data preservation. Our digital lives are an ever-expanding universe of photos, videos, documents, and more. But what happens when this digital treasure trove is threatened by the impermanence of modern storage solutions? Enter the M-DISC.

This technology promises something that resonates deeply with anyone who cherishes their digital memories: longevity. We're talking up to 1,000 years. But before diving into the specifics, let's explore the reason behind my choice, cost considerations, practicality, and the pros and cons of this intriguing tech.

## The Purpose and Rationale

It dawned on me that our digital lives are fragile. One moment you have precious family photos securely saved, and the next, they could be lost to a corrupt hard drive or an overlooked deletion. Many of us rotate through backup solutions and providers over the years, increasing the risk of losing important files.

Take an old family photo, for instance. If it gets corrupted, it might be years before you're even aware of the mishap, and by then, your backups could be long gone. Even with the best backup intentions, changing providers or solutions often leads to the inadvertent purging of older backups. Without meticulously checking every single photo, you risk discarding the only remaining copy.

## Why M-DISC?

M-DISC (Millennial Disc) claims to offer a reliable solution, asserting a storage lifespan of up to 1,000 years. This longevity is a significant selling point for my archiving mission. DVDs and Blu-ray players remain ubiquitous, and logic suggests they'll stay around for quite a while. CDs, which were invented nearly 40 years ago, are still readable today without issues. Betting on the continued existence of reading devices for M-DISCs feels like a sound decision.

To further ensure future accessibility, I plan on purchasing an additional M-DISC compatible drive and, if necessary, an entire system specifically for running these drives. For now, DVD drives are easily obtainable, but I'm hedging my bets. I'll store an extra drive for use if the day comes when these devices start becoming rare.

## The Hardware Setup

For this project, I initially got an LG M-DISC Blu-ray writer and a mix of 25GB Blu-ray M-DISCs and 4.7GB DVD M-DISCs. Some years I didn't take many pictures, so it made no sense to waste the capacity and cost of a Blu-ray when a DVD would suffice. Dual disc cases for storage were also essential, given that some archives might exceed a single disc's capacity.

My hardware journey included using a USB 3.0 to SATA adapter. The model I owned didn't support optical drives, leading to the purchase of a Vantec CB-ST00U3 specifically designed for such purposes. Later, this setup evolved to include an eSATA to SATA cable, powered by a standalone Molex PSU, connected to my ESXi box for seamless integration and use.

## Cost Considerations

Cost is a critical factor. M-DISCs are not cheap compared to regular optical discs. However, for anyone who values their digital memories and data, the investment feels justified. Think about it: a thousand years. The price of an M-DISC might be higher now, but what is the cost of potentially losing irreplaceable data? Priceless.

Moreover, the additional hardware—whether adapters, drives, or cases—adds to the final cost. But these expenses are one-time investments when balanced against the assurance of long-term data security.

## The Software

Burning discs is straightforward with the right software. I've chosen ImgBurn for the task. It's reliable and has stood the test of time, making it my go-to tool for creating these archival discs. I deliberately avoid fancy software like Nero SecurDisc since their tailored solutions might not be usable in the far-off future when we're still accessing these M-DISCs.

For data integrity, I'm employing RapidCRC. This program generates CRC records for all files, which are then included on the disc. This way, I can quickly verify the files' integrity and detect any corruption.

## Practically Speaking

Let's face it, nothing about this process screams convenience. Burning discs is labor-intensive, organizing and labeling them takes time, and securely storing them is another challenge. Yet, here's the practicality kicker: it's peace of mind. Knowing that your data has a shelf life of centuries, barring physical destruction, is a rare gift in our digital age.

As an organization strategy, I've decided to archive by year. This means burning entire yearly folders to discs, including the CRC hash files for integrity checks. Sure, it's a bit annoying to handle supplementary archives if I add more pictures later, but it's a minor inconvenience to ensure a methodical and organized system.

## Pros and Cons

**Pros:**
- Longevity: With a purported lifespan of up to 1,000 years, M-DISCs offer unparalleled data preservation.
- Durability: M-DISCs withstand environmental factors better than other storage media.
Peace of Mind: Secure in knowing that your digital memories are safe for generations.

**Cons:**
- Cost: Higher upfront expense for both the discs and compatible hardware.
- Convenience: Time-consuming to burn, organize, and store.
- Compatibility Concerns: While DVD/Blu-ray players are common now, there's no absolute certainty they'll remain so for centuries.

## Final Thoughts

In the grand scheme, M-DISC provides a unique and valuable solution for long-term data preservation. The initial cost and effort involved in setting up and maintaining an M-DISC archive are outweighed by the security of knowing that your important data is safe for hundreds of years.

While the M-DISC approach is not without its drawbacks, it is currently one of the best options available for those who prioritize the longevity of their digital assets. For archiving treasured family photos and critical documents, the reassurance M-DISC offers is worth every penny and every minute invested.

So, fellow data aficionados, if you're contemplating a long-term archival solution, give M-DISC a serious consideration. It might just be the best decision you make for your digital legacy.

---

Happy archiving!