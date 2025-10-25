const TICKETS_KEY = "ticketapp_tickets";

// Helper: read all tickets from localStorage
export function getAllTickets() {
  const raw = localStorage.getItem(TICKETS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Helper: save array of tickets back to localStorage
function saveTickets(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

// Create a new ticket
export function createTicket({ title, description, status }) {
  // basic validation here too
  if (!title || !title.trim()) {
    throw new Error("Title is required.");
  }

  const allowedStatuses = ["open", "in_progress", "closed"];
  if (!allowedStatuses.includes(status)) {
    throw new Error("Status must be open, in_progress, or closed.");
  }

  const newTicket = {
    id: crypto.randomUUID(), // unique id
    title: title.trim(),
    description: description?.trim() || "",
    status,
    createdAt: Date.now(),
  };

  const current = getAllTickets();
  const updated = [newTicket, ...current];
  saveTickets(updated);

  return newTicket;
}

// Update an existing ticket
export function updateTicket(id, updates) {
  const current = getAllTickets();
  const idx = current.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Ticket not found.");

  const allowedStatuses = ["open", "in_progress", "closed"];
  if (
    updates.status &&
    !allowedStatuses.includes(updates.status)
  ) {
    throw new Error("Status must be open, in_progress, or closed.");
  }

  const updatedTicket = {
    ...current[idx],
    ...updates,
  };
  current[idx] = updatedTicket;
  saveTickets(current);
  return updatedTicket;
}

// Delete a ticket
export function deleteTicket(id) {
  const current = getAllTickets();
  const filtered = current.filter((t) => t.id !== id);
  saveTickets(filtered);
}
