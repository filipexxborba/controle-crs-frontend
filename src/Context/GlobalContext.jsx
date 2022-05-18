import React from "react";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const apiUrl = `http://172.17.0.100:9995`;
  const [showResolvidas, setShowResolvidas] = React.useState(false);

  const [dadosResolvidas, setDadosResolvidas] = React.useState(null);
  const [isLoadingDadosResolvidas, setIsLoadingDadosResolvidas] =
    React.useState(true);

  const [dadosPendentes, setDadosPendentes] = React.useState(null);
  const [isLoadingDadosPendentes, setIsLoadingDadosPendentes] =
    React.useState(true);

  const callResolvidasApi = async () => {
    const response = await fetch(`${apiUrl}/v1/crsresolvida`);
    const jsonResponse = await response.json();
    setDadosResolvidas(jsonResponse);
    setIsLoadingDadosResolvidas(false);
    console.log(jsonResponse);
  };

  const callPendentesApi = async () => {
    const response = await fetch(`${apiUrl}/v1/crsaberta`);
    const jsonResponse = await response.json();
    setDadosPendentes(jsonResponse);
    setIsLoadingDadosPendentes(false);
    console.log(jsonResponse);
  };

  const dateFormat = (date) => {
    let temp = new Date(date);
    return temp.toLocaleDateString("pt-br");
  };

  React.useEffect(() => {
    callResolvidasApi();
    callPendentesApi();
  }, [apiUrl]);

  return (
    <GlobalContext.Provider
      value={{
        showResolvidas,
        setShowResolvidas,
        apiUrl,
        dadosResolvidas,
        dadosPendentes,
        dateFormat,
        isLoadingDadosResolvidas,
        isLoadingDadosPendentes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
