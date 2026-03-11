# Architecture

## Current State

The application codebase has not been created yet.

## Initial Assumptions

- Single-project Todo app
- Simple CRUD interactions
- Minimal dependencies
- Architecture should stay easy to explain and maintain

## MVP Boundaries

- One screen only
- One state owner for the todo list
- Feature boundaries should stay separate:
  - app shell
  - todo display
  - add todo input
  - complete todo action
  - delete todo action
- Default initial state is an empty list
- Persistence is not required for the first implementation pass

## Pending Decisions

- Frontend framework
- Storage model
- State management approach
- Testing setup
