# English Fluency Academy — UI/UX Design Specification
### React Web Platform · Mr. Saleh Mohamed

---

## 1. Design Philosophy

English Fluency Academy is a gamified English-learning platform for an Egyptian audience that spans children and adults. The interface should feel like a premium tutoring lounge at night, not a children's app or a generic SaaS dashboard: dark, focused, a little ceremonial about progress, because mastering a language is treated here as an achievement worth marking.

The signature visual idea is the **Fluency Compass** — a circular mastery dial that layers an eight-point geometric star (a quiet nod to Cairo's architectural pattern language) under a gold XP arc and an emerald streak ring. It anchors the dashboard and reappears, smaller, anywhere progress needs to be shown. Everything else in the system stays quiet so the Compass and the learner's own progress remain the most memorable thing on screen.

---

## 2. Color System

| Token | Hex | Usage |
|---|---|---|
| Obsidian Navy | `#0A0F1C` | Primary background |
| Midnight Teal | `#101B2D` | Card and panel surfaces |
| Royal Gold | `#D4A656` | XP, achievements, primary CTA |
| Emerald Pulse | `#1FA978` | Streaks, success states, mastery fill |
| Electric Cyan | `#4FD1E8` | AI Conversation Partner, active nav state, focus rings |
| Parchment | `#F4EFE2` | Primary text on dark surfaces |
| Slate Mist | `#8C96AC` | Secondary/muted text, dividers |

Rules:
- Gold and cyan never appear as decoration — gold always marks something *earned*, cyan always marks something *AI or interactive*.
- Surfaces step up in lightness with depth: Obsidian → Midnight Teal → hover/active state (Midnight Teal + 6% white overlay). Never use pure black or pure white.
- Error states use a desaturated terracotta (`#C9694B`), kept out of the core palette so it stays rare and legible as "something needs attention."

---

## 3. Typography

| Role | Typeface | Weight range | Usage |
|---|---|---|---|
| Display | Fraunces | 600–900 | Hero numbers (XP totals, level), section headlines. Used sparingly — never for body copy. |
| UI / Body | Manrope | 400–700 | All interface text, buttons, navigation, lesson content. Reads cleanly at small sizes and pairs well with Arabic UI elements if a bilingual toggle is added later. |
| Data / Utility | JetBrains Mono | 400–500 | XP counters, streak day numbers, timers — anything that should feel measured and exact. |

Type scale (base 16px, 1.25 ratio): 12 / 14 / 16 / 20 / 25 / 31 / 39 / 49px.

---

## 4. Layout & Spacing

- **Grid:** 12-column, max content width 1200px, centered. Sidebar is fixed at 240px (72px collapsed on tablet).
- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px — no arbitrary values outside this scale.
- **Corner radius:** 12px for cards, 8px for buttons/inputs, full-round only for avatars, badges, and the Compass itself.
- **Breakpoints:** Mobile <640px (sidebar collapses to bottom tab bar), Tablet 640–1024px (icon-only sidebar), Desktop >1024px (full sidebar with labels).

---

## 5. Core Components

**Navigation (sidebar):** Icon + label, 48px row height. Active item gets a 2px cyan left border and cyan icon tint — no background fill, keeping the dark surface intact.

**Buttons:**
- *Primary:* Royal Gold fill, Obsidian Navy text, used only for the single most important action per screen (Start Lesson, Continue Streak).
- *Secondary:* Transparent with Slate Mist border, Parchment text.
- *Ghost:* Text-only, used inside cards for low-emphasis actions ("Skip", "Review later").

**Mission Card:** Midnight Teal surface, icon badge (gold ring if completed, slate ring if pending), title, XP reward in JetBrains Mono, thin progress bar in Emerald Pulse.

**The Fluency Compass:** SVG ring, 3 layers — outer geometric star (static, low opacity), middle arc (gold, animates to current XP % on load), inner arc (emerald, tracks streak health). Center shows level number in Fraunces.

**AI Conversation Bubble:** User messages in Midnight Teal with Parchment text, right-aligned. AI replies left-aligned with a 1px cyan border and no fill, so the AI always reads as transparent/assistive rather than authoritative.

**Streak Tracker:** Row of 7 day-dots; completed days fill Emerald Pulse, today pulses gently, missed days show a hollow Slate Mist ring (never red — missing a day is a gap, not a failure).

---

## 6. Key Screens & UX Flows

**Onboarding:** Three short screens — goal ("Why are you learning English?"), level placement (short adaptive quiz, not a long test), and a first micro-win (one easy question answered correctly before any sign-up friction, so the learner feels capable before being asked for an email).

**Dashboard:** Fluency Compass top-left as the anchor, "Today's Missions" as a horizontal scroll of 3–4 cards to its right, AI Conversation Partner preview card below, streak row in the header. The screen answers one question on load: *what should I do right now?*

**Lesson / Mission Flow:** Single task per screen, persistent top progress bar, instant feedback (correct = brief gold flash + XP tick-up animation; incorrect = direct correction in the interface's voice, e.g. "Close — it's 'have been', not 'has been'. Try the next one."). No red X marks; mistakes are corrected, not punished visually.

**AI Conversation Partner:** Toggle between voice and text input. Live correction appears as a soft cyan underline under the specific phrase, with a tap-to-expand explanation — correction is inline and optional to read, never a blocking modal.

**Progress / Profile:** XP history as a simple area chart in Emerald Pulse, achievement badges in a grid (gold ring = earned, outline = locked with a one-line hint on how to earn it).

---

## 7. Motion

- Compass arcs animate from 0 to current value once per session load (ease-out, ~800ms) — this is the one "hero" animation; everything else stays subtle.
- Mission cards stagger in by 60ms on dashboard load.
- Streak flame/today-dot uses a slow 3s pulse, not a flicker — calm, not anxious.
- All motion respects `prefers-reduced-motion`; fall back to instant state changes.

---

## 8. Accessibility

- Minimum contrast 4.5:1 for body text on all surfaces (verified for Parchment-on-Obsidian and Parchment-on-Midnight-Teal).
- Visible focus ring: 2px Electric Cyan, offset 2px, on every interactive element — never removed.
- Touch targets minimum 44×44px throughout, matching the mobile app for muscle-memory consistency across platforms.
- Architecture supports a future Arabic/RTL toggle: avoid baking left-to-right assumptions into icon directionality (chevrons, progress arrows) where possible.

---

## 9. Voice & Microcopy

- Active voice, plain verbs, no filler: "Start today's mission," not "Why not begin your learning journey?"
- The interface never apologizes and is never vague in error states: say what happened and what to do next.
- Encouraging tone for learners of all ages without being childish — avoid exclamation-point stacking and over-the-top praise; let the XP and visual reward do the celebrating.
- Consistent vocabulary end-to-end: a "Mission" is always called a Mission (not "lesson" in one place and "task" in another), so the button, the page title, and the confirmation toast all match.
