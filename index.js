// 1. Retrieve stored entries or return an empty array
const retrieveEntries = () => {
  const entries = localStorage.getItem("user‑entries");
  return entries ? JSON.parse(entries) : [];
};

// 2. Render the table using map() and template strings
const displayEntries = () => {
  const entries = retrieveEntries();

  const tableEntries = entries
    .map((entry) => {
      const accepted = entry.terms ? "Yes" : "No";
      return `
        <tr>
          <td class="border px-4 py-2">${entry.name}</td>
          <td class="border px-4 py-2">${entry.email}</td>
          <td class="border px-4 py-2">${entry.password}</td>
          <td class="border px-4 py-2">${entry.dob}</td>
          <td class="border px-4 py-2">${accepted}</td>
        </tr>`;
    })
    .join("");

  const table = `
    <table class="table-auto w-full border-collapse">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Password</th>
          <th class="px-4 py-2">Dob</th>
          <th class="px-4 py-2">accepted terms?</th>
        </tr>
      </thead>
      <tbody>
        ${tableEntries}
      </tbody>
    </table>`;

  document.getElementById("user‑entries").innerHTML = table;
};

// 3. Set up form submit handler
document.getElementById("userForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const terms = document.getElementById("terms").checked;

  // Basic validation
  if (!name) return alert("Name is required");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return alert("Valid email is required");
  if (!password) return alert("Password is required");
  if (!dob) return alert("DOB is required");
  if (!terms) return alert("You must accept the terms");

  // Check DOB range
  const dobDate = new Date(dob);
  const min = new Date("1967-11-09");
  const max = new Date("2025-06-19");
  if (dobDate < min || dobDate > max)
    return alert("DOB must be between Nov 9, 1967 and Jun 19, 2025");

  // Age validation
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) age--;
  if (age < 18 || age > 55)
    return alert(`Age must be between 18 and 55 (your age: ${age})`);

  // Store the entry
  const entries = retrieveEntries();
  entries.push({ name, email, password, dob, terms });
  localStorage.setItem("user‑entries", JSON.stringify(entries));

  // Re-render and reset form
  displayEntries();
  e.target.reset();
});

// 4. Initial table render on page load
displayEntries();
