import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { InitialLoadUi } from "../components/initial-load-ui";
import { routesData } from "../routes";

function Shell() {
  return (
    <>
      <Suspense fallback={<InitialLoadUi />}>
        <RouterProvider router={createBrowserRouter(routesData)} />
      </Suspense>
    </>
  );
}

export default Shell;
