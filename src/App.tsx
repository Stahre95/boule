import RequireAuth from "./components/RequireAuth/RequireAuth";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import { Routes, Route } from "react-router-dom";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
}
