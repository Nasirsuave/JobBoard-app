// src/routes.js
import Dashboard from "./pages/employee/Dashboard.jsx";
import LandingLayout from "./components/landing/LandingLayout.jsx";
import EmployeeLayout from "./layout/EmployeeLayout.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import Profile from "./pages/employee/Profile.jsx";
import Jobs from "./pages/employee/Jobs.jsx";
import Applications from "./pages/employee/Applications.jsx";
import Resume from "./pages/employee/Resume.jsx";


const routes = [
  {
    path: "/",
    element: <LandingLayout />,
  },
  {
    element: <ProtectedRoute><EmployeeLayout /></ProtectedRoute>,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/profile", element: <Profile /> },
      {path: "resume", element: <Resume /> },
      {path: "/jobs", element: <Jobs /> },
      {path: "/application", element: <Applications /> },
    
    ],
  },
];

export default routes;
