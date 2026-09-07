🖼️ Drag'n'Boom Portfolio — Visual Asset Integration (Antigravity Task Addendum)

This is a follow-up task list for the same Antigravity project already running against `implementation.md` in `invincible1786/Ruhaan-Who`. It assumes Tasks 0–4 (scaffold → background/dragon idle) exist already. Paste this whole file in as the next task after whichever of Task 4–8 you're currently on — it does not replace any existing task, it wires in three real assets that are now final.

Recommended Agent Manager mode: **Fast Mode**. There are no open design decisions here — the assets are final, sized, and named below. The agent should not source, generate, or regenerate any imagery for this task.

---

## Carry-forward constraints (same as implementation.md — do not relax)

- STACK: Vite + React + TypeScript + Tailwind. No new dependencies for this task — no cursor libraries, no image libraries, plain CSS only.
- Every animated feature still needs its existing `prefers-reduced-motion` fallback — this task adds **no new animation**, so nothing here should touch that logic except where Task 4c below says so explicitly.
- Content/asset paths only — do not hardcode copy.
- Run a build after each task and report bundle size / TS / lint errors before declaring it complete, same as every other task in the spec.
- Lighthouse accessibility must stay ≥ 90 after each of these changes (per Task 3/8's existing gate).

## Assets provided (attached to this task — do not re-source)

| File | Size (px) | Format | Goes in | Used by |
|---|---|---|---|---|
| `castle-flight-bg.webp` (+ `.jpg` fallback) | 990×548 | WebP/JPEG | `/public/assets/background/` | Task 4a |
| `dragon-avatar-v2.png` (+ `.webp`) | 440×290, transparent | PNG/WebP | `/src/assets/dragon/` | Task 4b |
| `sword-cursor.png` | 128×51, transparent | PNG | `/public/assets/cursor/` | Task 4c |
| `sword-cursor@0.5x.png` | 64×26, transparent | PNG | `/public/assets/cursor/` | Task 4c (optional HiDPI) |
| `sword-full-res.png` | 542×217, transparent | PNG | `/src/assets/cursor/` | spare — not wired to anything, kept as source art in case a larger sword graphic is wanted elsewhere later |

The background and dragon assets were both cropped/cleaned from the originals (checkerboard/game-UI removed, dragon cut out from its title-card background) — they're ready to drop in as-is, no further editing needed.

---

## TASK 4a — Swap in the real castle-flight background

**Objective:** Replace whatever placeholder gradient/SVG `CastleBackground.tsx` is currently using with the supplied screenshot, used as a single static image (no parallax layers to build — static is the explicit choice here).

**Do:**
- Copy `castle-flight-bg.webp` and `castle-flight-bg.jpg` into `/public/assets/background/`.
- In `CastleBackground.tsx`, render it as a plain CSS background on the section container:
  ```css
  .castle-bg {
    background-image: image-set(
      url('/assets/background/castle-flight-bg.webp') type('image/webp'),
      url('/assets/background/castle-flight-bg.jpg') type('image/jpeg')
    );
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  ```
  (If `image-set()` browser support is a concern, a `<picture>`-less fallback is fine: just point `background-image` straight at the `.jpg` and skip WebP — simplicity over savings here, agent's call.)
- Since this is static (per instruction — parallax/scroll-tied motion is explicitly *not* wanted for this image), remove or skip whatever Task 4's ScrollTrigger parallax hook was going to attach to this layer. Existing dragon-idle parallax (Task 4's `DragonIdle.tsx`) is untouched by this task.
- This image is decorative — mark the container `aria-hidden="true"` or apply it as a pure CSS background (not an `<img>`) so it never enters the accessibility tree.
- Run the existing WCAG-AA contrast check (Task 8) against any text sitting on top of this image. If anything fails, add a scrim, e.g.:
  ```css
  .castle-bg::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(10,8,20,0.15) 0%, rgba(10,8,20,0.55) 100%);
  }
  ```

**Acceptance criteria:**
- Background renders full-bleed behind the intended section at 375px, 768px, 1280px with no stretching/distortion (`cover` + `center` handles this — verify visually).
- No layout shift / blocked first paint (lazy-load or at minimum don't inline as base64).
- Any text over the image passes the existing contrast audit; scrim added if it didn't.
- Bundle/asset size reported — should add well under 100KB (WebP variant is ~30KB).

---

## TASK 4b — Replace the HUD dragon avatar with the new artwork

**Objective:** The small glowing dragon graphic that renders next to the `[LVL {n}]` badge (the player/class HUD element — likely in `StatsHUD.tsx`, wherever `profile.json`'s `level`/`class` fields are displayed) gets replaced with the supplied `dragon-avatar-v2` artwork.

**Note the assumption here, and flag it back to the human per the existing Task 1 human-review pattern:** the source image was a full title-card (logo text + dragon + background); this task assumes you only want the **dragon character itself** as the avatar (already isolated/cropped, transparent background, ready to drop into a badge), not the full card with the "DRAG'N BOOM ONLINE" logo. If that's wrong, say so before this task ships — the full original card can be supplied separately for a splash/loading-screen use instead.

**Do:**
- Copy `dragon-avatar-v2.png`/`.webp` into `/src/assets/dragon/`.
- Locate the component currently rendering that HUD dragon graphic. Import and swap its image source:
  ```tsx
  import dragonAvatar from '@/assets/dragon/dragon-avatar-v2.png';
  // ...
  <img
    src={dragonAvatar}
    alt={`${profile.class} avatar`}
    className="hud-dragon-avatar"
  />
  ```
- If the existing element currently renders a Lottie/animated idle loop *specifically for this HUD badge* (as opposed to the big hero-section `DragonIdle.tsx`), replace that render with this static `<img>` — this task intentionally trades that one glowing-icon animation for the static artwork. Do **not** touch the separate hero-section idle dragon from Task 4 — that stays as-is.
- Keep (or add) the existing glow/aura styling behind the image with plain CSS so the badge still reads as "powered up," e.g.:
  ```css
  .hud-dragon-avatar {
    width: 72px; height: auto;
    filter: drop-shadow(0 0 12px rgba(255,150,40,0.65));
  }
  ```
- If you cannot confidently find a dedicated HUD/badge component distinct from the hero `DragonIdle.tsx`, treat this as ambiguous: implement the swap on whichever component actually renders the `[LVL n]` badge icon, and explicitly flag to the human which file you changed so they can confirm it was the right one.

**Acceptance criteria:**
- `[LVL n]` badge now shows the new artwork, not the old icon.
- Image has proper `alt` text (non-empty, derived from `profile.json`, not hardcoded).
- Badge remains legible/sized consistently across 375px/768px/1280px.
- Lighthouse accessibility still ≥ 90.
- Agent explicitly states which component file it edited, so the human can confirm the right element was targeted.

---

## TASK 4c — Custom sword cursor

**Objective:** Site-wide custom cursor using the supplied sword artwork, with the blade tip as the click point.

**Do:**
- Copy `sword-cursor.png` (and, optionally, `sword-cursor@0.5x.png`) into `/public/assets/cursor/`.
- In the global stylesheet, set the cursor with an explicit hotspot at the sword's tip (pre-computed at **126, 5** for the 128×51 asset) and always keep a real fallback keyword after it:
  ```css
  body {
    cursor: url('/assets/cursor/sword-cursor.png') 126 5, auto;
  }

  a, button, [role="button"], .clickable, input[type="submit"] {
    cursor: url('/assets/cursor/sword-cursor.png') 126 5, pointer;
  }
  ```
- Optional HiDPI enhancement (Chromium/Edge only — Firefox ignores `image-set()` in `cursor`, so the plain `url()` above must stay as the base, this is additive only):
  ```css
  body {
    cursor: image-set(
      url('/assets/cursor/sword-cursor.png') 1x,
      url('/assets/cursor/sword-full-res.png') 2x
    ) 126 5, auto;
  }
  ```
- Do not remove the trailing generic keyword (`auto`/`pointer`) on any rule — that's the fallback for browsers/OSes that reject the custom image (e.g. anything over 128px in a dimension is unreliable across browsers, which is why the asset was pre-sized to 128×51).
- This is purely decorative/cosmetic — it must not change focus behavior, keyboard operability, or hit-target sizing anywhere. No ARIA changes needed.

**Acceptance criteria:**
- Custom cursor visible over body text and over every interactive element class listed above, in both Chrome and Firefox.
- Keyboard-only navigation (Tab/Enter/Space) is completely unaffected — verify against the Task 8 keyboard walkthrough.
- No console errors if the cursor image fails to load (browser silently falls back to the keyword — confirm this is in fact what happens, don't add extra JS for it).
- Existing Lighthouse accessibility score unaffected (cursor styling has no a11y weight, but confirm nothing else regressed).

---

Feed Tasks 4a → 4b → 4c to Antigravity in order (4a and 4c are independent and could run in parallel if you prefer; 4b depends on locating the existing HUD component so give the agent time to search the codebase first). None of these need Plan Mode — they're mechanical drop-in-asset-and-wire-up tasks, Fast Mode throughout.
