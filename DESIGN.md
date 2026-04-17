# Design System: The Digital Heirloom

This design system is a bespoke framework crafted for premium, mobile-first wedding experiences. It departs from the rigid, "templated" nature of digital invitations to embrace the tactile elegance of high-end stationery. By prioritizing emotional storytelling through generous whitespace, tonal depth, and high-contrast editorial typography, we create an interface that feels less like a software application and more like a curated keepsake.

---

## 1. Creative North Star: The Editorial Curator

The "Editorial Curator" philosophy treats every mobile screen as a page in a high-end fashion monograph. We break the traditional grid through **intentional asymmetry**—offsetting imagery and typography to create a sense of movement. 

To achieve this "Signature" look:
- **Avoid Symmetry:** Place headings off-center or overlapping the edges of soft-focus imagery.
- **Breathing Room:** Use aggressive whitespace to signal luxury. If a section feels crowded, double the padding.
- **Narrative Flow:** Elements should "bleed" into one another using soft transitions rather than hard stops.

---

## 2. Color & Tonal Architecture

Our palette is rooted in romance and prestige, utilizing a "Champagne & Cream" foundation. 

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Boundaries must be established solely through background color shifts. For example, a `surface-container-low` section (#f5f3ef) sitting atop a `surface` background (#fbf9f5) creates a sophisticated, invisible boundary.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper.
- **Base Layer:** `surface` (#fbf9f5) for the main canvas.
- **Floating Layers:** Use `surface-container-lowest` (#ffffff) for high-importance cards to provide a "bright" lift.
- **Recessed Layers:** Use `surface-container-high` (#eae8e4) for utility areas like RSVP forms to ground the user.

### The Glass & Gold Rule
For floating navigation or "Save the Date" modals, utilize **Glassmorphism**:
- **Background:** `surface-container-lowest` at 70% opacity.
- **Effect:** 12px Backdrop Blur.
- **Accents:** Use a subtle gradient transition from `primary` (#735c00) to `primary-container` (#d4af37) for CTAs to mimic the sheen of gold leaf.

---

## 3. Typography: Editorial Authority

The system uses a high-contrast pairing to balance heritage with modernity.

- **The Display Voice (Noto Serif):** Used for names, "Save the Date," and major headlines. It is the emotional heartbeat of the system. Use `display-lg` (3.5rem) with tight letter-spacing for a dramatic, editorial feel.
- **The Narrative Voice (Plus Jakarta Sans):** Used for body copy and titles. Its clean, geometric nature ensures readability on mobile while feeling "breathable."
- **The Functional Voice (Inter):** Reserved strictly for labels, metadata, and timestamps (`label-sm`).

**Signature Layout Tip:** Overlap a `display-sm` serif heading over a `secondary-container` (#f2dede) image placeholder to create depth.

---

## 4. Elevation & Depth

We eschew traditional drop shadows in favor of **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by stacking. A `surface-container-lowest` card placed on a `surface-container-low` background creates a natural, soft lift without a single pixel of shadow.
- **Ambient Shadows:** When a float is required (e.g., a "Send RSVP" button), use a diffused shadow: `box-shadow: 0 12px 32px rgba(115, 92, 0, 0.06)`. The tint is derived from the `primary` gold color, not black.
- **The Ghost Border:** If a form field requires a container, use `outline-variant` (#d0c5af) at **15% opacity**. High-contrast borders are strictly forbidden as they break the soft, romantic aesthetic.

---

## 5. Signature Components

### Buttons (The "Seal")
- **Primary:** A gradient-filled container (`primary` to `primary-container`) with `on_primary` text. Border radius set to `full` (9999px) for a pill shape, or `none` for a high-fashion rectangular look.
- **Secondary:** Transparent background with a "Ghost Border" and `primary` colored text.

### Interactive "Moments" (Cards)
- **Rule:** Forbid the use of divider lines. Separate content using vertical whitespace (32px - 48px) or subtle background shifts from `surface` to `surface-container-low`.
- **Imagery:** Cards should feature `xl` (0.75rem) rounded corners or be completely sharp-edged (`none`) if used in an asymmetrical layout.

### Input Fields
- **Style:** Underline-only style using the `outline-variant` token at 40% opacity. This mimics traditional handwritten invitation lines. Labels should use `label-md` in `tertiary` (#5d5e66).

### Floral Motifs & Ganesha Icons
- Use `outline` (#7f7663) for fine line-art motifs. These should be placed at 10-15% opacity as background watermarks, never as focal points.

---

## 6. Do’s and Don’ts

### Do
- **Do** use large, high-quality photography as a structural element.
- **Do** allow typography to "breathe" with at least 1.6x line height for body text.
- **Do** use "Gold" (`primary`) sparingly as an accent—like a wax seal on a letter.

### Don’t
- **Don't** use 100% black (#000000) for text. Use `on_surface` (#1b1c1a) to maintain a soft, organic feel.
- **Don't** use standard Material Design elevations. If it looks like a generic app, increase the blur and decrease the shadow opacity.
- **Don't** use "Alert" red for errors if possible; use the `error` (#ba1a1a) token in a desaturated state to avoid breaking the romantic palette.

---

## 7. Token Summary

| Role | Token | Value | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas** | `surface` | #fbf9f5 | Main background |
| **Elevated Card** | `surface-container-lowest` | #ffffff | Primary content containers |
| **Accent Gold** | `primary-container` | #d4af37 | CTAs, Icons, Monograms |
| **Romantic Blush** | `secondary-container` | #f2dede | Soft section backgrounds |
| **Editorial Type** | `notoSerif` | - | Display & Headlines |
| **Modern Type** | `plusJakartaSans`| - | Body & Titles |