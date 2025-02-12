import { Navigate } from "react-router-dom";

// Simulated authentication and role data
const fakeAuth = {
    isAuthenticated: true, // Set to false to simulate unauthenticated state
    user: {
        role: "instructor", // Replace with "user" or another role for testing
    },
};

export const ProtectedRoute = ({ children }) => {
    if (!fakeAuth.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export const AuthenticatedUser = ({ children }) => {
    if (fakeAuth.isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
};

export const AdminRoute = ({ children }) => {
    if (!fakeAuth.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (fakeAuth.user?.role !== "instructor") {
        return <Navigate to="/" />;
    }

    return children;
};
