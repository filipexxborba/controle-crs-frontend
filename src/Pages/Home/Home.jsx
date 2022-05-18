import React from "react";
import CRSList from "../../Components/CRSList/CRSList";
import Navigation from "../../Components/Navigation/Navigation";
import { GlobalContext } from "../../Context/GlobalContext";

const Home = () => {
  const { apiUrl, showResolvidas, dadosPendentes, dadosResolvidas } =
    React.useContext(GlobalContext);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    setData(dadosPendentes);
  }, [dadosPendentes]);

  return (
    <>
      <Navigation />
      <div className="container">
        {showResolvidas && data && <CRSList data={dadosResolvidas} />}
        {!showResolvidas && data && <CRSList data={dadosPendentes} />}
      </div>
    </>
  );
};

export default Home;
