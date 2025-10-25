const USERS_KEY = "ticketapp_users";

function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// register a new user
export function registerUser(email, password) {
  if (!email.trim() || !password.trim()) {
    throw new Error("All fields are required.");
  }

  const users = loadUsers();

  // check if email already exists
  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    throw new Error("An account with this email already exists.");
  }

  const newUser = { email, password }; // plain text for demo ONLY
  users.push(newUser);
  saveUsers(users);

  return newUser;
}

// verify login credentials
export function validateCredentials(email, password) {
  const users = loadUsers();
  const found = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );
  return !!found; // true if match, false if not
}
