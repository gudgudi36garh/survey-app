fetch("https://api.yourdomain.com/submit", {
  method: "POST",
  body: JSON.stringify(data),
  headers: { "Content-Type": "application/json" }
});
