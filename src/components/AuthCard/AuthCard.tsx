import { useState, type FormEvent } from "react";
import "./AuthCard.css";

type Mode = "login" | "signup" | "reset";

export default function AuthCard() {
  const [mode, setMode] = useState<Mode>("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  // Byt läge och rensa ev. meddelande
  function changeMode(next: Mode) {
    setMode(next);
    setMessage(null);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (mode === "login") {
      console.log("Logga in", { email });
    } else if (mode === "signup") {
      console.log("Skapa konto", { firstName, lastName, email });
    } else {
      console.log("Återställ lösenord", { email });
      // Samma svar oavsett om adressen finns, så att vi inte avslöjar vilka som har konto
      setMessage(
        "Om adressen finns hos oss har vi skickat en återställningslänk.",
      );
    }
    // Supabase kopplar vi in här sen
  }

  return (
    <div className="MainCard">
      {mode === "reset" ? (
        <div className="reset-header">
          <h2>Återställ lösenord</h2>
          <p>Skriv din e-post så skickar vi en länk för att välja ett nytt.</p>
        </div>
      ) : (
        <div className="AuthTabs">
          <button
            type="button"
            onClick={() => changeMode("login")}
            className={mode === "login" ? "active" : ""}
          >
            Logga in
          </button>
          <span>|</span>
          <button
            type="button"
            onClick={() => changeMode("signup")}
            className={mode === "signup" ? "active" : ""}
          >
            Skapa konto
          </button>
        </div>
      )}

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

          {mode !== "reset" && (
            <>
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
            </>
          )}

          {mode === "login" && (
            <button
              type="button"
              className="link-btn"
              onClick={() => changeMode("reset")}
            >
              Glömt lösenord?
            </button>
          )}

          {message && (
            <p className="form-message" role="status">
              {message}
            </p>
          )}

          <button type="submit" className="submit-btn">
            {mode === "login" && "Logga in"}
            {mode === "signup" && "Skapa konto"}
            {mode === "reset" && "Skicka länk"}
          </button>

          {mode === "reset" && (
            <button
              type="button"
              className="link-btn link-btn--center"
              onClick={() => changeMode("login")}
            >
              Tillbaka till inloggning
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
