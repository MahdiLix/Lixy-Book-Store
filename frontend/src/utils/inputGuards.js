export function restrictTitleInput(event) {
  const key = event.key;
  const allowedControlKeys = [
    "Backspace",
    "Shift",
    "Delete",
    "Tab",
    "Escape",
    "Enter",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End",
  ];

  if (allowedControlKeys.includes(key) || event.ctrlKey || event.metaKey) return;

  const allowedRegex = /^[A-Za-z0-9\s\-+_.'"*]$/;
  if (!allowedRegex.test(key)) {
    event.preventDefault();
    alert(`Invalid character: ${key}`);
  }
}

export function restrictAuthorInput(event) {
  const key = event.key;
  const allowedControlKeys = [
    "Backspace",
    "Delete",
    "Shift",
    "Tab",
    "Escape",
    "Enter",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End",
  ];

  if (allowedControlKeys.includes(key) || event.ctrlKey || event.metaKey) return;

  const allowedRegex = /^[A-Za-z0-9\s\-+_.'"*]$/;
  if (!allowedRegex.test(key)) {
    event.preventDefault();
    alert(`Invalid character: ${key}`);
  }
}