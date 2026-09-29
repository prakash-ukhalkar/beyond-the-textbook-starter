// ==========================================================
// Class Guestbook: Admin panel
// Lets a signed-in teacher/admin review messages and delete
// anything inappropriate. Everyone else only gets read+post
// access (see app.js and setup.sql).
// ==========================================================

// STEP 1: Same project details as app.js. Paste your own here too.
const SUPABASE_URL = "https://YOUR-PROJECT-ID.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLISHABLE_KEY";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// STEP 2: Find the elements on the page
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const loginStatus = document.getElementById("login-status");

const adminPanel = document.getElementById("admin-panel");
const whoText = document.getElementById("who");
const logoutBtn = document.getElementById("logout-btn");
const list = document.getElementById("message-list");
const count = document.getElementById("count");

// ----------------------------------------------------------
// SIGN IN: only an account created by the teacher in the
// Supabase dashboard (Authentication -> Users -> Add user) works.
// ----------------------------------------------------------
loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (SUPABASE_URL.includes("YOUR-PROJECT-ID")) {
    setLoginStatus("Setup needed: paste your Supabase URL and publishable key into admin.js.", "error");
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = "Signing in...";

  const { error } = await db.auth.signInWithPassword({
    email: emailInput.value.trim(),
    password: passwordInput.value
  });

  if (error) {
    setLoginStatus("Could not sign in: " + error.message, "error");
  }

  loginBtn.disabled = false;
  loginBtn.textContent = "Sign in";
});

logoutBtn.addEventListener("click", async function () {
  await db.auth.signOut();
});

// ----------------------------------------------------------
// Show the login form or the admin panel depending on
// whether someone is currently signed in.
// ----------------------------------------------------------
db.auth.onAuthStateChange(function (_event, session) {
  if (session) {
    loginForm.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    whoText.textContent = "Signed in as " + session.user.email;
    loadMessages();
  } else {
    loginForm.classList.remove("hidden");
    adminPanel.classList.add("hidden");
    loginForm.reset();
  }
});

// ----------------------------------------------------------
// READ: get every message, newest first
// ----------------------------------------------------------
async function loadMessages() {
  const { data, error } = await db
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    list.innerHTML = "";
    addEmptyLine("Could not load messages: " + error.message);
    console.error(error);
    return;
  }

  showMessages(data);
}

// ----------------------------------------------------------
// DELETE: remove one row. RLS only allows this for a
// signed-in (authenticated) user - see setup.sql.
// ----------------------------------------------------------
async function deleteMessage(id) {
  const { error } = await db.from("feedback").delete().eq("id", id);

  if (error) {
    alert("Could not delete: " + error.message);
    console.error(error);
    return;
  }

  loadMessages();
}

// ----------------------------------------------------------
// Helpers that build the list on the page
// ----------------------------------------------------------
function showMessages(rows) {
  list.innerHTML = "";
  count.textContent = "(" + rows.length + ")";

  if (rows.length === 0) {
    addEmptyLine("No messages yet.");
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

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "delete-btn";
    removeBtn.textContent = "Delete";
    removeBtn.addEventListener("click", function () {
      if (confirm("Delete this message from " + row.name + "?")) {
        deleteMessage(row.id);
      }
    });

    item.append(who, when, text, removeBtn);
    list.appendChild(item);
  });
}

function addEmptyLine(text) {
  const item = document.createElement("li");
  item.className = "empty";
  item.textContent = text;
  list.appendChild(item);
}

function setLoginStatus(message, type) {
  loginStatus.textContent = message;
  loginStatus.className = type;
}
