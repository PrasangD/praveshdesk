# PraveshDesk website (for clients)

The public website that coaching-class owners see: what PraveshDesk does, pricing, area pages
for Dombivli, Kalyan, Thane and nearby, a calculator, and a demo form.

Running cost: ₹0. It is a fully static Next.js site hosted free on Cloudflare Pages. The demo
form posts straight to your own Google Apps Script, which saves each request in a Google Sheet
and emails you.

```
Visitor ──> static page on Cloudflare Pages (demo / contact / calculator / area page form)
              │  browser POST (plain text, no server in between)
              ▼
        Google Apps Script web app
              ├─ checks fields, spam traps, Cloudflare Turnstile, hourly limits
              ├─ scores the request A/B/C and saves it to the "Leads" sheet
              ├─ emails you instantly with one-tap WhatsApp / call buttons
              ├─ auto-replies to the owner (if they gave an email)
              └─ reminders, 8 am digest, Monday summary
```

This repo is only the client website. Finding institutes to approach is a separate tool:
`praveshdesk-prospects`.

## What's inside

```
src/app/                 pages (home, features, solutions, pricing, how-it-works, about,
                         contact, demo, calculator, thank-you, privacy, terms, 404)
src/app/coaching-classes/[city]/   7 area pages, generated at build time
src/components/          Header, Footer, RegisterHero, LeadForm, Turnstile, LeakCalculator, ...
src/lib/site.ts          brand name, support windows, cancellation notice   <-- edit first
src/lib/cities.ts        area page content                                  <-- edit carefully
src/lib/pricing.ts faqs.ts features.ts lead-options.ts
public/_headers          security headers for Cloudflare Pages
apps-script/Code.gs      lead inbox: validation, spam checks, scoring, emails, reminders
apps-script/appsscript.json
```

## 1. Run locally

```bash
npm ci
cp .env.example .env.local   # fill in your details
npm run dev                  # http://localhost:3000
```

With `NEXT_PUBLIC_LEADS_ENDPOINT` empty, the form logs the request in the browser console and
shows the thank-you page, so you can work on the site before the Sheet exists.

`npm run build` writes the finished site to `out/`. Run it before every push.

## 2. Make it yours

- `.env.local` / Cloudflare environment variables: phone, WhatsApp number, email, your name.
  A Gmail address is fine until you have a domain.
- `src/app/about/page.tsx`: the founder story is a draft. Rewrite it in your own words and only
  claim what is true.
- `src/lib/pricing.ts`: keep `gstNote` accurate.
- `privacy` and `terms` are plain-language drafts. Get them reviewed by a lawyer.
- Check the name is free before you print anything: web search, domain search, and the
  trademark search on the IP India website. Renaming is one edit in `src/lib/site.ts`.

## 3. Lead inbox (Google Sheet + Apps Script), about 15 minutes

Use your own Google account, not your employer's.

1. Create a Google Sheet named `PraveshDesk Leads`.
2. Extensions → Apps Script. Replace `Code.gs` with `apps-script/Code.gs`. In Project Settings,
   tick "Show appsscript.json" and replace it with `apps-script/appsscript.json`.
3. Project Settings → Script Properties → add `OWNER_EMAIL`, `FOUNDER_NAME` and
   `WHATSAPP_NUMBER` (digits only, e.g. `919000000000`). Add `TURNSTILE_SECRET` after step 4.
4. Select `setup` → Run → approve permissions. Then select `testLead` → Run: you should get an
   alert email and see a row in the `Leads` tab. Delete that row.
5. Deploy → New deployment → **Web app** → Execute as **Me** → Who has access **Anyone** →
   Deploy. Copy the URL ending in `/exec`: this is `NEXT_PUBLIC_LEADS_ENDPOINT`.

The URL is visible in the page source; that is expected. The script itself checks every request
(required fields, Indian mobile format, consent, honeypot, minimum fill time, Turnstile, and at
most 30 requests an hour site-wide and 3 per phone number).

After editing `Code.gs`: Deploy → Manage deployments → edit → Version: New version. The URL
stays the same.

## 4. Spam protection with Cloudflare Turnstile (free)

1. Cloudflare dashboard → Turnstile → Add widget. Hostnames: your `*.pages.dev` address (and
   your own domain later). Mode: Managed.
2. Put the **site key** in `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (Cloudflare Pages variables).
3. Put the **secret key** in the Apps Script property `TURNSTILE_SECRET`.

Both must be set together. If only the site key is set, the widget shows but isn't checked; if
only the secret is set, every request fails the check.

## 5. Deploy free on Cloudflare Pages

1. Push this folder to a private GitHub repository.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Build settings: build command `npm run build`, output directory `out`.
4. Environment variables (Production): all the `NEXT_PUBLIC_*` values from `.env.example`.
   Set `NEXT_PUBLIC_SITE_URL` to `https://<project>.pages.dev` for now.
5. Save and deploy. Your site is live at `https://<project>.pages.dev`.
6. Submit the demo form yourself and check the Sheet row and email arrive.

Every push to your main branch rebuilds the site. Changing a variable needs a new deployment
(Deployments → Retry), because values are baked in at build time.

Own domain (optional, the only thing that costs money): buy a `.in` domain later, add it under
the Pages project's Custom domains, then update `NEXT_PUBLIC_SITE_URL` and the Turnstile
hostnames. Cloudflare Email Routing can forward `hello@yourdomain` to your Gmail for free.

## 6. After launch

- Google Search Console: add the site and submit `/sitemap.xml`.
- Google Business Profile: a service-area business based in Dombivli, address hidden.
- Tag links you share so the Sheet shows what works, for example
  `https://<site>/coaching-classes/kalyan?utm_source=whatsapp&utm_campaign=kalyan-visits`.
- Search traffic takes months. The area pages are most useful as follow-up links after a visit.
- Add a new area page only when you can really visit that area and have something true to say.
  Mass-produced near-identical city pages can hurt the whole site in Google.

## Security and privacy notes

- No server, no database, no analytics or advertising cookies. Browser session storage keeps the
  campaign tag for the current tab only.
- All checks that matter run in Apps Script; browser checks are only for convenience.
- Apps Script escapes cell values so form input can't become a spreadsheet formula, and it is
  idempotent on the request ID, so double-clicks never create duplicate rows.
- Each saved lead stores the consent timestamp.
