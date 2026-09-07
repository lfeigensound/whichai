# whichai

Which AI, when — a personal reference site. No build step, no dependencies, no backend.

```
index.html      landing page — the on-the-spot decision only
which-ai.html   full Gemini/Claude split, trigger words, workflow
models.html     Claude models, limits, extended thinking, Projects
prompting.html  how to ask, with good and bad real examples
setup.html      one-time setup
style.css       shared styling
app.js          font + size controls
```

---

## Why this repo is public

GitHub Pages requires a public repository on the free plan — a private repo's
site stops being served if the account ever drops from Pro to Free. This repo
is public **only** for that reliability reason, not because the content is
meant to be found or shared.

Two things make it private-in-practice rather than private-in-name:

1. **`LICENSE`** — all rights reserved. Being visible on GitHub does not by
   itself grant anyone permission to copy or reuse this; the license makes
   that explicit rather than leaving it ambiguous.
2. **`noindex, nofollow`** on every page — keeps it out of search engines.

This is obscurity, not secrecy. Nothing sensitive belongs in this repo —
no client names, no confidential documents, nothing that would matter if
someone did stumble onto the URL.

---

## Hosting

Settings → Pages → Source: `Deploy from a branch` → `main` / `(root)`.
Live at `https://lfeigensound.github.io/whichai/` a minute or two after the
first push.

**Keeping it low-profile:** don't add repo topics or a description (both
surface in GitHub's public search), and don't pin or star it from a profile
that's linked elsewhere.

---

## Reading adjustments

Every page has a sticky bar: three fonts (Atkinson Hyperlegible,
OpenDyslexic, Lexend), A− / A+ sizing, and Print. The choice persists across
pages via local storage where the browser allows it, and falls back to
defaults silently if not.

---

## Filling in the gaps

Sections marked with a **dashed border** are placeholders:

- Gemini Notebook step-by-step and current limits
- Deep Research — how to run one properly
- Your own trigger words
- Your standing brief (paste the real text)
- Which bulletins you actually subscribed to

Edit the HTML directly — replace the `<div class="todo">` block with a
`<div class="card">` block and write the content.

---

## What's verified and what isn't

**Verified against primary sources:** Claude's Dyslexic Friendly font
setting, Projects switching to retrieval mode as knowledge grows, current
model names (Opus 5, Sonnet 5, Haiku 4.5, Fable 5.1), GitHub Pages
public/private rules, Public Contracts Scotland's below-threshold coverage,
legislation.gov.uk's API and Scottish Acts coverage.

**Third-party, approximate — flagged on `models.html` itself:** context
window and max output figures. Not from Anthropic's own docs.

**Deliberately not claimed anywhere:** that Claude hallucinates less than
Gemini. No verified comparative data exists for UK regulatory text — the
guide teaches distrust of both, with separate warning signs for each.

**Goes stale fastest:** model names and limits. Re-check `models.html`
against support.claude.com every few months.

---

## Adding pages

Copy any existing page, change the `<title>`, keep the `.bar`, `style.css`
and `app.js` includes, and add a tile to `index.html`:

```html
<a class="tile" href="newpage.html"><b>Title →</b><span>One line</span></a>
```

Keep the landing page minimal. Its only job is the on-the-spot decision —
everything else goes behind a tile.
