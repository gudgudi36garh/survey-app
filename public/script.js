document.getElementById('surveyForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    const msg = document.getElementById('response');
    if (result.success) {
      msg.textContent = 'Thank you! Your feedback has been recorded.';
      msg.className = 'message success';
      e.target.reset();
    } else {
      msg.textContent = 'Error: Could not save feedback.';
      msg.className = 'message error';
    }
  } catch (err) {
    console.error(err);
    document.getElementById('response').textContent = 'Network error. Please try again.';
    document.getElementById('response').className = 'message error';
  }
});