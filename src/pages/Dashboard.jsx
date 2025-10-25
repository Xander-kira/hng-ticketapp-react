import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearSession, getSession } from "../utils/auth";
import { getAllTickets } from "../utils/tickets";

export default function Dashboard() {
  const navigate = useNavigate();
  const session = getSession();

  // We'll store live stats here
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
  });

  // Load ticket stats when the dashboard first renders
  useEffect(() => {
    const all = getAllTickets(); // from localStorage

    const openCount = all.filter((t) => t.status === "open").length;
    const closedCount = all.filter((t) => t.status === "closed").length;

    setStats({
      total: all.length,
      open: openCount,
      closed: closedCount,
    });
  }, []);

  function handleLogout() {
    clearSession();
    navigate("/"); // back to landing
  }

  return (
    <div className="max-w-md text-left bg-[#0f172a] border border-[rgba(80,80,255,0.4)] rounded-xl shadow-[0_30px_80px_rgba(80,80,255,0.2)] p-6 w-full">
      {/* Header row with user + logout */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">
            Dashboard
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Signed in as{" "}
            <span className="text-[rgb(80,80,255)]">
              {session?.email || "unknown"}
            </span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg px-3 py-2"
        >
          Logout
        </button>
      </div>

      {/* LIVE STATS */}
      <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
        {/* Total tickets */}
        <div className="bg-[#1e253d] rounded-lg p-3 border border-gray-600">
          <div className="text-white font-semibold text-lg">
            {stats.total}
          </div>
          <div className="text-gray-400">Total</div>
        </div>

        {/* Open tickets */}
        <div className="bg-[#1e253d] rounded-lg p-3 border border-gray-600">
          <div className="text-green-400 font-semibold text-lg">
            {stats.open}
          </div>
          <div className="text-gray-400">Open</div>
        </div>

        {/* Closed tickets */}
        <div className="bg-[#1e253d] rounded-lg p-3 border border-gray-600">
          <div className="text-gray-300 font-semibold text-lg">
            {stats.closed}
          </div>
          <div className="text-gray-400">Closed</div>
        </div>
      </div>

      {/* LITTLE HINT / NAV */}
      <div className="mt-8 text-[11px] text-gray-500 leading-relaxed">
        <p>
          These stats are calculated from your actual tickets saved in
          localStorage. Create or close tickets on the{" "}
          <button
            onClick={() => navigate("/app/tickets")}
            className="text-[rgb(80,80,255)] hover:text-[rgb(100,100,255)] underline underline-offset-2"
          >
            Tickets page
          </button>
          .
        </p>
      </div>
    </div>
  );
}
