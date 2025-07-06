document.addEventListener('DOMContentLoaded', () => {
  const listContainer = document.getElementById('exerciseList');
  const filterAll = document.getElementById('filterAll');
  const filterPending = document.getElementById('filterPending');
  const filterCompleted = document.getElementById('filterCompleted');

  let exercises = JSON.parse(localStorage.getItem('exercises')) || [];

  function saveAndRender(filter = 'all') {
    localStorage.setItem('exercises', JSON.stringify(exercises));
    renderList(filter);
  }

  function renderList(filter = 'all') {
    listContainer.innerHTML = '';

    const filtered =
      filter === 'pending'
        ? exercises.filter(e => !e.completed)
        : filter === 'completed'
        ? exercises.filter(e => e.completed)
        : exercises;

    filtered.forEach(ex => {
      const card = document.createElement('div');
      card.className = 'exercise-card';
      if (ex.completed) card.classList.add('exercise-completed');

      const info = document.createElement('div');
      info.innerHTML = `
        <h2 class="exercise-title">${ex.name}</h2>
        <p class="exercise-desc">${ex.series} séries - ${ex.reps} repetições</p>
      `;

      const actions = document.createElement('div');
      actions.className = 'flex gap-2';

      if (!ex.completed) {
        const completeBtn = document.createElement('button');
        completeBtn.textContent = '✔ Concluir';
        completeBtn.className = 'px-3 py-1 text-sm rounded bg-indigo-500 text-white hover:bg-indigo-600';
        completeBtn.onclick = () => {
          ex.completed = true;
          saveAndRender(filter);
        };
        actions.appendChild(completeBtn);
      }

      if (!ex.completed) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑 Excluir';
        deleteBtn.className = 'px-3 py-1 text-sm rounded bg-indigo-800 text-white hover:bg-indigo-900';
        deleteBtn.onclick = () => {
          exercises = exercises.filter(e => e.id !== ex.id);
          saveAndRender(filter);
        };
        actions.appendChild(deleteBtn);
      }

      card.append(info, actions);
      listContainer.appendChild(card);
      requestAnimationFrame(() => card.classList.add('fade-in'));
    });
  }

  filterAll.onclick = () => renderList('all');
  filterPending.onclick = () => renderList('pending');
  filterCompleted.onclick = () => renderList('completed');

  renderList('all');
});
