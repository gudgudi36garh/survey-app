const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch(
      "https://survey-backend.gudgudi36garh.workers.dev/api/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    if (!res.ok) throw new Error("Request failed");

    alert("Feedback submitted successfully!");
    form.reset();
  } catch (err) {
    console.error(err);
    alert("Error submitting feedback. Please try again.");
  }
});
