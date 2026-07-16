import { lazy } from "react";

export const LazyLogin = lazy(() => import("../pages/login"));
export const LazyDashboard = lazy(() => import("../pages/dashboard"));
export const LazyMainLayout = lazy(() => import("../components/main-layout"));
export const LazyStyleGuide = lazy(() => import("../pages/style-guide"));
