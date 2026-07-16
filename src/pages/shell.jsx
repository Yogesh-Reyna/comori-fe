import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { InitialLoadUi } from "../components/initial-load-ui";
import { routesData } from "../routes";
import Loader from "../components/loader";

function Shell() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={createBrowserRouter(routesData)} />
      </Suspense>
    </>
  );
}

export default Shell;
