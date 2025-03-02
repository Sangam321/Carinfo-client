import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchaseCarProtectedRoute from "./components/PurchaseCarProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import CreateLecture from "./pages/admin/CarDash/CreateLecture";
import EditLecture from "./pages/admin/CarDash/EditLecture";
import Dashboard from "./pages/admin/Dashboard";
import Sidebar from "./pages/admin/Sidebar";
import AddCar from "./pages/admin/car/AddCar";
import CarTable from "./pages/admin/car/CarTable";
import EditCar from "./pages/admin/car/EditCar";
import CarDetail from "./pages/user/CarDetail";
import CarProgress from "./pages/user/CarProgress";
import Cars from "./pages/user/Cars";
import HeroSection from "./pages/user/HeroSection";
import MyFavourites from "./pages/user/MyFavourites";
import Profile from "./pages/user/Profile";
import SearchPage from "./pages/user/SearchPage";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Cars />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "my-favourites",
        element: (
          <ProtectedRoute>
            <MyFavourites />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "car/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "car-detail/:carId",
        element: (
          <ProtectedRoute>
            <CarDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "car-progress/:carId",
        element: (
          <ProtectedRoute>
            <PurchaseCarProtectedRoute>
              <CarProgress />
            </PurchaseCarProtectedRoute>
          </ProtectedRoute>
        ),
      },

      // admin routes start from here
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "car",
            element: <CarTable />,
          },
          {
            path: "car/create",
            element: <AddCar />,
          },
          {
            path: "car/:carId",
            element: <EditCar />,
          },
          {
            path: "car/:carId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "car/:carId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
