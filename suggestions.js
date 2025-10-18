const input = document.getElementById('taken');
const list = document.getElementById('suggestions');
let allSuggestions = [];

// Load suggestions from text file
fetch('suggestions.txt')
  .then(res => res.text())
  .then(text => {
    allSuggestions = text.split('\n').map(line => line.trim()).filter(line => line);
  });

input.addEventListener('input', () => {
  const value = input.value.toLowerCase();
  list.innerHTML = '';

  if (!value) return;

  // Filter top 10 matches
  const matches = allSuggestions.filter(s => s.toLowerCase().includes(value)).slice(0, 10);

  for (const match of matches) {
    const li = document.createElement('li');
    li.textContent = match;
    li.addEventListener('click', () => {
      input.value = match;
      list.innerHTML = '';
    });
    list.appendChild(li);
  }
});