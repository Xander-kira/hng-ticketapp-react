import { useEffect, useState } from "react";
import {
  getAllTickets,
  createTicket,
  deleteTicket,
  updateTicket,
} from "../utils/tickets";

export default function Tickets() {
  // list of all tickets
  const [tickets, setTickets] = useState([]);

  // form state for creating a ticket
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");

  // UI state
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [editingId, setEditingId] = useState(null); // which ticket we're editing (id)
  const [isDeletingId, setIsDeletingId] = useState(null); // confirm delete on which ticket

  // load tickets on first render
  useEffect(() => {
    const data = getAllTickets();
    setTickets(data);
  }, []);

  // helper to reset form
  function resetForm() {
    setTitle("");
    setDescription("");
    setStatus("open");
    setEditingId(null);
    setError("");
    setSuccessMsg("");
  }

  // handle submit (create OR update)
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    // try/catch so we can show nice error messages
    try {
      if (editingId) {
        // update existing
        const updated = updateTicket(editingId, {
          title,
          description,
          status,
        });
        setTickets((prev) =>
          prev.map((t) => (t.id === editingId ? updated : t))
        );
        setSuccessMsg("Ticket updated successfully.");
      } else {
        // create new
        const created = createTicket({
          title,
          description,
          status,
        });
        setTickets((prev) => [created, ...prev]);
        setSuccessMsg("Ticket created successfully.");
      }

      resetForm();
    } catch (err) {
      setError(err.message || "Something went wrong. Please retry.");
    }
  }

  // start editing an existing ticket
  function startEdit(ticket) {
    setEditingId(ticket.id);
    setTitle(ticket.title);
    setDescription(ticket.description);
    setStatus(ticket.status);
    setError("");
    setSuccessMsg("");
  }

  // cancel edit
  function cancelEdit() {
    resetForm();
  }

  // stage delete confirmation (don't delete instantly)
  function askDelete(id) {
    setIsDeletingId(id);
  }

  // actually delete
  function confirmDelete() {
    if (!isDeletingId) return;
    deleteTicket(isDeletingId);
    setTickets((prev) => prev.filter((t) => t.id !== isDeletingId));
    setIsDeletingId(null);
    setSuccessMsg("Ticket deleted.");
  }

  // cancel delete
  function cancelDelete() {
    setIsDeletingId(null);
  }

  // small helper to color-code status
  function statusStyles(st) {
    if (st === "open")
      return "bg-green-500/20 text-green-300 border border-green-500/40";
    if (st === "in_progress")
      return "bg-amber-500/20 text-amber-300 border border-amber-500/40";
    return "bg-gray-500/20 text-gray-300 border border-gray-500/40"; // closed
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8 py-10 text-left text-white">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Tickets
          </h1>
          <p className="text-sm text-gray-400">
            Create, edit, resolve, and track all support tickets here.
          </p>
        </div>
        {editingId ? (
          <button
            onClick={cancelEdit}
            className="text-xs font-medium bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-3 py-2"
          >
            Cancel edit
          </button>
        ) : null}
      </div>

      {/* CREATE / EDIT FORM */}
      <div className="bg-[#0f172a] border border-[rgba(80,80,255,0.4)] rounded-xl shadow-[0_30px_80px_rgba(80,80,255,0.15)] p-6 max-w-xl">
        <h2 className="text-lg font-medium text-white mb-4">
          {editingId ? "Update Ticket" : "New Ticket"}
        </h2>

        {/* feedback messages */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/20 border border-red-500/40 rounded-lg px-3 py-2">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 text-sm text-green-400 bg-green-900/20 border border-green-500/40 rounded-lg px-3 py-2">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title (REQUIRED) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-300" htmlFor="title">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              id="title"
              className="bg-[#1e253d] border border-gray-600 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[rgb(80,80,255)]"
              placeholder="Cannot login / App is crashing / etc..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
                setSuccessMsg("");
              }}
            />
          </div>

          {/* Description (OPTIONAL BUT WE STILL VALIDATE LENGTH) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-300" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              className="bg-[#1e253d] border border-gray-600 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[rgb(80,80,255)] resize-none"
              placeholder="Extra details for context (optional, 200 chars max)"
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setDescription(e.target.value);
                }
                setError("");
                setSuccessMsg("");
              }}
            />
            <div className="text-[10px] text-gray-500 text-right">
              {description.length}/200
            </div>
          </div>

          {/* Status (REQUIRED AND LIMITED CHOICES) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-300" htmlFor="status">
              Status <span className="text-red-400">*</span>
            </label>
            <select
              id="status"
              className="bg-[#1e253d] border border-gray-600 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[rgb(80,80,255)]"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setError("");
                setSuccessMsg("");
              }}
            >
              <option value="open">open</option>
              <option value="in_progress">in_progress</option>
              <option value="closed">closed</option>
            </select>
            <p className="text-[10px] text-gray-500">
              Only "open", "in_progress", or "closed" are allowed.
            </p>
          </div>

          <button
            type="submit"
            className="text-sm font-medium bg-[rgb(80,80,255)] hover:bg-[rgb(100,100,255)] text-white rounded-lg px-4 py-2 shadow-[0_20px_60px_rgba(80,80,255,0.4)]"
          >
            {editingId ? "Save Changes" : "Create Ticket"}
          </button>
        </form>
      </div>

      {/* DELETE CONFIRM MODAL-ish (inline simple for now) */}
      {isDeletingId && (
        <div className="mt-6 max-w-xl bg-[#2d0f14] border border-red-500/40 rounded-xl p-4 text-sm">
          <p className="text-red-300 font-medium mb-3">
            Are you sure you want to delete this ticket? This cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg px-3 py-2"
            >
              Yes, delete it
            </button>
            <button
              onClick={cancelDelete}
              className="bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium rounded-lg px-3 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* TICKET LIST */}
      <div className="mt-10">
        <h2 className="text-lg font-medium text-white mb-4">
          All Tickets
        </h2>

        {tickets.length === 0 ? (
          <div className="text-sm text-gray-500 bg-[#1e253d] border border-gray-700 rounded-lg px-4 py-6 max-w-xl">
            <p className="text-center">
              No tickets yet. Create your first ticket above.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="bg-[#0f172a] border border-gray-700 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-white font-semibold text-base leading-snug break-words">
                      {t.title}
                    </h3>

                    {/* STATUS BADGE */}
                    <span
                      className={
                        "text-[10px] font-medium rounded-md px-2 py-1 leading-none whitespace-nowrap " +
                        statusStyles(t.status)
                      }
                    >
                      {t.status}
                    </span>
                  </div>

                  {t.description && (
                    <p className="text-gray-400 text-xs mt-3 leading-relaxed break-words">
                      {t.description}
                    </p>
                  )}

                  <p className="text-[10px] text-gray-600 mt-3">
                    Created: {new Date(t.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => startEdit(t)}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-[11px] font-medium rounded-lg px-3 py-1.5"
                  >
                    Edit
                  </button>

                    <button
                      onClick={() => askDelete(t.id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-medium rounded-lg px-3 py-1.5"
                    >
                      Delete
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
