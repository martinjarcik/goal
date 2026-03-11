# Development Workflow

Use this workflow for every backlog item.

## Step 0: Baseline Before Feature Work

This project currently has a neutral scaffold that is not yet committed.

- Commit the neutral scaffold on `main` before starting backlog items.
- Use that baseline so every feature branch starts from a clean `main`.
- Do not treat the scaffold commit as a backlog feature commit.

## Step 1: Start The Feature

1. git fetch origin
2. Create a new feature branch from main
3. Review the feature specification.
4. Suggest isolated TDD tests that verify requirements, not implementation details.

## Step 2: Acceptance Test First

1. Implement the failing user acceptance test.
2. Commit.

## Step 3: Minimal Supporting Scaffold

1. Add only the scaffold required outside the unit-test-driven implementation.
2. Commit.

## Step 4: Unit-Test Loop

Repeat one requirement at a time:
Inform about finishing each individual sub-step bellow.

1. Add one failing unit test.
2. Implement the smallest functional change to make it pass.
3. Refactor the implementation to improve the code and complete the code.
4. Run the test
4. Commit after each refactored green step.

## Step 5: Spec Review

1. Review the result against the feature specification.
2. Fix any misalignment.
3. Confirm the user acceptance test passes.
4. If fixes were required, commit them.

## Step 6: Manual Validation And PR

1. Ask for manual validation.
2. After user confirmation, create the pull request.

## Step 7: Next Feature

1. Return to `main`.
2. Move to the next backlog item from left to right.

## Branch Naming

- `feature/01-application-initialize`
- `feature/02-display-todos`
- `feature/03-add-todo`
- `feature/04-complete-todo`
- `feature/05-delete-todo`

## Test Principles

- Acceptance tests verify complete user-visible behavior.
- Unit tests verify one requirement at a time.
- Avoid asserting implementation details such as internal helpers, exact DOM structure, or private function names unless the spec requires them.
