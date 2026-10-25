import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { translateError } from "../../lib/errors";
import "../../components/AuthCard/AuthCard.css"; // återanvänder MainCard och reset-header
import Hero from "../../components/LoginHero/Hero";

export default function ResetPasswordCard() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // När lösenordet är bytt: visa bekräftelsen en stund och gå sedan till startsidan
  useEffect(() => {
    if (!done) return;
    const timer = setTimeout(() => navigate("/", { replace: true }), 1500);
    return () => clearTimeout(timer);
  }, [done, navigate]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Lösenordet måste vara minst 6 tecken.");
      return;
    }
    if (password !== confirm) {
      setError("Lösenorden matchar inte.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setDone(true);
    } catch (err) {
      setError(translateError(err instanceof Error ? err.message : ""));
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="MainCard">
        <div className="reset-header">
          <h2>Lösenordet är uppdaterat</h2>
          <p>Du skickas vidare till startsidan...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Hero />
      <div className="MainCard">
        <div className="reset-header">
          <h2>Välj nytt lösenord</h2>
          <p>Skriv ditt nya lösenord två gånger.</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="newPassword">Nytt lösenord</label>
          <input
            id="newPassword"
            type="password"
            value={password}
            required
            minLength={6}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">Upprepa lösenord</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirm}
            required
            minLength={6}
            autoComplete="new-password"
            onChange={(e) => setConfirm(e.target.value)}
          />

          {error && (
            <p className="form-message form-message--error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Sparar..." : "Spara lösenord"}
          </button>
        </form>
      </div>
    </div>
  );
}
