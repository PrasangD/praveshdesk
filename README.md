# Kaamless

Automation, built to order, for companies and institutes around Dombivli, Thane and Navi Mumbai.
One process at a time, a fixed price per job, built on the client's own systems and handed over
with the code.

This repository holds three separate things, plus two runbooks:

| | What it is | Who sees it |
| --- | --- | --- |
| **`src/`** | The public website | Anyone |
| **`demo-pack/`** | A working automation you run on a laptop in front of a prospect | Clients, in the room |
| **`pitch-kit/`** | Outreach, discovery, audit, proposal and quoting templates | Only you |
| **[`DEPLOY.md`](DEPLOY.md)** | Getting it live, step by step, in about 90 minutes | Only you |
| **[`MARKETING.md`](MARKETING.md)** | Every free way to get found, in priority order | Only you |

**Start with [`DEPLOY.md`](DEPLOY.md).** Then [`MARKETING.md`](MARKETING.md) — the site converts
traffic, it does not create it, and that document is honest about the timeline.

Running cost: ₹0. The website is a fully static Next.js site hosted free on Cloudflare Pages. The
contact forms post straight to your own Google Apps Script, which saves each request in a Google
Sheet and emails you.

```
Visitor ──> static page on Cloudflare Pages (any page with a form)
              │  browser POST (plain text, no server in between)
              ▼
        Google Apps Script web app
              ├─ checks fields, spam traps, Cloudflare Turnstile, hourly limits
              ├─ scores the request A/B/C and saves it to the "Leads" sheet
              ├─ emails you instantly with one-tap WhatsApp / call buttons
              ├─ auto-replies to the sender (if they gave an email)
              └─ reminders, 8 am digest, Monday summary
```

## The offer the site sells

1. **An automation audit, ₹9,999.** Half a day watching how the work is really done, then a
   written report: each process costed, what to automate, what to fix without code, what to leave
   alone. Credited in full against the first build.
2. **Builds at a fixed price.** Quick win ₹18,000–₹45,000. Connected module ₹60,000–₹1,80,000.
   System from ₹2,50,000, staged.
3. **Care plans, optional,** from ₹4,999/month.

Everything runs on the client's systems and is handed over with the code, the credentials and
written notes. `src/lib/pricing.ts` is the single source of truth for every number above — change
it there and the whole site follows.

## What's inside

```
src/app/                 pages (home, automations, demo, how-it-works, pricing, who-its-for,
                         calculator, about, contact, thank-you, privacy, terms, 404)
src/app/automations/[area]/           10 deep topic pages, generated at build time  <-- the SEO
src/app/automation-services/[city]/   7 service-area pages, generated at build time
src/components/          Header, Footer, RunLog, RequestForm, DemoRunner, SavingsCalculator,
                         AutomationCatalogue, PricingPlans, Turnstile, ...
src/lib/site.ts          brand name, contact details, capacity              <-- edit first
src/lib/automations.ts   the automation catalogue + what you refuse to build <-- your sales list
src/lib/pricing.ts       every price on the site                             <-- your rate card
src/lib/sectors.ts       who it's for, and who it isn't
src/lib/cities.ts        service-area page content                           <-- edit carefully
src/lib/automation-guides.ts  long-form content for the 10 area pages    <-- write more of these
src/lib/savings.ts       the arithmetic behind /calculator
src/lib/demo-pipeline.ts the automation that runs live on /demo
src/lib/faqs.ts request-options.ts metadata.ts
public/_headers          security headers for Cloudflare Pages
public/llms.txt          a plain summary for AI search engines
apps-script/Code.gs      request inbox: validation, spam checks, scoring, emails, reminders
demo-pack/               the offline demo — see demo-pack/README.md
pitch-kit/               the sales material — see pitch-kit/README.md
```

### The automation catalogue

`src/lib/automations.ts` is the file to edit as you learn what clients actually ask for. Ten
groups — reports, data between systems, documents, spreadsheets, deployments, cloud cost,
monitoring, joiners and leavers, approvals, and institute back-office — each a list of
`{ title, body }`: the manual job named the way the person stuck with it would say it, and what
replaces it.

