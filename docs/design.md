# UI Implementation Spec

## Goal

Generate a modern, minimal Todo app UI that matches `wireframe.jpg`.

## Output Intent

- Build a single centered desktop-first screen.
- Use semantic HTML, clean CSS, and lightweight JavaScript.
- Keep the UI simple: title, input, add button, todo list, checkbox, delete action.
- Do not add extra product features such as filters, tabs, sidebars, dates, or avatars.

## Layout

- Full viewport app shell.
- Background fills the entire screen with a subtle linear gradient.
- Place one centered card in the middle of the viewport.
- Card width: about `420px` to `480px`.
- Card padding: about `28px` to `32px`.
- Card corner radius: about `18px` to `22px`.
- Card layout:
  - Title row at top.
  - Input row below title.
  - Todo list below input row with generous vertical spacing.

## DOM Structure

Use a structure close to:

```html
<main class="app-shell">
  <section class="todo-card" aria-label="Todo app">
    <h1 class="app-title">Todo</h1>

    <form class="todo-form">
      <input class="todo-input" type="text" placeholder="New item" />
      <button class="add-button" type="submit">Add</button>
    </form>

    <ul class="todo-list">
      <li class="todo-item">
        <label class="todo-main">
          <input class="todo-checkbox" type="checkbox" />
          <span class="todo-text">Buy milk</span>
        </label>
        <button class="delete-button" type="button" aria-label="Delete todo"></button>
      </li>
    </ul>
  </section>
</main>
```

## Visual Style

### Background

- Use a subtle linear gradient.
- Preferred direction: top left to bottom right.
- Suggested gradient:
  - `#ece8ff`
  - `#eef2ff`
  - `#f4f7ff`

### Card

- Background: warm off-white, such as `#fcfcff`.
- Border: `1px solid rgba(124, 92, 255, 0.18)`.
- Shadow: soft and diffused, for example `0 14px 40px rgba(80, 58, 160, 0.14)`.
- Avoid hard borders or dark shadows.

### Typography

- Use a clean sans-serif system stack or `Inter`.
- Title:
  - Size: `24px` to `28px`
  - Weight: `600`
  - Color: `#1f2430`
- Body text:
  - Size: `16px`
  - Weight: `400` to `500`
  - Color: `#2d3443`

### Accent Color

- Primary purple: `#7c5cff`
- Darker purple for hover: `#6b4ef2`
- Soft purple border/focus: `#cfc5ff`
- Completed-state green can be replaced with purple to stay visually consistent.

## Input Row

- Horizontal layout with input on the left and button on the right.
- Gap: about `12px`.
- Input should take remaining width.
- Input styles:
  - Height: `48px`
  - Horizontal padding: `16px`
  - Background: `#ffffff`
  - Border: `1px solid #cfc5ff`
  - Radius: `12px`
  - Text color: `#2d3443`
  - Placeholder color: `#9096a8`
- Add a soft purple focus ring:
  - `box-shadow: 0 0 0 4px rgba(124, 92, 255, 0.12)`

## Add Button

- Height matches the input.
- Horizontal padding: `20px` to `24px`.
- Background: purple accent.
- Text: white.
- Radius: `12px`.
- Weight: `600`.
- Add subtle depth with a light shadow.
- Hover:
  - Slightly darker purple
  - Translate up by `-1px`
- Active:
  - Return to resting position
  - Slightly reduce shadow

## Todo List

- Vertical stack with `14px` to `18px` spacing.
- Add top margin of about `24px`.
- Each item is a single horizontal row:
  - Checkbox + text aligned left
  - Delete button aligned right
- Keep row backgrounds transparent or extremely subtle.
- Optional hover state:
  - Very light tinted background `rgba(124, 92, 255, 0.05)`
  - Radius: `10px`

## Checkbox

- Use custom styling rather than browser default if possible.
- Size: `22px` to `24px`.
- Shape: rounded square with `6px` radius.
- Unchecked state:
  - White fill
  - `2px` border in muted gray-purple
- Checked state:
  - Purple fill
  - White checkmark SVG
- Transition checked state smoothly over `160ms` to `200ms`.

## Todo Text

- Incomplete item:
  - Color: `#2d3443`
  - No text decoration
- Completed item:
  - Color: `#9aa1b2`
  - Use a thin strikethrough
  - Reduce emphasis but keep readable

## Delete Button

- Minimal icon-only button on the far right.
- Use an inline SVG `x` icon.
- Icon size: about `18px` to `20px`.
- Default color: `#2d3443`
- Hover color: `#6b4ef2`
- Hover background: `rgba(124, 92, 255, 0.08)`
- Button size: about `32px` square with circular or rounded hit area.

## Spacing Rhythm

- Title bottom margin: `20px`
- Form bottom margin: `24px`
- Row internal gap between checkbox and text: `12px`
- Use generous whitespace; the UI should feel calm and uncluttered.

## Interactions

- Adding a todo:
  - Typing in the input updates local state.
  - Submitting the form creates a new item and clears the input.
  - Ignore empty or whitespace-only values.
- Completing a todo:
  - Clicking checkbox toggles completed state.
  - Completed styles update immediately.
- Deleting a todo:
  - Clicking the delete button removes the item from the list.

## Motion

Keep animation subtle and fast.

- Card fade/slide on first render:
  - Start with `opacity: 0` and `translateY(8px)`
  - Animate to visible over `280ms` to `360ms`
- List item enter:
  - Fade in + slight upward motion over `180ms` to `220ms`
- Checkbox toggle:
  - Use a small scale or fill transition over `160ms` to `200ms`
- Button hover:
  - `transition: background-color 160ms, transform 160ms, box-shadow 160ms`

## Accessibility

- Use real `button`, `input`, `form`, `label`, and `ul/li` elements.
- Ensure visible focus states for all interactive controls.
- Keep color contrast accessible.
- Add `aria-label` to delete buttons.
- Preserve keyboard support:
  - `Enter` submits
  - `Space` toggles checkbox when focused

## SVG Guidance

- Prefer inline SVG for:
  - Checkbox checkmark
  - Delete `x` icon
- Use simple `stroke-linecap="round"` and `stroke-linejoin="round"` styling.
- Keep icon strokes clean and lightweight.

## Responsive Behavior

- On narrow screens, keep the same structure.
- Reduce card width to `calc(100vw - 32px)`.
- Allow the add button to remain on the same row if space permits.
- If needed below `360px`, stack input and button vertically with an `8px` gap.

## Implementation Notes For LLM

- Prioritize polished spacing, color balance, and softness over feature depth.
- Keep CSS organized with variables for colors, radius, and shadow.
- Default first-load state should be empty so the empty-state behavior can be implemented and tested.
- Use sample todos only in isolated previews, demos, or tests when needed.
- Match the reference mood: minimal, premium, calm, and slightly playful through purple accents.
