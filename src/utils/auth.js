// the localStorage key required by the task
const SESSION_KEY = "ticketapp_session";

// Fake "create session" after login.
// In real life you'd get a token from API. Here we'll just store something.
export function createSession(userEmail) {
  const sessionData = {
    email: userEmail,
    token: "fake-token-" + Date.now(), // unique-ish
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
}

// Check if the user is logged in
export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Destroy / logout
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
