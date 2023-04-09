import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NewPoll from "../pages/NewPoll";
import React from "react";
import ErrorPage from "../components/ErrorPage";
import Poll from "../pages/Poll";
import Register from "../pages/Register";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage error='-1' />,
    },
    {
        path: "/new/poll",
        element: <NewPoll />,
        errorElement: <ErrorPage error='-1' />,
    },
    {
        path: "/poll/:poll",
        element: <Poll />,
        errorElement: <ErrorPage error='-1' />,
    },
    {
        path: "/register",
        element: <Register />,
        errorElement: <ErrorPage error='-1' />,
    },
]);

export default routes;