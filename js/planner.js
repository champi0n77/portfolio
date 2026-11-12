/* Academic planner: an array is the source of truth for the visible task list. */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('task-form');
  const title = document.getElementById('task-input');
  const description = document.getElementById('task-description');
  const dueDate = document.getElementById('due-date');
  const category = document.getElementById('task-category');
  const list = document.getElementById('task-list');
  const empty = document.getElementById('empty-state');
  const error = document.getElementById('form-error');
  const filters = document.querySelectorAll('.filter-btn');
  const storageKey = 'champion-portfolio-tasks';
  let tasks = [];
  let filter = 'all';

  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(stored)) tasks = stored;
  } catch (_) { /* The planner still works for this visit if storage is unavailable. */ }

  function saveTasks() {
    try { localStorage.setItem(storageKey, JSON.stringify(tasks)); }
    catch (_) { error.textContent = 'Your browser could not save tasks. Changes will only last for this visit.'; }
  }

  function addTask() {
    const taskTitle = title.value.trim();
    const taskDescription = description.value.trim();
    if (!taskTitle || !taskDescription) {
      error.textContent = 'Please enter a task title and description.';
      (!taskTitle ? title : description).focus();
      return;
    }
    error.textContent = '';
    tasks.push({ text: taskTitle, description: taskDescription, dueDate: dueDate.value, category: category.value, completed: false });
    saveTasks();
    form.reset();
    setFilter('all');
    title.focus();
  }

  function completeTask(task, completed) {
    task.completed = completed;
    saveTasks();
    displayTasks();
  }

  function deleteTask(task) {
    tasks = tasks.filter(item => item !== task);
    saveTasks();
    displayTasks();
  }

  function displayTasks() {
    const completed = tasks.filter(task => task.completed).length;
    document.getElementById('total-count').textContent = tasks.length;
    document.getElementById('completed-count').textContent = completed;
    document.getElementById('pending-count').textContent = tasks.length - completed;
    const shown = tasks.filter(task => filter === 'all' || (filter === 'completed' ? task.completed : !task.completed));
    list.replaceChildren();
    empty.hidden = shown.length > 0;
    empty.textContent = tasks.length ? 'No tasks in this view.' : 'No tasks yet. Add your first task above.';

    shown.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.completed ? ' task-item--completed' : '');
      const label = document.createElement('label'); label.className = 'task-label';
      const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.className = 'task-checkbox'; checkbox.checked = task.completed;
      checkbox.setAttribute('aria-label', (task.completed ? 'Mark as pending: ' : 'Mark as completed: ') + task.text);
      checkbox.addEventListener('change', () => completeTask(task, checkbox.checked));
      const content = document.createElement('span'); content.className = 'task-content';
      const text = document.createElement('span'); text.className = 'task-text'; text.textContent = task.text;
      const details = document.createElement('span'); details.className = 'task-description'; details.textContent = task.description || '';
      const meta = document.createElement('span'); meta.className = 'task-meta';
      const status = document.createElement('span'); status.className = 'task-status'; status.textContent = task.completed ? 'Completed' : 'Pending'; meta.append(status);
      if (task.category) { const badge = document.createElement('span'); badge.className = 'task-badge task-badge--' + task.category.toLowerCase(); badge.textContent = task.category; meta.append(badge); }
      if (task.dueDate) { const due = document.createElement('span'); due.className = 'task-due'; due.textContent = 'Due ' + task.dueDate; meta.append(due); }
      content.append(text, details, meta); label.append(checkbox, content);
      const button = document.createElement('button'); button.type = 'button'; button.className = 'task-delete'; button.textContent = 'Delete'; button.setAttribute('aria-label', 'Delete ' + task.text);
      button.addEventListener('click', () => deleteTask(task));
      li.append(label, button); list.append(li);
    });
  }

  function setFilter(value) {
    filter = value;
    filters.forEach(item => { const active = item.dataset.filter === value; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active)); });
    displayTasks();
  }

  form.addEventListener('submit', event => { event.preventDefault(); addTask(); });
  filters.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
  displayTasks();
});
