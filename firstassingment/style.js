const eventsDiv = document.getElementById("events");

function addEvent() {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  if (!title || !date) {
    alert("Title and Date are required");
    return;
  }

  const event = document.createElement("div");
  event.className = "event";

  event.innerHTML = `
    <div class="delete" onclick="this.parentElement.remove()">×</div>
    <h3>${title}</h3>
    <small>📅 ${date}</small>
    <span>${category}</span>
    <p>${description}</p>
  `;

  eventsDiv.appendChild(event);

  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById("description").value = "";
}

function clearEvents() {
  eventsDiv.innerHTML = "";
}

function addSample() {
  eventsDiv.innerHTML = `
    <div class="event">
      <div class="delete" onclick="this.parentElement.remove()">×</div>
      <h3>Web Development Conference</h3>
      <small>📅 2026-02-15</small>
      <span>Conference</span>
      <p>Annual conference on modern web technologies.</p>
    </div>
  `;
} 