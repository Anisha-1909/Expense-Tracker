//simple loginpage
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please fill in both fields");
    return;
  }

  //no real authentication yet — just moves to the tracker page.
  //replace this with your actual login logic when ready.
  //redirects(pagenavigation)the login page to dashboardpage
  window.location.href = "index.html";
});
