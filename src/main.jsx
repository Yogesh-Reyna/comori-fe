import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Shell from "./pages/shell.jsx";
import { ErrorBoundary } from "./components/error-boundary";
// import "./index.css";
import "./styles/index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallback={<>Something went wrong</>}>
      <Shell />
    </ErrorBoundary>
  </StrictMode>,
);
