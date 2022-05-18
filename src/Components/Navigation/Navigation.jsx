import React from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { Link } from "react-router-dom";
import './Navigation.css'

const Navigation = () => {
  const { showResolvidas, setShowResolvidas } = React.useContext(GlobalContext);

  const handleClick = (event) => {
    event.preventDefault();
    setShowResolvidas(!showResolvidas);
  };
  return (
    <header className="navigation">
      <h1>Controle de CRS - {!showResolvidas ? 'Pendentes' : 'Resolvidas'}</h1>
      <nav>
        <button className="navigation_button" onClick={handleClick}>
          {!showResolvidas ? "Mostrar resolvidas" : "Mostrar pendentes"}
        </button>
        <Link to='/adicionar'>
          <button className="navigation_button">Adicionar CRS</button>
        </Link>
      </nav>
    </header>
  );
};

export default Navigation;