Each group is tagged `audience: "company" | "institute" | "both"`, which drives the filter on
`/automations`. The page counts the items itself, so adding one updates every headline number on
the site.

Three rules when editing it:

1. **Every line is a job somebody does today**, not a feature name. "Copying yesterday's totals
   into a slide" beats "reporting automation".
2. **Keep `willNotBuild`.** Impersonation, unofficial bulk messaging, scraping other people's
   data, quiet redundancy automation, and any system only you can maintain. It is the reason the
   rest of the page is believed.
3. **Do not contradict `notFor` in `src/lib/sectors.ts`.** That list says who this is not for, and
   a catalogue entry promising something it rules out will be caught on the first call.

## 1. Run locally

```bash
npm ci
cp .env.example .env.local   # fill in your details
npm run dev                  # http://localhost:3000
```

With `NEXT_PUBLIC_LEADS_ENDPOINT` empty, the form logs the request in the browser console and
shows the thank-you page, so you can work on the site before the Sheet exists.

`npm run build` writes the finished site to `out/`. `npm run typecheck` before every push.

## 2. Make it yours

- **`.env.local` / Cloudflare environment variables:** phone, WhatsApp number, email, your name.
  A Gmail address is fine until you have a domain.
- **`src/lib/site.ts`:** `founderName`, `founderRole`, support windows, and `concurrentBuilds` —
  the number of builds you take at a time, which appears on the pricing and about pages as an
  honest capacity limit.
- **`src/app/about/page.tsx`:** the story is a draft. Rewrite it in your own words after your
  first few conversations, and only claim what is true.
- **`src/lib/pricing.ts`:** your rate card. Keep `gstNote` accurate. `pitch-kit/06-quoting.md`
  explains how the bands and the ₹12,000 day rate relate, so change them together.
- **`privacy` and `terms`** are plain-language drafts covering audits, fixed-price builds, IP and
  handover. Get them reviewed by a lawyer before relying on them.

### The name

**Kaamless** — *kaam* (work) with *less* on the end. It replaced PraveshDesk, which meant
"admission desk" and no longer matched what is sold here.

