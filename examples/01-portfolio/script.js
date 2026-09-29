// ==========================================================
// Formspree: send the contact form with JavaScript (no page reload)
// Without this file, the form still works: the browser goes to
// Formspree's own "Thanks!" page instead.
// ==========================================================

const form = document.getElementById("contact-form");
const button = document.getElementById("send-btn");
const statusText = document.getElementById("form-status");

form.addEventListener("submit", async function (event) {
  event.preventDefault(); // stop the normal page change

  if (form.action.includes("YOUR_FORM_ID")) {
    showStatus("Setup needed: replace YOUR_FORM_ID in index.html with your Formspree form ID.", "error");
    return;
  }

  button.disabled = true;
  button.textContent = "Sending...";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" } // ask Formspree for a JSON reply
    });

    if (response.ok) {
      showStatus("Thank you! Your message has been sent.", "success");
      form.reset();
    } else {
      const data = await response.json();
      const reason = data.errors ? data.errors.map(e => e.message).join(", ") : "Please try again.";
      showStatus("Sorry, something went wrong: " + reason, "error");
    }
  } catch (error) {
    showStatus("Network problem. Check your internet connection and try again.", "error");
  }

  button.disabled = false;
  button.textContent = "Send message";
});

function showStatus(message, type) {
  statusText.textContent = message;
  statusText.className = type;
}
