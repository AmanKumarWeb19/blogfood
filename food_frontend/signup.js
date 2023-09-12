document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = form.querySelector("#username").value;
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;
    const confirmPassword = form.querySelector("#confirm-password").value;

    if (password !== confirmPassword) {
      errorMessage.textContent = "Passwords do not match.";
    } else {
      // Simulate a successful signup (replace with your actual signup logic)
      alert("Account created successfully! You can now sign in.");
      window.location.href = "signin.html";
    }
  });
});
