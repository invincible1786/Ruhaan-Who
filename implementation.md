🐉 Drag'n'Boom Portfolio — Antigravity Agent Task Spec

Recommended Agent Manager mode: Agent-assisted (review-driven for Task 1 content decisions, autopilot acceptable from Task 3 onward once scaffolding exists).

Global Project Constraints (apply to every task — paste into Antigravity's persistent rules/memory)
STACK: Vite + React + TypeScript + Tailwind CSS. No Next.js unless explicitly instructed later.
NO PixiJS. NO Matter.js. NO Howler.js. Do not install these packages under any circumstances.
Animation: GSAP core + ScrollTrigger only, or plain CSS/@keyframes, or IntersectionObserver.
Dragon rendering: Lottie (via lottie-react or lottie-web) OR CSS/SVG sprite. Never a canvas game-engine rig.
Burst effect: exactly ONE technique — CSS clip-path shatter OR a Lottie impact clip. Never combine multiple burst techniques.
Interactive JS bundle budget: under 150-200kB gzipped, excluding React itself. Check bundle size after every task that adds a dependency.
Every interactive element must be a real semantic <button> or <a> with an aria-label. No div-onClick-only interactions.
Every animated feature requires a working `prefers-reduced-motion` fallback in the SAME commit/task, using the same code path as any asset-load-failure fallback.
Content lives in /src/data/*.json — never hardcode project/experience copy inside components.
Do not add sound/audio in this task list. Do not add Matter.js-style physics. Do not build a Pixi dragon state machine.
After each task, run a build and report bundle size and any TypeScript/lint errors before declaring the task complete.
TASK 0 — Project Scaffold

Objective: Initialize the project skeleton with the locked stack, no content or design yet.

Do:

npm create vite@latest with React + TypeScript template.
Install Tailwind CSS and configure it.
Install GSAP (gsap) only — do not install any other animation/physics library yet.
Create the folder structure:
/src
  /data
  /components
  /lib
  /hooks
  /assets
Add a placeholder App.tsx that renders an empty <main> with six empty <section id="..."> elements: hero, stats, stack, projects, experience, contact.
Set up ESLint + Prettier with a basic config.

Acceptance criteria (agent verifies before completing):

 npm run build succeeds with zero errors.
 npm run dev serves the app locally.
 Folder structure matches exactly what's listed above.
 No animation library besides gsap is present in package.json.
TASK 1 — Content Data Files (human review required before Task 2 starts)

Objective: Create the JSON content files with real placeholder structure. Flag to the human that actual copy (project metrics, experience outcomes, "looking for X" line) must be filled in by them before Task 4 — do not invent fake metrics.

Do:

Create /src/data/projects.json with this shape per entry:
json
{
  "id": "string-slug",
  "title": "string",
  "tagline": "string",
  "tech": ["string"],
  "metric": "string — REQUIRED real outcome, e.g. '500+ users, 40% faster load'",
  "thumbnail": "path or URL",
  "liveUrl": "string",
  "repoUrl": "string",
  "bullets": ["string", "string"]
}
Create /src/data/experience.json:
json
{
  "year": "string",
  "title": "string",
  "company": "string",
  "result": "string — REQUIRED quantified outcome",
  "tags": ["string"]
}
Create /src/data/stack.json, grouped by category: weapon (languages), tool (frameworks), armor (design/infra), potion (databases), rune (misc).
Create /src/data/profile.json: name, role, tagline, lookingFor (the "looking for X" line — required, do not leave blank), resumeUrl, github, linkedin, email, plus honest stats: level, class, coins (real count of projects), lives (real count of open slots).

Acceptance criteria:

 All four JSON files exist and are valid JSON (validate with a parse check).
 Every project entry has a non-empty metric field.
 Every experience entry has a non-empty result field.
 profile.json has a non-empty lookingFor field.
 Agent output includes an explicit note to the human: "Placeholder values need your real numbers before this looks credible — review projects.json, experience.json, and profile.json."
TASK 2 — Static Skeleton (No Animation)

Objective: Build every section as plain, fully responsive React components reading from Task 1's data files. Zero animation, zero dragon, zero background art. This must look like a complete, professional portfolio on its own.

Do:

Build components: Hero.tsx, StatsHUD.tsx, TechInventory.tsx, ProjectsGrid.tsx + ProjectTile.tsx + ProjectDetailCard.tsx, ExperienceLog.tsx, Contact.tsx.
ProjectTile is a real <button> that, on click, toggles an expanded ProjectDetailCard inline (plain conditional render, no animation yet).
Hero must render lookingFor, resume link, GitHub, LinkedIn prominently — not hidden behind any interaction.
Contact renders a real form (use Formspree — ask human for their Formspree endpoint, use a placeholder env var VITE_FORMSPREE_URL if not yet provided) plus a mailto: fallback link.
Apply Tailwind for full responsiveness (mobile, tablet, desktop breakpoints) — no design flourish yet, just clean and readable.
Use a normal system sans-serif font for all body text. Do not add a retro/pixel font yet (that's Task 3's art-direction step).

Acceptance criteria:

 All six sections render real content from the JSON data files (no hardcoded copy in components).
 Site is usable and readable at 375px, 768px, and 1280px widths.
 Clicking a project tile expands details inline without a page reload.
 Resume/GitHub/LinkedIn links are visible in the Hero without needing any interaction.
 Contact form is present and either submits to Formspree or falls back to mailto:.
 Lighthouse accessibility score ≥ 90 on this static version.
 Agent output flags: "Static skeleton complete — recommend the human user-test this before Task 3 proceeds to visual/animation work."
TASK 3 — Art Direction & Design Tokens

Objective: Apply the locked visual style consistently. Human must supply the style choice before this task starts — pause and ask if not already specified: pixel / flat-vector / semi-painterly, plus a 4–6 color hex palette.

Do:

Add the chosen retro/pixel font (e.g. via @fontsource/press-start-2p or Google Fonts import) — apply it only to headings/HUD labels (StatsHUD, section titles, button labels), never to body paragraph text.
Define Tailwind theme tokens (tailwind.config.js) for the locked color palette, border-radius language, and shadow style — apply consistently across all components.
Restyle the static components from Task 2 to match: HUD-style stat badges, inventory-slot styled tech grid, "high score" styled project tiles, "boss log" styled experience timeline, "continue screen" styled contact section.
Do not add background art, dragon, or animation yet — this task is typography/color/spacing only.

Acceptance criteria:

 Retro font appears only in headings/labels, confirmed by inspecting rendered body text uses the sans-serif font.
 Color palette values in tailwind.config.js match the locked palette exactly, no ad-hoc hex values in components.
 Visual consistency check: dragon-adjacent decorative elements (once added in Task 4) will need to reuse these same tokens — note this file/theme location for Task 4.
 Lighthouse accessibility score still ≥ 90 after restyle (verify contrast wasn't broken by new palette).
TASK 4 — Background & Idle Dragon

Objective: Add the castle background and an idle-only animated dragon. No per-section choreography, no fire-breath/dive-bomb states.

Do:

Source or generate 1–2 background layer images (sky/castle silhouette) matching the Task 3 art direction. If the human hasn't provided assets, use simple flat CSS gradients/SVG shapes as placeholders and flag this explicitly.
Build CastleBackground.tsx: renders the background layer(s); on desktop, apply a light CSS/GSAP ScrollTrigger parallax (scrub); on mobile (useMediaQuery under 768px), render a single static flat image with no parallax.
Build DragonIdle.tsx: use a free/placeholder Lottie file (search LottieFiles for a dragon or flame-creature loop) via lottie-react, OR a hand-rolled CSS @keyframes float+bob on an SVG if no suitable Lottie is found. Loop only — no state changes.
Apply a light GSAP ScrollTrigger parallax to the dragon's vertical position on desktop only; static float on mobile.
Lazy-load the Lottie/background assets (dynamic import or loading="lazy") so they don't block first paint.
Build the reduced-motion fallback in this same task: if prefers-reduced-motion is set, or if the Lottie asset fails/times out to load, render the dragon as a static single-frame image with no animation, and skip all parallax. Implement this via one shared fallback path (a useAssetFallback or similar hook), not a separate one-off if per component.

Acceptance criteria:

 Dragon and background load without blocking Time to Interactive (verify via Lighthouse).
 prefers-reduced-motion correctly disables parallax and animation (test by toggling the OS/browser setting).
 Simulating a failed asset load (e.g. block the Lottie URL in devtools) falls back cleanly with no layout break or blank flash.
 Mobile viewport (< 768px) shows static flat background and static dragon — confirm no parallax JS runs at all on mobile (check via a console log or network/perf tab, not just visually).
 Bundle size check: report current gzipped interactive JS total against the 150–200kB budget. If already close/over, flag before proceeding to Task 5.
TASK 5 — Signature Interaction: Project Burst (single tile first)

Objective: Implement the one chosen burst technique (CSS clip-path shatter OR Lottie impact clip — pick one, confirm with human if not already decided) for exactly one project tile, fully polished including all edge cases, before generalizing.

Do (single-tile implementation):

On click/Enter/Space of the first project tile: play the chosen burst technique, total duration under 500–600ms.
Crossfade/scale the tile into the expanded ProjectDetailCard inline (already built in Task 2 — now animate the transition).
Debounce so a rapid double-activation doesn't restart or overlap the animation.
Focus management: on open, move focus into the expanded card (e.g. to its close control or heading); on close (Escape key or visible close button), return focus to the originating tile.
Handle resize/orientation change while the card is open without breaking layout.
Reduced-motion / asset-failure fallback: reuse the Task 4 fallback pattern — tile expands via simple scale/fade with no shatter/particle effect.
Do not touch the other project tiles yet.

Acceptance criteria:

 Full interaction (click → burst → reveal) completes in under 600ms, verified via browser performance profiling.
 Keyboard-only walkthrough: tab to tile, activate with Enter, verify focus lands inside the card, Escape closes and returns focus correctly.
 Reduced-motion setting produces the simple fallback, confirmed by toggling the OS setting.
 Rapid double-click does not produce overlapping/broken animation state.
 Resizing the window / rotating a simulated mobile viewport while the card is open does not break layout.
 Agent pauses here and reports: "Single-tile burst complete and verified against all edge cases. Ready to generalize to remaining tiles — confirm before proceeding."
TASK 6 — Generalize Burst to All Project Tiles + Analytics

Objective: Apply the verified Task 5 pattern to every remaining project tile, and add lightweight analytics.

Do:

Extract the Task 5 interaction into a reusable hook/component if not already done, apply to all tiles in projects.json.
Install and configure Vercel Analytics (or Plausible if the human prefers) — track events: project tile click (with project id), resume download click.
Do not add any new animation techniques in this task — only reuse Task 5's pattern.

Acceptance criteria:

 Every project tile in the data file has working burst-to-reveal behavior, keyboard access, and reduced-motion fallback (spot-check at least 3 tiles beyond the first).
 Analytics events fire correctly, confirmed via the analytics dashboard or a debug console log during dev.
 Bundle size re-checked against budget.
TASK 7 — Mobile Enforcement & Performance Gate (hard gate — do not deploy past this without passing)

Objective: Enforce all mobile simplifications via code (not just visual guesswork) and pass the performance budget as a hard gate.

Do:

Audit every component for a useMediaQuery/breakpoint check that disables on mobile: dragon scroll-parallax, background parallax, any particle/shatter extras (CSS-only scale-fade should remain).
Run a production build (npm run build) and report the final gzipped interactive JS size against the 150–200kB budget.
Run Lighthouse (mobile profile) — target: performance ≥ 85, accessibility ≥ 90, LCP < 2.5s.
If any gate fails: identify the heaviest dependency/asset and either lazy-load, compress, or remove it. Do not proceed to Task 8 until all three gates pass.

Acceptance criteria:

 Lighthouse mobile performance ≥ 85 — hard gate, non-negotiable.
 Lighthouse accessibility ≥ 90 — hard gate.
 LCP < 2.5s — hard gate.
 Interactive JS bundle within 150–200kB gzipped, or an explicit documented exception approved by the human.
 Confirmed via code inspection (not just visual check) that mobile disables parallax/particles.
TASK 8 — Full Accessibility & QA Pass

Objective: Final keyboard, screen-reader, and cross-viewport verification across the entire site.

Do:

Full keyboard-only walkthrough from Hero to Contact, including opening/closing every project card.
Verify every interactive element has an accessible name (aria-label or visible text).
Verify contrast on all text over background art meets WCAG-AA (add a scrim panel behind any failing text block).
Test at 375px, 768px, 1280px, and one ultra-wide breakpoint.
Test the reduced-motion path end-to-end one more time across all sections, not just the dragon and burst.

Acceptance criteria:

 Zero keyboard traps; all content reachable and operable via keyboard alone.
 No contrast failures reported by an automated audit (axe/Lighthouse).
 Reduced-motion path verified across the whole site, not just individual components.
TASK 9 — Deploy

Objective: Ship to production.

Do:

Deploy to Vercel (or human's preferred host).
Verify in production: contact form submits (or mailto: opens correctly), resume link downloads/opens, GitHub/LinkedIn links work, analytics events fire.
Add favicon and Open Graph image matching the locked art direction (Task 3 tokens).

Acceptance criteria:

 Production URL loads correctly on both desktop and a real mobile device (not just emulation).
 Contact path, resume, and social links all verified working in production.
 OG image renders correctly when the URL is shared (test via a link-preview debugger).
 Analytics dashboard shows live events after a manual test interaction.
Deferred (do not attempt unless explicitly instructed in a new task)

Fire-breath sweep animation, dive-bomb experience-timeline animation, full multi-state Pixi dragon rig, Matter.js physics debris, sound effects, dedicated /projects/[slug] SEO routes. These are v2 scope — only pick up one at a time, each as its own scoped task with the same acceptance-criteria structure as above, after Task 9 has shipped and been used by real visitors.

Feed these tasks to Antigravity one at a time in order. Use Plan Mode for Tasks 0–1 and 3–5 (design/content decisions benefit from a reviewable plan artifact first); Fast Mode is fine for the more mechanical Tasks 2, 6–9. Do not let the agent skip a task's acceptance-criteria checklist before moving to the next.