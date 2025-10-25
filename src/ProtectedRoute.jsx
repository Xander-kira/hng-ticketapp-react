import { Navigate } from "react-router-dom";
import { getSession } from "./utils/auth";

export default function ProtectedRoute({ children }) {
  const session = getSession();

  if (!session) {
    // not logged in, redirect to login with message
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ message: "Your session has expired — please log in again." }}
      />
    );
  }

  // logged in, allow access
  return children;
}
