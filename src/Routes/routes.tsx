import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Homepage from "@/views/Home/Homepage";
import About from "@/views/About/About";
import Events from "@/views/Events/Events";
import Resources from "@/views/Resources/Resources";
import Contact from "@/views/Contact/Contact";
import Donate from "@/views/Donate/Donate";
import AllEvents from "@/views/Events/AllEvents";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/events/all",
        element: <AllEvents />,
      },

      {
        path: "/resources",
        element: <Resources />,
      },

      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/donate",
        element: <Donate />,
      },
    ],
  },
]);

export default router;
