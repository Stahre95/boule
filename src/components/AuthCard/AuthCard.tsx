import { useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import { translateError } from "../../lib/errors";
import "./AuthCard.css";

type Mode = "login" | "signup" | "reset";

const buttonText: Record<Mode, string> = {
  login: "Logga in",
  signup: "Skapa konto",
  reset: "Skicka länk",
};

export default function AuthCard() {
  const [mode, setMode] = useState<Mode>("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Byt läge och rensa gamla texter
  function changeMode(next: Mode) {
    setMode(next);
    setMessage(null);
    setError(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const cleanEmail = email.trim();

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
        if (error) throw error;
        // Lyckad inloggning: routing tar över sen
      } else if (mode === "signup") {
        const first = firstName.trim();
        const last = lastName.trim();
        if (!first || !last) {
          setError("Fyll i både förnamn och efternamn.");
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: { data: { first_name: first, last_name: last } },
        });
        if (error) throw error;

        setPassword("");
        // Om bekräftelse krävs finns ingen session än
        if (!data.session) {
          setMessage(
            "Kolla din e-post och bekräfta kontot för att kunna logga in.",
          );
        }
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(
          cleanEmail,
          {
            redirectTo: `${window.location.origin}/reset-password`,
          },
        );
        if (error) throw error;

        // Samma svar oavsett om adressen finns, så att vi inte avslöjar vilka som har konto
        setMessage(
          "Om adressen finns hos oss har vi skickat en återställningslänk.",
        );
      }
    } catch (err) {
      setError(translateError(err instanceof Error ? err.message : ""));
    } finally {
      setLoading(false);
    }
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
        <form onSubmit={handleSubmit} className="form">
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

          {error && (
            <p className="form-message form-message--error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Vänta..." : buttonText[mode]}
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
