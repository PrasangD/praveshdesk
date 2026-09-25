# Getting found, for ₹0

Read this first, because it corrects the assumption behind "a site that needs no marketing":

**A website does not generate leads. Traffic generates leads; the website converts it.** No page,
however well built, is discovered on its own. Google has to be told it exists, and then it has to
decide you deserve to outrank people who have been publishing for years.

Realistic timeline, stated plainly so you can plan:

| When | What actually happens |
| --- | --- |
| Days 1–3 | Site indexed. Traffic: you, and whoever you send. |
| Weeks 1–4 | First Google Business Profile views. Maybe a handful of long-tail visits. |
| Months 2–3 | The area pages start appearing for specific phrases. First organic enquiry is realistic here. |
| Months 4–6 | Compounding, if you have kept publishing and collecting reviews. |

So: **the site is the closer, not the opener.** Everything below is free, and the first four
matter more than the rest combined.

---

## The four that matter

### 1. Google Business Profile — the single highest-value free thing

More local B2B enquiries come from Maps than from web search, and almost nobody in this space
does it properly.

- Create at [business.google.com](https://business.google.com) as a **service-area business** —
  no street address shown, which is what you want.
- Service areas: Dombivli, Kalyan, Thane, Navi Mumbai, Ulhasnagar, Ambernath, Badlapur.
- Category: *Software company*. Secondary: *Business management consultant*, *Computer consultant*.
- Add all ten services with descriptions — they are lifted straight from `src/lib/automations.ts`.
- **Post weekly.** Posts are a ranking signal almost nobody uses. One screenshot of a run log and
  two sentences is enough.
- **Reviews are the whole game.** Ask every client, every time, the day something goes live. Five
  detailed reviews mentioning "automation" and a place name will outrank a dozen generic ones.

### 2. Search Console and Bing Webmaster Tools — day one

- [search.google.com/search-console](https://search.google.com/search-console): add the property,
  submit `/sitemap.xml`, then **request indexing** on the home page and the ten area pages by
  hand. Do not wait to be crawled.
- [bing.com/webmasters](https://www.bing.com/webmasters): same. Bing is a rounding error for
  traffic and it feeds ChatGPT search, which increasingly matters.
- Check Search Console weekly. The *Queries* report tells you the phrases people actually used —
  which is how you decide what to write next, instead of guessing.

### 3. LinkedIn — from your personal profile, not a company page

Company pages with no followers reach nobody. Your personal profile already has colleagues who
know you automate things.

- Headline: *DevOps engineer · I automate the jobs companies still do by hand · Dombivli*
- Featured section: the demo link and the calculator link.
- **Post twice a week for six weeks.** The format that works is not a pitch:
  - A job, named. *"Somebody at a company near Thane spends three hours every Monday turning four
    branch files into one report. Here is what the input actually looks like."* + a screenshot.
  - A number. *"A full stop used as a thousands separator turned ₹16,800 into ₹16.80 in a report
    nobody checked. This is why validation goes in before the pretty output."*
  - An honest no. *"Asked to automate something that runs twice a year and takes an hour. Told
    them not to bother."* This post type outperforms everything else.
- Comment on posts by finance, operations and manufacturing people in Thane and Navi Mumbai. Ten
  useful comments beats one post.

### 4. The people who already sell to your clients

The fastest route to your first five clients, and it costs nothing.

- **Chartered accountants.** They see every client's messy spreadsheets and reconciliation misery.
  One CA who likes you is worth more than a month of cold email. Offer them something simple: you
  will look at any client's process free, and if it is not worth automating you will say so.
- **IT hardware and networking vendors** around Dombivli and Ambernath MIDC — they are already
  inside those offices and they do not do this work.
- **Tally and ERP implementers.** They get asked for integrations constantly and usually decline.
- **Your own network first.** Tell every person you know, in plain words, what you are now doing.
  Most first clients come from somebody who already trusted you.

---

## Worth doing, in this order

**Directories.** Free listings, decent for local intent: JustDial, IndiaMART, Sulekha. Also
Clutch and GoodFirms (free profiles, they rank well for "automation company India"). One evening
of typing, done once.

**WhatsApp Business.** Free app. Set a business profile with your website, a short description
and the catalogue — "Automation audit ₹9,999", "Quick win ₹18,000–45,000". Use Status to post
the same things you post to LinkedIn; your local contacts see it there and nowhere else.

**Open-source the demo pack.** Push `demo-pack/` as its own public repo — "a dependency-free Node
script that cleans four messy branch files and builds a report". Developers find it, it earns a
backlink from GitHub, and it is genuine proof you can write code. Link it from the site.

**Answer questions in public.** r/developersIndia, r/india, Quora, and the Indian sysadmin and
accounting groups on Reddit and Facebook. Do not pitch. Answer the question properly, and let the
profile do the work. This compounds slowly and permanently.

**YouTube, two-minute screen recordings.** Run the demo. Narrate it. No editing, no intro music.
"Cleaning four messy branch files into one report" is a phrase people search and nobody has made
a decent video about. Embed it on `/demo`.

**Local business associations.** MIDC industry associations at Dombivli, Ambernath and Badlapur,
plus Rotary, JCI and Lions in Dombivli and Kalyan. One introduction from inside beats fifty
emails. Offer to speak for fifteen minutes on "what is worth automating and what is not" — you
already have the talk, it is `/automations` plus the demo.

---

## What to write next, and why

The ten area pages target phrases people actually type. To keep compounding, add one page a month
answering a real question. Check the *Queries* report in Search Console first, then write about
what is already almost ranking.

Good candidates, all low-competition and high-intent:

- *How much does it cost to automate a business process in India?* — nobody publishes prices, and
  you already do
- *Can you automate Tally / Busy / an ERP that has no API?*
- *Google Sheets vs a real database for a small business*
- *What to automate first in a manufacturing unit*
- *How to check whether an automation is worth building* — this is your calculator, written out

Write them as `src/lib/automation-guides.ts` entries or new pages under `src/app/`. Each one is a
new entry point, and entry points are the only thing that compounds.

---

## What not to do

- **Do not buy backlinks or use a "SEO package".** In this market you will be offered one weekly.
  It buys spam links, and recovery costs more than the package did.
- **Do not spin near-identical pages** for every area × city combination. Seventy thin pages is a
  doorway-page pattern and will damage the whole domain. Ten deep pages and seven honest area
  pages is deliberately where this stops.
- **Do not bulk WhatsApp or buy lists.** Your own site says you refuse to build it. Doing it
  yourself ends the argument you are making.
- **Do not pay for ads yet.** Not because ads do not work — because you do not yet know which
  phrase converts. Spend two months learning that free from Search Console, then buy the
  three phrases that actually worked.

---

## The first weekend

Deployment steps are in `DEPLOY.md`. This is the marketing half.

**Friday** — Site live. Search Console and Bing verified, sitemap submitted, indexing requested
for the home page and all ten area pages. Google Business Profile created and submitted for
verification (it takes a few days — start it first).

**Saturday** — LinkedIn headline and Featured section updated, first post published. WhatsApp
Business profile set up. JustDial, IndiaMART and Sulekha listings created. Message ten people you
already know, individually, telling them what you are now doing.

**Sunday** — Print ten copies of `pitch-kit/02-one-pager.md`. List twenty local targets with a
named person where you can find one. Send the first five emails from `pitch-kit/01-outreach.md`.

Then: two LinkedIn posts and five approaches a week, every week. The site compounds on its own
from there — but only if you keep feeding it.
