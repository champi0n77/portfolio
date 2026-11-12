/* ============================================================
   Victor Agbo — COS 106 Term Project
   Academic Planner — task data and rendering (js/planner.js)

   This file is loaded only by planner.html.

   As required by the DOM demonstration checklist, EVERYTHING is
   wrapped in a DOMContentLoaded listener: nothing runs until the
   browser has finished parsing the HTML, so each element we look
   for is guaranteed to exist.

   Build roadmap:
     Step 2  tasks array + render()        <- this file, now
     Step 3  adding a task from the form
     Step 4  completing and deleting a task (event delegation)
     Step 5  live counts and filters
     Step 6  localStorage, sorting, polish
   ============================================================ */

// Event handling: DOMContentLoaded fires once the HTML is parsed.
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* ==========================================================
     1. DOM SELECTION
     Each element is looked up once, here at the top of the file,
     and stored in a constant. Later functions reuse these
     constants instead of repeating queries all over the script,
     so renaming an id only means editing one line.
     ========================================================== */

  // DOM selection: document.getElementById
  const taskList = document.getElementById("task-list");
  const emptyState = document.getElementById("empty-state");

  /* ==========================================================
     2. TASK DATA
     The tasks live in one array of objects, which is the "single
     source of truth". The list on screen is only a view built
     from this array: change the array, then call render().
     ========================================================== */

  const seedTime = Date.now();

  // TEMPORARY SEED DATA so Step 2 can be checked on screen.
  // These two objects are deleted again before Step 3 begins.
  let tasks = [
    {
      id: seedTime,                 // unique id from Date.now()
      text: "Submit COS 106 assignment 2",
      dueDate: "2026-11-14",        // ISO format: YYYY-MM-DD
      category: "Assignment",
      completed: false
    },
    {
      id: seedTime + 1,             // +1 keeps the second id unique
      text: "Revise for the MTH 102 test",
      dueDate: "2026-11-20",
      category: "Exam",
      completed: false
    }
  ];

  /* ==========================================================
     3. HELPER FUNCTIONS
     ========================================================== */

  /**
   * formatDueDate("2026-11-14")  ->  "14 Nov 2026"
   *
   * The ISO string is split by hand rather than passed to
   * new Date(), because an ISO date is read as midnight UTC and
   * can therefore display the previous day in some time zones.
   */
  function formatDueDate(isoDate) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const parts = isoDate.split("-");   // ["2026", "11", "14"]
    if (parts.length !== 3) {
      return isoDate;                   // not a date we understand
    }

    const monthIndex = Number(parts[1]) - 1;
    if (!months[monthIndex]) {
      return isoDate;                   // month out of range
    }

    return parts[2] + " " + months[monthIndex] + " " + parts[0];
  }

  /**
   * createTaskElement(task) -> <li> element
   *
   * Turns one task OBJECT into one DOM element. It is a separate
   * function so render() stays short and so each DOM technique
   * used to build an item can be pointed at on its own.
   */
  function createTaskElement(task) {
    // DOM manipulation: creating a new element with createElement
    const li = document.createElement("li");

    // DOM manipulation: adding a class with classList.add
    li.classList.add("task-item");

    // DOM manipulation: writing a data attribute through dataset.
    // "li.dataset.id = 123" creates data-id="123" in the HTML,
    // which the click handler later reads back with closest("li").
    li.dataset.id = String(task.id);

    // ---------- Checkbox + text, wrapped in a <label> ----------
    const label = document.createElement("label");
    label.classList.add("task-label");

    const checkbox = document.createElement("input");

    // DOM manipulation: setting an attribute with setAttribute
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("task-checkbox");
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", 'Mark "' + task.text + '" as complete');

    const content = document.createElement("span");
    content.classList.add("task-content");

    const text = document.createElement("span");
    text.classList.add("task-text");

    // DOM manipulation: writing text with textContent (never
    // innerHTML), so a task called "<b>hi</b>" stays plain text
    // instead of being parsed as markup.
    text.textContent = task.text;

    // ---------- Meta row: category badge + due date ----------
    const meta = document.createElement("span");
    meta.classList.add("task-meta");

    if (task.category) {
      const badge = document.createElement("span");
      badge.classList.add("task-badge");

      // "Assignment" becomes the modifier class task-badge--assignment,
      // which gives each category its own colour.
      badge.classList.add("task-badge--" + task.category.toLowerCase());
      badge.textContent = task.category;

      // DOM manipulation: appending a child with appendChild
      meta.appendChild(badge);
    }

    if (task.dueDate) {
      const due = document.createElement("span");
      due.classList.add("task-due");
      due.textContent = "Due " + formatDueDate(task.dueDate);
      meta.appendChild(due);
    }

    // DOM manipulation: append() accepts several children in one call
    content.append(text, meta);

    // ---------- Delete button ----------
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.classList.add("task-delete");
    deleteButton.setAttribute("aria-label", 'Delete "' + task.text + '"');
    deleteButton.textContent = "Delete";

    // DOM manipulation: append() again, this time on the label
    label.append(checkbox, content);

    // The finished item: [ label (checkbox + text/meta) ][ Delete ]
    li.append(label, deleteButton);

    return li;
  }

  /* ==========================================================
     4. RENDERING
     ========================================================== */

  /**
   * render()
   * Rebuilds the visible list from the tasks array. The array is
   * the truth; the DOM is only a picture of it, which is why this
   * function always starts by emptying the list.
   */
  function render() {
    // DOM manipulation: replaceChildren() clears the list. It
    // removes every existing child in one call, which is cleaner
    // than a while loop or setting innerHTML to "".
    taskList.replaceChildren();

    // Show the empty-state message only when there is nothing left.
    emptyState.hidden = tasks.length > 0;

    tasks.forEach(function (task) {
      const item = createTaskElement(task);

      // DOM manipulation: appending the new <li> to the list
      taskList.appendChild(item);
    });
  }

  // First paint: draw whatever the array already holds.
  render();
});
