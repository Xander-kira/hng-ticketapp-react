import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">

        {/* Top navigation bar for testing routes */}
        <nav className="bg-gray-800 px-6 py-4 flex flex-wrap gap-4 text-sm font-medium">
          <Link to="/" className="hover:text-indigo-400">Home</Link>
          <Link to="/auth/login" className="hover:text-indigo-400">Login</Link>
          <Link to="/auth/signup" className="hover:text-indigo-400">Signup</Link>
          <Link to="/app/dashboard" className="hover:text-indigo-400">Dashboard</Link>
          <Link to="/app/tickets" className="hover:text-indigo-400">Tickets</Link>
        </nav>

        {/* Routed content */}
        <main className="flex-1 flex items-center justify-center p-8 text-center">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
           <Route
    path="/app/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
            <Route
    path="/app/tickets"
    element={
      <ProtectedRoute>
        <Tickets />
      </ProtectedRoute>
    }
  />
          </Routes>
        </main>

        {/* Temporary footer */}
        <footer className="bg-gray-800 text-gray-400 text-xs text-center py-4">
          TicketApp • HNG Stage 2
        </footer>
      </div>
    </Router>
  );
}

export default App;

