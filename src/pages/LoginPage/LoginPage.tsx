import Hero from "../../components/LoginHero/Hero";
import AuthCard from "../../components/AuthCard/AuthCard";
import "./LoginPage.css";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const { session, loading } = useAuth();

  if (loading) return null;
  if (session) return <Navigate to="/" replace />;
  return (
    <div className="LoginPage page-bg">
      <Hero />
      <AuthCard />
    </div>
  );
}
