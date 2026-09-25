# Deploy by Sunday

Everything here is free. Budget about **90 minutes**, most of it waiting for DNS and
verification. Do it in this order — steps 1–4 have to finish before the site is useful.

Anything marked **you must do this** needs your own accounts and cannot be done for you.

---

## 0. Before you start (10 min) — **you must do this**

**Decide the name.** The code now says **Kaamless**. `kaamless.com` was free when this was
written (checked against Verisign's registry), and there is no company trading under that name
that I could find. Re-check both before you commit — availability changes daily:

- Domain: any registrar's search
- Company name: [mca.gov.in](https://www.mca.gov.in) and a plain web search
- Trademark: [ipindia.gov.in](https://ipindiaonline.gov.in/tmrpublicsearch/) — free public search

If you want something else instead, it is one line: `name` in `src/lib/site.ts`. Do it **before**
you print anything or create the Google Business Profile.

**Get these ready:**

| | |
| --- | --- |
| A Gmail account for the business | Not your employer's. Everything hangs off this. |
| Your WhatsApp business number | Digits with country code, no `+` → `919876543210` |
| Your contact email | The Gmail above is fine to start |

---

## 1. The lead inbox (25 min) — do this first

Nothing else matters if the form does not reach you. Full detail is in `README.md` §3; the short
version:

1. New Google Sheet named `Kaamless Leads`.
2. **Extensions → Apps Script.** Replace `Code.gs` with the contents of `apps-script/Code.gs`.
   In **Project Settings**, tick *Show appsscript.json* and replace that too.
3. **Project Settings → Script Properties**, add four:

   | Property | Value |
   | --- | --- |
   | `OWNER_EMAIL` | where alerts go |
   | `FOUNDER_NAME` | your name, used in the WhatsApp draft and the auto-reply |
   | `WHATSAPP_NUMBER` | `919876543210` |
   | `SITE_URL` | `https://kaamless.pages.dev` — no trailing slash |

4. Run `setup` → approve permissions. Then run `testLead`.
   **Check:** an alert email arrives, and a row appears in the `Leads` tab. Delete the test row.
5. **Deploy → New deployment → Web app.** Execute as **Me**, access **Anyone**. Copy the URL
   ending in `/exec`.

> If `testLead` fails, fix it now. A broken inbox on a live site loses leads silently, which is
> the one failure mode with no warning.

---

## 2. GitHub (5 min)

Already done — the code is at `github.com/PrasangD/praveshdesk`. Two optional tidies:

- Rename the repo to `kaamless` (Settings → Repository name). GitHub redirects the old URL, so
  nothing breaks. Then `git remote set-url origin https://github.com/PrasangD/kaamless.git`.
- **Consider making it private.** It currently contains `pitch-kit/`, which is your sales
  material — your outreach scripts, your pricing logic and your objection handling. Nothing in it
  is dangerous, but a competitor reading it is a real if small downside. Settings → General →
  Danger Zone → Change visibility.

---

## 3. Cloudflare Pages (20 min) — **you must do this**

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages →
   Connect to Git** → pick the repo.
2. Build settings:

   | Setting | Value |
   | --- | --- |
   | Framework preset | None |
   | Build command | `npm run build` |
   | Output directory | `out` |
   | Node version | `22` (add env var `NODE_VERSION` = `22`) |

3. **Environment variables (Production)** — all seven from `.env.example`:

   ```
   NEXT_PUBLIC_SITE_URL=https://kaamless.pages.dev
   NEXT_PUBLIC_CONTACT_PHONE=+91 98765 43210
   NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
   NEXT_PUBLIC_CONTACT_EMAIL=you@gmail.com
   NEXT_PUBLIC_FOUNDER_NAME=Your Name
   NEXT_PUBLIC_LEADS_ENDPOINT=<the /exec URL from step 1>
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=
   ```

4. **Save and Deploy.** Live at `https://<project>.pages.dev` in about two minutes.

> These are baked in at build time. Changing one later needs a redeploy
> (Deployments → Retry), not just a save.

**Test it properly before moving on:** open the live site on your phone, submit the form, and
confirm a row lands in the Sheet and the alert email arrives. Then check the auto-reply arrived
at whatever email you used, with the demo and calculator links in it.

---

## 4. Spam protection (10 min)

Do this before you publicise anything — a public form with no protection gets found within days.

1. Cloudflare dashboard → **Turnstile → Add widget**. Hostname: your `pages.dev` address. Mode:
   Managed.
2. **Site key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in Pages env vars → redeploy.
3. **Secret key** → Apps Script → Script Properties → `TURNSTILE_SECRET`. Redeploy the web app
   (Deploy → Manage deployments → edit → New version).

Both or neither. Site key alone shows the widget without checking it; secret alone fails every
submission.

---

## 5. Tell Google it exists (15 min) — the step people skip

Nothing is indexed until you do this, and indexing is not automatic.

1. **Search Console** → add property (URL prefix, your pages.dev address) → verify via the HTML
   tag, which goes in `src/app/layout.tsx` metadata, or via Cloudflare DNS if you have a domain.
2. Submit `https://<your-site>/sitemap.xml`.
3. **URL Inspection → Request indexing**, one at a time, for:
   `/`, `/automations`, `/demo`, `/pricing`, `/calculator`, and all ten `/automations/<area>`
   pages. Tedious, takes ten minutes, and is the difference between being indexed this week and
   next month.
4. **Bing Webmaster Tools** → import from Search Console (one click).

## 6. Google Business Profile (10 min, then wait)

Start it now because verification takes days. Full detail in `MARKETING.md` §1.

---

## Own domain — optional, the only thing that costs money

A `.com` is roughly ₹900/year. Worth it before you print business cards; not worth delaying
launch for.

1. Buy it, add it to Cloudflare (free plan), point the nameservers.
2. Pages project → **Custom domains** → add it.
3. Update `NEXT_PUBLIC_SITE_URL` → redeploy. Update `SITE_URL` in Apps Script.
4. Add the domain to Turnstile hostnames.
5. Add the new domain as a separate Search Console property and resubmit the sitemap.
6. **Cloudflare Email Routing** (free) forwards `hello@yourdomain` to your Gmail.

---

## Done checklist

- [ ] Name decided; domain and trademark checked
- [ ] Apps Script deployed; `testLead` produced a row and an email
- [ ] Cloudflare Pages live, all seven env vars set
- [ ] **Form submitted from a phone; row in Sheet; alert email; auto-reply received**
- [ ] Turnstile keys in both places
- [ ] Sitemap submitted; indexing requested for all 15 pages
- [ ] Google Business Profile submitted for verification
- [ ] `node demo-pack/run.js` works on the laptop you take to meetings
- [ ] Ten copies of the one-pager printed

## If something breaks

| Symptom | Cause |
| --- | --- |
| Build fails on Cloudflare | Node version. Set `NODE_VERSION` = `22`. |
| Form says "not connected yet" | `NEXT_PUBLIC_LEADS_ENDPOINT` empty or not redeployed after setting it |
| Form submits, no row | Apps Script not deployed as **Anyone** access, or deployed without a new version after an edit |
| Spam check always fails | Site key set, secret missing — or the other way round |
| Phone number wrong in WhatsApp links | `NEXT_PUBLIC_WHATSAPP_NUMBER` needs digits only, no `+`, no spaces |
| Site live but not on Google | Normal for days 1–3. Did you actually request indexing? |
