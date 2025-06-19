// -- Utility: safely get entries array
function getEntries() {
  const stored = localStorage.getItem('myapp_userEntries');
  return stored ? JSON.parse(stored) : [];
}

// -- Utility: save entries array
function saveEntries(entries) {
  localStorage.setItem('myapp_userEntries', JSON.stringify(entries));
}

// -- Validate email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// -- Calculate age based on DOB
function calculateAge(dob) {
  const diffMs = Date.now() - dob.getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
}

// -- Render table from stored entries
function renderTable() {
  const entries = getEntries();
  const tbody = document.getElementById('userTableBody');
  tbody.innerHTML = ''; // clear old rows

  entries.forEach(entry => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.terms ? 'Yes' : 'No'}</td>`;
    tbody.appendChild(tr);
  });
}

// -- Form submission handler
function setupForm() {
  document.getElementById('userForm').addEventListener('submit', e => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const dobVal = form.dob.value;
    const terms = form.terms.checked;

    // 🛡️ Validations
    if (!name) return alert('Name is required');
    if (!isValidEmail(email)) return alert('Valid email is required');
    if (!password) return alert('Password is required');
    if (!dobVal) return alert('Date of birth is required');
    if (!terms) return alert('You must accept the terms');

    const dob = new Date(dobVal);
    const age = calculateAge(dob);
    if (age < 18 || age > 55) return alert(`Age must be 18–55 (you are ${age})`);

    // ✅ Save
    const entries = getEntries();
    entries.push({ name, email, password, dob: dobVal, terms });
    saveEntries(entries);

    // 🖥️ Refresh table and reset form
    renderTable();
    form.reset();
  });
}

// -- Initialization on page load
document.addEventListener('DOMContentLoaded', () => {
  setupForm();
  renderTable();
});
