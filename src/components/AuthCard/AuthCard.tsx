import { useState, type FormEvent } from "react";
import "./AuthCard.css";

type Mode = "login" | "signup";

export default function AuthCard() {
  const [mode, setMode] = useState<Mode>("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // hindrar att sidan laddas om

    if (mode === "login") {
      console.log("Logga in", { email });
    } else {
      console.log("Skapa konto", { firstName, lastName, email });
    }
    // Supabase kopplar vi in här sen
  }

  return (
    <div className="MainCard">
      {/* Egen wrapper så att du kan använda gap i CSS i stället för {" "} */}
      <div className="AuthTabs">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={mode === "login" ? "active" : ""}
        >
          Logga in
        </button>
        <span>|</span>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={mode === "signup" ? "active" : ""}
        >
          Skapa konto
        </button>
      </div>

      <div className="CardBody">
        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <label htmlFor="firstName">Förnamn</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                required
                autoComplete="given-name"
                onChange={(e) => setFirstName(e.target.value)}
              />

              <label htmlFor="lastName">Efternamn</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                required
                autoComplete="family-name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}

          <label htmlFor="email">E-post</label>
          <input
            id="email"
            type="email"
            value={email}
            required
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Lösenord</label>
          <input
            id="password"
            type="password"
            value={password}
            required
            minLength={mode === "signup" ? 6 : undefined}
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="submit-btn">
            {mode === "login" ? "Logga in" : "Skapa konto"}
          </button>
        </form>
      </div>
    </div>
  );
}
