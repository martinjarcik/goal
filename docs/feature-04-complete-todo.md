# Feature 4: Complete Todo

## Purpose

Let the user toggle the completed state of an existing todo item.

## Single Responsibility

This feature only changes and presents completion state. It does not create todos, remove todos, or decide how items are sourced.

## Self-Contained Contract

- Input: a todo item with `id`, `label`, and `completed`, plus an `onToggle(id)` action
- Output: a toggle request for the selected item
- State owned by this feature: checked or unchecked presentation derived from the todo item's `completed` value

## Implementation Description

- Render a checkbox-style control next to the todo label.
- Use the todo item's `completed` flag to determine whether the control is checked.
- When the user activates the control, call `onToggle(id)`.
- Update the row presentation immediately after the state changes.
- Apply completed styling only to the selected item.

## UI Details

- Use a rounded-square custom checkbox with purple checked state.
- Show a white checkmark SVG inside the filled checkbox.
- Animate the checkbox fill and checkmark subtly over `160ms` to `200ms`.
- Completed text uses muted color and thin strikethrough.

## User Acceptance Test

**Scenario:** User marks a todo as complete.

- Given a visible todo item named `Walk the dog` with an unchecked completion control
- When the user clicks the control
- Then the item becomes completed, the control appears checked, and the label shows strikethrough styling
