import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import ManageProducts from "./pages/ManageProducts";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";

const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/product-list"
          element={
            <ProtectedRoute
              element={
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              }
            />
          }
        />

        <Route
          path="/manage-products"
          element={
            <ProtectedRoute
              element={
                <DashboardLayout>
                  <ManageProducts />
                </DashboardLayout>
              }
            />
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/product-list" /> : <Login />
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
