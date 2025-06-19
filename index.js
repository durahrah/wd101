document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('userForm');
  const tableBody = document.getElementById('userTableBody');

  function calculateAge(dob) {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function renderTable() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    tableBody.innerHTML = '';

    users.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.terms ? 'Yes' : 'No'}</td>
      `;
      tableBody.appendChild(tr);
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const dobValue = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    if (!name) return alert('Name is required');
    if (!email) return alert('Email is required');
    if (!validateEmail(email)) return alert('Invalid email format');
    if (!password) return alert('Password is required');
    if (!dobValue) return alert('DOB is required');

    const dob = new Date(dobValue);
    const min = new Date('1967-11-09');
    const max = new Date('2025-06-19');
    if (dob < min || dob > max) return alert('DOB must be in the allowed range');

    const age = calculateAge(dob);
    if (age < 18 || age > 55) return alert('Age must be between 18 and 55');

    if (!terms) return alert('You must accept the terms');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ name, email, password, dob: dobValue, terms });
    localStorage.setItem('users', JSON.stringify(users));

    renderTable();
    form.reset();
  });

  renderTable();
});