`kaamless.com` was unregistered when this was written (checked against Verisign's registry) and
no company appears to be trading under the name. **Re-check both before you commit to it** —
availability changes daily, and the trademark search at
[ipindiaonline.gov.in](https://ipindiaonline.gov.in/tmrpublicsearch/) is free.

Changing it again is one line: `name` in `src/lib/site.ts`. The logo mark in
`src/components/Logo.tsx` is a loop with a tick — it carries no wordmark, so it survives a rename.

### Why there are ten area pages

`/automations/<area>` is where the organic traffic is supposed to come from. "Automation
services" is a phrase nobody searches and everybody sells; "automate excel reconciliation" is a
phrase one specific person types at 6pm when they have had enough.

Each page has unique long-form content in `src/lib/automation-guides.ts` — intro, symptoms,
approach, a worked example with real arithmetic, and three FAQs — plus Service, FAQPage and
BreadcrumbList structured data. `generateStaticParams` throws at build time if a group has no
guide, so a group can never silently disappear from the site.

**Do not generate area × city combinations.** Seventy near-identical pages is a doorway-page
pattern that will damage the whole domain. Ten deep pages and seven honest city pages is
deliberately where this stops.

## 3. Request inbox (Google Sheet + Apps Script), about 15 minutes

Use your own Google account, not your employer's.

1. Create a Google Sheet named `Kaamless Leads`.
2. Extensions → Apps Script. Replace `Code.gs` with `apps-script/Code.gs`. In Project Settings,
   tick "Show appsscript.json" and replace it with `apps-script/appsscript.json`.
3. Project Settings → Script Properties → add `OWNER_EMAIL`, `FOUNDER_NAME` and
   `WHATSAPP_NUMBER` (digits only, e.g. `919000000000`). Add `TURNSTILE_SECRET` after step 4.
4. Select `setup` → Run → approve permissions. Then select `testLead` → Run: you should get an
   alert email and see a row in the `Leads` tab. Delete that row.

   **On a sheet that already has rows in it, do not just re-run `setup`.** It rewrites the header
   row in place, so a changed column set shifts every label while the data underneath stays put.
   The column set changed substantially in the automation rewrite — start a fresh sheet unless you
   have data worth migrating by hand.
5. Deploy → New deployment → **Web app** → Execute as **Me** → Who has access **Anyone** →
   Deploy. Copy the URL ending in `/exec`: this is `NEXT_PUBLIC_LEADS_ENDPOINT`.

Every form asks **what would you like automated first?**, so each request lands tagged with one of
the catalogue areas, `Something else` (read the message — they have described a job in their own
words, and it scores highest), or `Not sure yet`. It also captures organisation size and how many
hours the job takes now, which is the single best predictor of whether a build pays for itself —
the scoring in `Code.gs` weights it accordingly.

Field values must stay in step across three files: `src/lib/request-options.ts`,
`src/lib/automations.ts` (the group ids) and `LABELS` in `apps-script/Code.gs`. Add an option in
one and you must add it in the others, or the answer silently falls back to its default.

The `/exec` URL is visible in the page source; that is expected. The script itself checks every
request (required fields, Indian mobile format, consent, honeypot, minimum fill time, Turnstile,
and at most 30 requests an hour site-wide and 3 per phone number).

After editing `Code.gs`: Deploy → Manage deployments → edit → Version: New version. The URL stays
the same.

## 4. Spam protection with Cloudflare Turnstile (free)

1. Cloudflare dashboard → Turnstile → Add widget. Hostnames: your `*.pages.dev` address (and your
   own domain later). Mode: Managed.
2. Put the **site key** in `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (Cloudflare Pages variables).
3. Put the **secret key** in the Apps Script property `TURNSTILE_SECRET`.

Both must be set together. If only the site key is set, the widget shows but isn't checked; if
only the secret is set, every request fails the check.

## 5. Deploy free on Cloudflare Pages

1. Push this folder to a GitHub repository.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Build settings: build command `npm run build`, output directory `out`.
4. Environment variables (Production): all the `NEXT_PUBLIC_*` values from `.env.example`. Set
   `NEXT_PUBLIC_SITE_URL` to `https://<project>.pages.dev` for now.
5. Save and deploy. Your site is live at `https://<project>.pages.dev`.
6. Submit a form yourself and check the Sheet row and the email arrive.

Every push to your main branch rebuilds the site. Changing a variable needs a new deployment
(Deployments → Retry), because values are baked in at build time.

Own domain (optional, the only thing that costs money): buy a domain later, add it under the Pages
project's Custom domains, then update `NEXT_PUBLIC_SITE_URL` and the Turnstile hostnames.
Cloudflare Email Routing can forward `hello@yourdomain` to your Gmail for free.

## 6. After launch

- Google Search Console: add the site and submit `/sitemap.xml`.
- Google Business Profile: a service-area business based in Dombivli, address hidden.
- Tag links you share so the Sheet shows what works, for example
  `https://<site>/automation-services/thane?utm_source=whatsapp&utm_campaign=wagle-estate`.
- Search traffic takes months. The service-area pages are most useful as follow-up links after a
  visit, not as a source of strangers.
- Add a new area page only when you can really work there and have something true to say. Mass
  produced near-identical city pages can hurt the whole site in Google.

## Security and privacy notes

- No server, no database, no analytics or advertising cookies. Browser session storage keeps the
  campaign tag for the current tab only.
- The calculator runs entirely in the browser; nothing is sent unless the form is submitted.
- All checks that matter run in Apps Script; browser checks are only for convenience.
- Apps Script escapes cell values so form input can't become a spreadsheet formula, and it is
  idempotent on the request ID, so double-clicks never create duplicate rows.
- Each saved request stores the consent timestamp.
