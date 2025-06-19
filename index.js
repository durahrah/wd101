document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const table = document.getElementById("userTable");
  const tbody = document.getElementById("userTableBody");

  function calculateAge(dob) {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    return age;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function renderTable() {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    tbody.innerHTML = "";

    users.map((user) => {
      const row = tbody.insertRow();
      [
        user.name,
        user.email,
        user.password,
        user.dob,
        user.terms ? "Yes" : "No",
      ].map((value) => {
        const cell = row.insertCell();
        cell.textContent = value;
      });
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const pwd = document.getElementById("password").value;
    const dobValue = document.getElementById("dob").value;
    const terms = document.getElementById("terms").checked;

    if (!name) return alert("Name required");
    if (!email) return alert("Email required");
    if (!validateEmail(email)) return alert("Invalid email format");
    if (!pwd) return alert("Password required");
    if (!dobValue) return alert("DOB required");

    const dob = new Date(dobValue);
    if (dob < new Date("1967-11-09") || dob > new Date("2025-06-19"))
      return alert("DOB must be between Nov 9, 1967 and Jun 19, 2025");

    const age = calculateAge(dob);
    if (age < 18 || age > 55) return alert(`Age ${age}—must be 18‑55`);

    if (!terms) return alert("Accept the Terms & Conditions");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ name, email, password: pwd, dob: dobValue, terms });
    localStorage.setItem("users", JSON.stringify(users));

    renderTable();
    form.reset();
  });

  renderTable();
});

