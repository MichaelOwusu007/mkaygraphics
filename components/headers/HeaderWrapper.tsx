// "use client";

// import { useEffect, useState } from "react";
// import PublicHeader from "./PublicHeader";
// import AuthHeader from "./AuthHeader";

// export default function HeaderWrapper() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuth = () => {
//       const authStatus = localStorage.getItem("isAuthenticated") === "true";
//       setIsAuthenticated(authStatus);
//     };

//     checkAuth();

//     // Listen to cross-tab and same-tab login/logout
//     const handleStorage = (e: StorageEvent) => {
//       if (e.key === "isAuthenticated") checkAuth();
//     };
//     const handleAuthChange = () => checkAuth();

//     window.addEventListener("storage", handleStorage);
//     window.addEventListener("authChange", handleAuthChange);

//     return () => {
//       window.removeEventListener("storage", handleStorage);
//       window.removeEventListener("authChange", handleAuthChange);
//     };
//   }, []);

//   return isAuthenticated ? <AuthHeader /> : <PublicHeader />;
// }
