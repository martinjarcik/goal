# Feature 3: Add Todo

## Purpose

Let the user enter a new todo and submit it.

## Single Responsibility

This feature only handles todo creation input and submission. It does not render the full list, toggle completion, or delete items.

## Self-Contained Contract

- Input: user-entered text and an `onAdd(text)` action
- Output: a submission request containing the trimmed todo label
- State owned by this feature: input field value and submit availability

## Implementation Description

- Render a text input with placeholder `New item`.
- Render an adjacent `Add` button.
- Update local input state as the user types.
- Trim whitespace before validation.
- Disable the `Add` button when the trimmed input is empty.
- On submit, call `onAdd(text)` with the trimmed value.
- Clear the input after successful submission.
- Support both button click and `Enter` key submission.

## UI Details

- Keep the input and button on one row on desktop widths.
- Input uses a white background, thin soft-purple border, and visible purple focus ring.
- Add button uses the purple accent fill, white text, rounded corners, and subtle hover/press motion.
- Respect the responsive rule from `docs/design.md` for narrow screens.

## User Acceptance Test

**Scenario:** User adds a new todo from the input row.

- Given the add form is visible and the input is empty
- When the user types `Buy bread`
- Then the `Add` button becomes enabled
- When the user submits the form
- Then `Buy bread` is sent through the add action and the input becomes empty
