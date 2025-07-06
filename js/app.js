document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('exerciseForm');
  const nameInput = document.getElementById('name');
  const seriesInput = document.getElementById('series');
  const repsInput = document.getElementById('reps');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const series = seriesInput.value.trim();
    const reps = repsInput.value.trim();

    const isValidName = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(name);

    if (!isValidName || !series || !reps || +series < 1 || +reps < 1) {
      if (!isValidName) nameInput.classList.add('invalid-input');
      if (!series || +series < 1) seriesInput.classList.add('invalid-input');
      if (!reps || +reps < 1) repsInput.classList.add('invalid-input');
      return;
    }

    const exercise = {
      id: Date.now(),
      name,
      series,
      reps,
      completed: false
    };

    const stored = localStorage.getItem('exercises');
    const exercises = stored ? JSON.parse(stored) : [];
    exercises.push(exercise);
    localStorage.setItem('exercises', JSON.stringify(exercises));

    window.location.href = 'templates/listagem.html';
  });
});
