import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadProfile() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) {
      setUserEmail(null);
      setRole(null);
      return;
    }
    setUserEmail(user.email ?? null);

    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (error) setError(error.message);
    setRole(data?.role ?? null);
  }

  useEffect(() => {
    loadProfile();
  }, []);

  async function login() {
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else await loadProfile();
  }

  async function logout() {
    await supabase.auth.signOut();
    setUserEmail(null);
    setRole(null);
  }

  return (
    <div style={{ maxWidth: 320, margin: "4rem auto", display: "grid", gap: 8 }}>
      <h1>Boule</h1>
      {userEmail ? (
        <>
          <p>Inloggad som {userEmail}</p>
          <p>Din roll: <strong>{role ?? "ingen profil hittades"}</strong></p>
          <button onClick={logout}>Logga ut</button>
        </>
      ) : (
        <>
          <input placeholder="E-post" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Lösenord" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={login}>Logga in</button>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}