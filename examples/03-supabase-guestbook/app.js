// ==========================================================
// Class Guestbook with Supabase
// ==========================================================

// STEP 1: Paste your own project details here.
// Find them in Supabase: Project Settings -> API Keys (or the "Connect" button).
// The PUBLISHABLE key (starts with sb_publishable_) is safe in a web page
// because Row Level Security protects the table.
// NEVER paste the SECRET key (sb_secret_...) or the service_role key here.
const SUPABASE_URL = "https://kpgdedwlegwvvcmzwlur.supabase.co";
const SUPABASE_KEY = "sb_publishable_jPZB2HSQEmVcuMTRhExVyw_ajSINF2t";

// STEP 2: Connect to Supabase
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// STEP 3: Find the elements on the page
const form = document.getElementById("guestbook-form");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const button = document.getElementById("post-btn");
const statusText = document.getElementById("status");
const list = document.getElementById("message-list");
const count = document.getElementById("count");

// ----------------------------------------------------------
// READ: get all messages from the "feedback" table
// ----------------------------------------------------------
async function loadMessages() {
  const { data, error } = await db
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false }) // newest first
    .limit(50);

  if (error) {
    list.innerHTML = "";
    addEmptyLine("Could not load messages: " + error.message);
    console.error(error);
    return;
  }

  showMessages(data);
}

// ----------------------------------------------------------
// WRITE: save a new message when the form is submitted
// ----------------------------------------------------------
form.addEventListener("submit", async function (event) {
  event.preventDefault(); // stop the page from reloading

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  if (!name || !message) return;

  button.disabled = true;
  button.textContent = "Posting...";

  const { error } = await db
    .from("feedback")
    .insert({ name: name, message: message });

  if (error) {
    setStatus("Could not save: " + error.message, "error");
    console.error(error);
  } else {
    setStatus("Thanks, " + name + "! Your message is posted.", "success");
    form.reset();
    loadMessages(); // refresh the list so the new message appears
  }

  button.disabled = false;
  button.textContent = "Post message";
});

// ----------------------------------------------------------
// Helpers that build the list on the page
// ----------------------------------------------------------
function showMessages(rows) {
  list.innerHTML = "";
  count.textContent = "(" + rows.length + ")";

  if (rows.length === 0) {
    addEmptyLine("No messages yet. Be the first!");
    return;
  }

  rows.forEach(function (row) {
    const item = document.createElement("li");

    const who = document.createElement("strong");
    who.textContent = row.name; // textContent keeps visitors from injecting HTML

    const when = document.createElement("span");
    when.className = "time";
    when.textContent = new Date(row.created_at).toLocaleString("en-IN");

    const text = document.createElement("p");
    text.textContent = row.message;

    item.append(who, when, text);
    list.appendChild(item);
  });
}

function addEmptyLine(text) {
  const item = document.createElement("li");
  item.className = "empty";
  item.textContent = text;
  list.appendChild(item);
}

function setStatus(message, type) {
  statusText.textContent = message;
  statusText.className = type;
}

// STEP 4: Load messages as soon as the page opens
if (SUPABASE_URL.includes("YOUR-PROJECT-ID")) {
  list.innerHTML = "";
  addEmptyLine("Setup needed: paste your Supabase URL and publishable key into app.js.");
  button.disabled = true;
} else {
  loadMessages();
}
