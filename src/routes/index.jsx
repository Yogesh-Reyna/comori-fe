import { Navigate } from "react-router-dom";
import { ErrorBoundary } from "../components/error-boundary";
import ProtectedRoute from "../components/protected-route";
import * as lazy from "./lazyLoadFiles.js";

export const routesData = [
  {
    path: "/login",
    element: (
      <ErrorBoundary fallback={<>Something went wrong....</>}>
        <lazy.LazyLogin />
      </ErrorBoundary>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ErrorBoundary fallback={<>Something went wrong...</>}>
          <lazy.LazyMainLayout />
        </ErrorBoundary>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <ErrorBoundary fallback={<>Something went wrong...</>}>
            <lazy.LazyDashboard />
          </ErrorBoundary>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <>page Not found</>,
  },
];
