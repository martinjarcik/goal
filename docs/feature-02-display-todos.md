# Feature 2: Display Todos

## Purpose

Show either the empty todo state or the current list of todo items.

## Single Responsibility

This feature only renders todo content that already exists in view state. It does not create items, toggle completion, or delete items.

## Self-Contained Contract

- Input: an array of todo view models with `id` and `label`
- Output: either an empty-state message or a rendered list of labels
- State owned by this feature: display branching between empty and populated states

## Implementation Description

- If the input array is empty, render placeholder helper text inside the card body.
- If the input array has items, render a vertical list of rows.
- Render each row as a neutral text item with no completion or delete interaction.
- Keep the component passive: it receives data and displays it without changing it.

## UI Details

- Empty state text should be short, muted, and visually secondary.
- List rows should use the spacing rhythm from `docs/design.md`.
- Row hover can use a very light purple tint, but no action is required on hover.

## User Acceptance Test

**Scenario:** User sees the correct content for the current todo state.

- Given the app receives an empty todo array
- When the screen renders
- Then the user sees placeholder text instead of a list
- Given the app receives a todo array with two items
- When the screen renders again
- Then the user sees exactly two todo rows and no empty-state placeholder
