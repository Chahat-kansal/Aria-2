async function sendMessage() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");
  const message = input.value;
  if (!message) return;

  chat.innerHTML += `<p><b>You:</b> ${message}</p>`;
  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    chat.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
    chat.scrollTop = chat.scrollHeight;
  } catch (err) {
    console.error(err);
    chat.innerHTML += `<p><b>AI:</b> Error connecting to server.</p>`;
  }
}