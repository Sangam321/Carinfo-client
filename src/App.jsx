import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

// Lazy-loaded components
const DashboardPage = lazy(() => import("@/routes/dashboard/page"));
const Layout = lazy(() => import("@/routes/layout"));
const LoginPage = lazy(() => import("@/routes/login"));
const NavbarPage = lazy(() => import("@/routes/navbar"));
const SignupPage = lazy(() => import("@/routes/signup"));

function App() {
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/navbar",
            element: <NavbarPage />,
        },
        {
            path: "/signup",
            element: <SignupPage />,
        },
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "analytics",
                    element: <h1 className="title">Analytics</h1>,
                },
                {
                    path: "reports",
                    element: <h1 className="title">Reports</h1>,
                },
                {
                    path: "add-car",
                    element: <h1 className="title">Add Car</h1>,
                },
                {
                    path: "update-car",
                    element: <h1 className="title">Update Car</h1>,
                },
                {
                    path: "delete-car",
                    element: <h1 className="title">Delete Car</h1>,
                },
                {
                    path: "users",
                    element: <h1 className="title">Users</h1>,
                },
                {
                    path: "manage-users",
                    element: <h1 className="title">Manage Users</h1>,
                },
                {
                    path: "favourites",
                    element: <h1 className="title">Favourites</h1>,
                },
                {
                    path: "comparisons",
                    element: <h1 className="title">Comparisons</h1>,
                },
                {
                    path: "reviews",
                    element: <h1 className="title">Reviews</h1>,
                },
                {
                    path: "manage-reviews",
                    element: <h1 className="title">Manage Reviews</h1>,
                },
                {
                    path: "settings",
                    element: <h1 className="title">Settings</h1>,
                },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={router} />
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
