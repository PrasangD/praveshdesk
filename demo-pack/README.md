# Demo pack — "the Monday report that builds itself"

A working automation you can run on a laptop, offline, in front of anyone. No install, no
network, no accounts. Node 18 or newer is the only requirement.

```bash
cd demo-pack
node run.js              # run it
node run.js --explain    # also print every cleaning decision it made
open out/report.html     # the thing that lands in their inbox  (xdg-open on Linux)
```

## Why this scenario

Four branches email a daily sheet. Somebody spends Monday morning making them agree. It is the
most common first build there is, and almost every business recognises some version of it — the
branches might be depots, clients, salespeople, machines or franchisees.

The input in `inbox/` is deliberately realistic. Every defect in it is one you will actually be
handed:

| In the files | Why it matters |
| --- | --- |
| Three date formats (`2026-09-14`, `14/09/2026`, `15-09-2026`) | Each branch's system exports differently |
| `dombivli `, `AMBERNATH`, `Thane ` | The same branch becomes three branches in a pivot table |
| `₹18,900`, `  24,500 ` | Currency symbols and spaces break naive parsing |
| `16.800` | A full stop as a thousands separator. `parseFloat` makes it **16.8** and the report is quietly wrong by ₹16,783 |
| `INV-1005` twice | Sent again "just in case", counted twice by hand |
| A row with no branch | Someone was in a hurry |
| `qty` of `0` and `-2` | A cancellation and a return, entered as sales |

## How to run it in a meeting

**1. Show them the input first.** Open one of the `inbox/*.csv` files. Say: *"This is what your
branches send you. Does this look familiar?"* They will usually laugh, then say something worse
about their own data. Let them.

**2. Ask what happens next.** *"Who turns this into the report, and how long does it take?"* Write
the answer down — hours per week, and who. That is the number for the calculator later.

**3. Run it.** `node run.js`. It finishes in single-digit milliseconds. Do not rush past that:
sit with the contrast between "about three hours, every week" and what just happened.

**4. Go to the exceptions.** This is the part that closes the deal, not the total. Point at:

> needs a human    INV-1007 — No branch on the row

and say: *"It did not guess. It will never quietly average away a row it cannot read. Everything
it is unsure about comes back to a person, named."* Most people have been burned by a spreadsheet
that silently did the opposite.

**5. Run `--explain`.** Ten lines showing every silent correction it made — the date formats, the
branch names, and `16.800 → 16800`. Then ask: *"How many of those would someone catch by eye, at
five o'clock, every week, forever?"*

**6. Open `out/report.html`.** *"That is what arrives in your inbox at six on Monday. You read
it. Nobody made it."*

**7. Stop selling.** Ask what their version of this is, and write it down. That is the audit.

## What to say when they ask "can you do it with our data?"

Yes, and offer it before they push: send a sample file with the sensitive parts removed, and
you will rebuild this demo on their real shape of data before anyone has paid anything. It costs
you an evening and it is the single most effective thing in the whole kit.

## What this demo is not

Be first to say this — it is more convincing than being caught:

- **It has no schedule or alerting here.** The real version runs at a time they pick, keeps a log
  of every run, and messages someone if a branch file never arrives. Boring to watch, which is
  the point.
- **The rules are specific to this data.** Theirs will differ. Working out the rules *is* the
  build, and it is why the audit comes before the quote.
- **It is small on purpose.** Roughly a "quick win": ₹18,000–₹45,000, three to seven working days.

## Files

```
run.js                  the automation — plain Node, no dependencies, ~270 lines they can read
inbox/*.csv             what the four branches send
out/report.html         generated; safe to delete, regenerated on every run
```

`run.js` is deliberately readable. If a technical person asks to see it, hand them the laptop —
that it is short and boring is the argument.

The same pipeline runs on the website at `/demo`, in the browser. The rules live in
`src/lib/demo-pipeline.ts` there; keep the two in step if you change them, and check the totals
still match (11 accepted, 3 set aside, 1 duplicate, ₹2,11,200).
