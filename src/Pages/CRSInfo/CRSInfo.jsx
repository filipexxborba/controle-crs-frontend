import React from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import "./CRSInfo.css";

const CRSInfo = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [showCadastrarObs, setCadastrarObs] = React.useState(false);

  const { apiUrl, dateFormat } = React.useContext(GlobalContext);
  const [inputValue, setInputValue] = React.useState("");

  const callCrsInfoApi = async (id) => {
    const response = await fetch(`${apiUrl}/v1/getcrs/${id}`);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    setData(jsonResponse);
    setIsLoading(false);
  };

  const handleCadClick = async () => {
    if (inputValue !== "") {
      const response = await fetch(
        `${apiUrl}/v1/updateobs/${id}&${inputValue}`,
        { method: "PUT" }
      );
      console.log(response);
      document.location.reload();
    } else {
      setCadastrarObs(false);
    }
  };

  const handleStatusClick = async () => {
    const response = await fetch(`${apiUrl}/v1/updatecrs/${id}`, {
      method: "PUT",
    });
    console.log(response);
    window.location.replace("/");
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`${apiUrl}/v1/deletecrs/${id}`, {
      method: "DELETE",
    });
    console.log(response);
    window.location.replace("/");
  };

  React.useEffect(() => {
    callCrsInfoApi(id);
  }, [id, apiUrl]);

  return (
    <>
      <Link to="/">
        <p className="voltar-button">← Voltar</p>
      </Link>
      {!isLoading ? (
        <>
          <div className="container crsinfo">
            <h2>
              {data.codigocrs} - {data.titulo}
            </h2>
            <h3>
              {data.nucleo} - {dateFormat(data.date)}
            </h3>
            <p>{data.descricao}</p>
            <div className="crsinfo__observacoes">
              <h4>Observações:</h4>
              {data.observacoes.length > 0 ? (
                data.observacoes.map((observacao) => (
                  <p key={observacao}>{observacao.toString()}</p>
                ))
              ) : (
                <p>Nenhuma observação cadastrada</p>
              )}
              {!showCadastrarObs ? (
                <button
                  className="cadastrar"
                  onClick={(event) => setCadastrarObs(!showCadastrarObs)}
                >
                  Adicionar nova observação
                </button>
              ) : null}
              {showCadastrarObs ? (
                <div className="input__button">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                  />
                  <button onClick={handleCadClick}>
                    {inputValue.length > 0 ? "Cadastrar" : "Cancelar"}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="container acoes_crs">
            {!data.status ? (
              <button onClick={handleStatusClick}>Marcar como resolvido</button>
            ) : null}
            <Link to={`/editar/${id}`}>
              <button>Editar chamado</button>
            </Link>
            <button onClick={handleDeleteClick}>Excluir chamado</button>
          </div>
        </>
      ) : <div className="loading" />}
    </>
  );
};

export default CRSInfo;
