import logo from "../../assets/images/firstcampboule.png";
import "./Hero.css";

export default function Hero() {
  return (
    <div className="Hero-Container">
      <img src={logo} alt="First Camp Boule" className="Hero-Logo" />
      <h1 className="Hero-Title">Boule Turnering</h1>
    </div>
  );
}
