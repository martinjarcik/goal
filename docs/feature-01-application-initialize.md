# Feature 1: Application Initialize

## Purpose

Render the base Todo screen shell on first load.

## Single Responsibility

This feature only creates the initial application frame and heading. It does not display todos, add items, toggle completion, or delete items.

## Self-Contained Contract

- Input: none
- Output: visible app shell with centered card and `Todo` title
- State owned by this feature: initial render state only

## Implementation Description

- Render a full-viewport app container.
- Apply the soft purple linear gradient to the page background.
- Center one card horizontally and vertically.
- Render the card with rounded corners, thin purple border, and soft shadow.
- Show the `Todo` heading at the top-left of the card.
- Leave the remaining card body empty without depending on any other feature.

## UI Details

- Use the layout and styling from `docs/design.md` for:
  - full-screen shell
  - centered card
  - title typography
  - gradient background
- The card should still look complete when empty.
- On first render, animate the card with a subtle fade and upward slide.

## User Acceptance Test

**Scenario:** User opens the app for the first time.

- Given the application is loaded with no prior interaction
- When the main screen appears
- Then the user sees a centered Todo card with the `Todo` heading on a subtle purple gradient background
