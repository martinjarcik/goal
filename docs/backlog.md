# Backlog

Ordered from left to right in `storymap.jpg`.

## 1. Application Initialize

Prepare the base screen so the app loads with a visible shell and title.

### Subtasks

- Render the empty application shell on first load.
- Show the `Todo` heading inside the shell.
- Ensure the shell is ready to display empty and populated states.

## 2. Display Todos

Show the current todo state, including the empty-state hint and the visible list.

### Subtasks

- Show placeholder helper text when there are no todos yet.
- Render the list of todo items when items exist.
- Swap cleanly between empty and populated states.

## 3. Add Todo

Allow the user to enter a new todo and append it to the list.

### Subtasks

- Render a text input and add button.
- Disable the add button when the input is empty.
- Add a new todo to the end of the list on submit.
- Clear the input after a successful add.

## 4. Complete Todo

Allow the user to mark an item complete and reflect that state visually.

### Subtasks

- Render a toggle control next to each todo item.
- Toggle the completed state when the control is used.
- Apply strikethrough styling to completed items.

## 5. Delete Todo

Allow the user to remove an item directly from the list.

### Subtasks

- Render a delete button next to each todo item.
- Remove the selected todo when the delete button is pressed.

## MVP Feature List

- Feature 1: application initialize
- Feature 2: display todos
- Feature 3: add todo
- Feature 4: complete todo
- Feature 5: delete todo
