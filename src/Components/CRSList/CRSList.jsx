import React from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import moment from "moment";
import "./CRSList.css";

const CRSList = ({ data }) => {
  const { dateFormat } = React.useContext(GlobalContext);
  const [isLoading, setIsLoading] = React.useState(true);

  const formatarPeriodo = () => {
    data.forEach((crs) => {
      if (crs.status === false) {
        const crsDate = crs.date;
        let today = moment(new Date());
        const duration = moment.duration(today.diff(crsDate));
        let days = Math.round(duration.asDays());
        if (days >= 0 && days <= 3) {
          crs.dif = "Ok";
        }
        if (days > 3 && days <= 5) {
          crs.dif = "Atencao";
        }
        if (days > 5) {
          crs.dif = "Urgencia";
        }
      }
    });
    setIsLoading(false);
  };

  // Condicionais para variar a cor
  React.useEffect(() => {
    formatarPeriodo();
  }, [data]);

  return (
    <>
      <div className="lista">
        <ul className="container">
          {!isLoading ? (
            <>
              {data.map((crs) => (
                <li key={crs._id}>
                  <Link to={`/crs/${crs._id}`}>
                    <div className="item-list">
                      <div className={crs.dif}></div>
                      <div>
                        <h3>{`${crs.codigocrs} - ${crs.titulo}`}</h3>
                        <p>
                          {crs.nucleo} - {dateFormat(crs.date)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </>
          ) : (
            <div className="loading" />
          )}
        </ul>
      </div>
    </>
  );
};

export default CRSList;
