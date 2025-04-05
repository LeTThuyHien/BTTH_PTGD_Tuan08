import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import DashBoard from "../Pages/DashBoard/DashBoard";
import Projects from "../Pages/Projects/Projects";
import Teams from "../Pages/Teams/Teams";
import Analytics from "../Pages/Analytics/Analytics";
import Messages from "../Pages/Messages/Messages";
import Integration from "../Pages/Integrations/Integration";


const router = createBrowserRouter([

    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <DashBoard />
            }, 
            {
                path: "/projects",
                element: <Projects />
            },
            {
                path: "/teams",
                element:<Teams />
            },
            {
                path: "/analytics",
                element:<Analytics />
            },
            {
                path:"/messages",
                element: <Messages />
            },
            {
                path: "/integration",
                element: <Integration/>
            }
        ]
    }

])

export default router;