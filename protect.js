// The owner's photo: no right-click save, no drag, no long-press menu. It cannot stop a screenshot; it removes the easy ways.
document.querySelectorAll("[data-protect]").forEach(el => {
  ["contextmenu", "dragstart", "copy", "selectstart"].forEach(ev => el.addEventListener(ev, e => e.preventDefault()));
});
