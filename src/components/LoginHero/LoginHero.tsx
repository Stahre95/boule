import logo from "../../assets/images/firstcampboule.png";
import "./LoginHero.css";

export default function LoginHero() {
  return (
    <div className="Hero-Container">
      <img src={logo} alt="First Camp Boule" className="Hero-Logo" />
      <h1 className="Hero-Title">Boule Turnering</h1>
    </div>
  );
}
