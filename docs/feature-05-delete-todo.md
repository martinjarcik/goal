# Feature 5: Delete Todo

## Purpose

Let the user remove an existing todo item from the visible list.

## Single Responsibility

This feature only handles removal of a selected item. It does not create todos, render empty-state logic, or manage completion styling.

## Self-Contained Contract

- Input: a todo item with `id` and `label`, plus an `onDelete(id)` action
- Output: removal request for the selected item
- State owned by this feature: delete interaction for one row

## Implementation Description

- Render an icon-only delete button on the right side of each todo row.
- Use the todo item's `id` when invoking `onDelete(id)`.
- Keep the interaction immediate with no confirmation dialog in the MVP.
- After deletion, the row should disappear from the rendered list supplied by the parent state.

## UI Details

- Use an inline SVG `x` icon with a light visual weight.
- Keep the button compact, about `32px` square, with a comfortable hit area.
- Default icon color should be neutral dark text.
- On hover, tint the icon purple and show a soft purple background.

## User Acceptance Test

**Scenario:** User deletes a todo from the list.

- Given a visible todo item named `Buy oranges` with a delete button
- When the user clicks the delete button
- Then the delete action is triggered for that item and the item is no longer shown in the list
