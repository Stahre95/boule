import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import LoginPage from "./pages/LoginPage/LoginPage";

export default function App() {
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}
