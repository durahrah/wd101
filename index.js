document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const tableBody = document.querySelector("#userTable tbody");

  function calculateAge(dob) {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  function loadEntries() {
    const data = JSON.parse(localStorage.getItem("users") || "[]");
    tableBody.innerHTML = "";
    data.forEach((entry) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.terms ? "Yes" : "No"}</td>
      `;
      tableBody.appendChild(tr);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const dobValue = document.getElementById("dob").value;
    const terms = document.getElementById("terms").checked;

    if (!name) return alert("⚠️ Name is required!");
    if (!email) return alert("⚠️ Email is required!");
    if (!validateEmail(email))
      return alert("❌ Please enter a valid email (e.g. user@example.com).");
    if (!password) return alert("⚠️ Password is required!");
    if (!dobValue) return alert("⚠️ DOB is required!");

    const dob = new Date(dobValue);
    const min = new Date("1967-11-09");
    const max = new Date("2025-06-19");
    if (dob < min || dob > max) {
      return alert("🚫 DOB must be between Nov 9, 1967 and Jun 19, 2025.");
    }

    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
      return alert(`🚫 Your age must be between 18 and 55. Your age: ${age}`);
    }

    if (!terms) return alert("⚠️ You must accept the Terms & Conditions!");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ name, email, password, dob: dobValue, terms });
    localStorage.setItem("users", JSON.stringify(users));
    loadEntries();
    form.reset();
  });

  loadEntries();

  // Basic email validator (you should already have this)
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
