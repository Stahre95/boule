import Card from "../../components/Card/Card";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./ProfilePage.css";
import { useAuth } from "../../hooks/useAuth";
import { usePlayer } from "../../hooks/usePlayer";
import Hero from "../../components/LoginHero/Hero";

export default function ProfilePage() {
  const { session, signOut } = useAuth();
  const { player, setPlayer, loading, error } = usePlayer();

  const greeting = player ? `Hej, ${player.first_name}!` : "Hej!";

  return (
    <div className="page-bg">
      <Hero />

      <div className="dashboard">
        <header className="dashboard-header">
          <h1>{greeting}</h1>
          <button className="logout-button" onClick={signOut}>
            Logga ut
          </button>
        </header>

        {error && (
          <p className="form-message form-message--error" role="alert">
            Kunde inte hämta din profil.
          </p>
        )}

        <div className="dashboard-grid">
          <ProfileCard
            player={player}
            loading={loading}
            email={session?.user.email}
            onSaved={setPlayer}
          />
          <Card title="Senaste turneringar">
            <p>Här kan du se dina senaste turneringar och resultat.</p>
          </Card>
          <Card title="Maratontabell">
            <p>Här kan du se din placering i maratontabellen.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
