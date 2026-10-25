import { useState, type FormEvent } from "react";
import Card from "../Card/Card";
import { supabase } from "../../lib/supabase";
import type { Player } from "../../hooks/usePlayer";
import "./ProfileCard.css";

type ProfileCardProps = {
  player: Player | null;
  loading: boolean;
  email?: string;
  onSaved: (player: Player) => void;
};

export default function ProfileCard({
  player,
  loading,
  email,
  onSaved,
}: ProfileCardProps) {
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function startEditing() {
    if (!player) return;
    setFirstName(player.first_name);
    setLastName(player.last_name);
    setError(null);
    setEditing(true);
  }

  function cancelEditing() {
    setError(null);
    setEditing(false);
  }

  async function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!player) return;

    const first = firstName.trim();
    const last = lastName.trim();
    if (!first || !last) {
      setError("Fyll i både förnamn och efternamn.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("players")
        .update({ first_name: first, last_name: last })
        .eq("id", player.id)
        .select("id, first_name, last_name, name")
        .single();

      if (error) throw error;

      onSaved(data);
      setEditing(false);
    } catch {
      setError("Kunde inte spara. Försök igen.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Card title="Mina uppgifter">
        <p>Laddar...</p>
      </Card>
    );
  }

  if (!player) {
    return (
      <Card title="Mina uppgifter">
        <p>Din spelarprofil hittades inte. Kontakta en admin.</p>
      </Card>
    );
  }

  return (
    <Card title="Mina uppgifter">
      {editing ? (
        <form onSubmit={handleSave} className="form">
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

          {error && (
            <p className="form-message form-message--error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="submit-btn" disabled={saving}>
            {saving ? "Sparar..." : "Spara"}
          </button>
          <button
            type="button"
            className="link-btn link-btn--center"
            onClick={cancelEditing}
          >
            Avbryt
          </button>
        </form>
      ) : (
        <>
          <dl className="info-list">
            <div className="info-item">
              <dt>Namn</dt>
              <dd>{player.name}</dd>
            </div>
            <div className="info-item">
              <dt>E-post</dt>
              <dd>{email}</dd>
            </div>
          </dl>
          <button
            type="button"
            className="link-btn edit-btn"
            onClick={startEditing}
          >
            Redigera
          </button>
        </>
      )}
    </Card>
  );
}
