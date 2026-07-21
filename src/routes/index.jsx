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
        index: true,
        element: <Navigate to="today" replace />,
      },
      {
        path: "dashboard",
        element: (
          <ErrorBoundary fallback={<>Something went wrong...</>}>
            <lazy.LazyDashboard />
          </ErrorBoundary>
        ),
      },
      {
        path: "today",
        handle: {
          title: "Today",
          showFooter: true,
        },
        element: <>Today</>,
      },
      {
        path: "my-data",
        handle: {
          title: "My Data",
          showFooter: true,
        },
        element: <>My Data</>,
      },
      {
        path: "my-meals",
        handle: {
          title: "My Meals",
          showFooter: true,
        },
        element: <>My Meals</>,
      },
      {
        path: "knowledge-hub",
        handle: {
          title: "Knowledge Hub",
          showFooter: false,
        },
        element: <>Knowledge Hub</>,
      },
      {
        path: "my-account",
        children: [
          {
            path: "profile-details",
            handle: {
              title: "Profile Details",
              showFooter: true,
            },
            element: <>Profile Details</>,
          },
          {
            path: "your-plan",
            handle: {
              title: "Your Plan",
              showFooter: true,
            },
            element: <>Your Plan</>,
          },
          {
            path: "payment-method",

            handle: {
              title: "Payment Method",
              showFooter: true,
            },

            element: <>Payment Method</>,
          },
          {
            path: "payment-history",

            handle: {
              title: "Payment History",
              showFooter: true,
            },

            element: <>Payment History</>,
          },
        ],
      },
      {
        path: "settings",

        children: [
          {
            path: "date-time",

            handle: {
              title: "Date & Time",
              showFooter: true,
            },

            element: <>Date & Time</>,
          },
          {
            path: "units",

            handle: {
              title: "Units",
              showFooter: true,
            },

            element: <>Units</>,
          },
          {
            path: "notifications",

            handle: {
              title: "Notifications",
              showFooter: true,
            },

            element: <>Notifications</>,
          },

          {
            path: "connected-devices",

            handle: {
              title: "Connected Devices",
              showFooter: true,
            },

            element: <>Connected Devices</>,
          },
        ],
      },
    ],
  },
  {
    path: "/style-guide",
    element: (
      <ErrorBoundary fallback={<>Something went wrong....</>}>
        <lazy.LazyStyleGuide />
      </ErrorBoundary>
    ),
  },
  {
    path: "*",
    element: <>page Not found</>,
  },
];
