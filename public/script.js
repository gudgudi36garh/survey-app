// ===== CONFIG =====
const API_BASE = "https://survey-backend.gudgudi36garh.workers.dev";

// ==================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("surveyForm");
  const msg = document.getElementById("response");

  if (!form) {
    console.error("Form with id 'surveyForm' not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop default GET request

    msg.textContent =
      "Recording your feedback... (फीडबैक दर्ज किया जा रहा है...)";

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${API_BASE}/api/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error("Request failed with status " + res.status);
      }

      const result = await res.json();

      if (result.success) {
        msg.innerHTML = `
          <span style="color:green">
            Thank you! Feedback recorded successfully.<br>
            धन्यवाद! आपकी प्रतिक्रिया सफलतापूर्वक दर्ज की गई।
          </span>
        `;
        form.reset();
      } else {
        throw new Error("Backend returned failure");
      }
    } catch (err) {
      console.error("Submit error:", err);
      msg.innerHTML = `
        <span style="color:red">
          Error submitting feedback. Please try again.
        </span>
      `;
    }
  });
});
