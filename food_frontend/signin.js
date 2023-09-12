document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signin-form");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = form.querySelector("#username").value;
    const password = form.querySelector("#password").value;

    // Simulate a simple authentication check (replace with your actual authentication logic)
    if (username === "user" && password === "password") {
      // Redirect to home page
      window.location.href = "index.html";
    } else {
      errorMessage.textContent = "Invalid username or password.";
    }
  });
});

//
