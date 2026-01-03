// import React from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { AuthProvider } from './context/AuthProvider.jsx'
// import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
// import LandingLayout from './components/landing/LandingLayout.jsx'
// import AuthLauncher from './components/auth/AuthLauncher.jsx'
// import { useAuth } from '@/context/AuthProvider';
// import EmployeeLayout from './layout/EmployeeLayout.jsx';
// import Dashboard from './pages/employee/Dashboard.jsx'


// function App() {
//     // const { isAuthenticated } = useAuth();
  
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <AuthLauncher />
//         <Routes>
//           <Route path="/" element={<LandingLayout />} />

//           <Route
//             element={<ProtectedRoute><EmployeeLayout /></ProtectedRoute>}
//           >
//             <Route path="/dashboard" element={<Dashboard />} />
//             {/* later */}
//             {/* <Route path="/dashboard/profile" element={<Profile />} /> */}
//           </Route>
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   )
// }

// export default App




import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import AuthLauncher from "./components/auth/AuthLauncher.jsx";
import routes from "./routes.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthLauncher />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} {...route}>
              {route.children &&
                route.children.map((child, i) => (
                  <Route key={i} {...child} />
                ))}
            </Route>
          ))}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
