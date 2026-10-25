import LoginHero from "../../components/LoginHero/LoginHero";
import AuthCard from "../../components/AuthCard/AuthCard";
import "./LoginPage.css";
export default function LoginPage() {
  return (
    <div className="LoginPage">
      <LoginHero />
      <AuthCard />
    </div>
  );
}
