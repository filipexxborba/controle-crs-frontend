import React from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import "./CRSAdd.css";

const CRSAdd = () => {
  const { apiUrl } = React.useContext(GlobalContext);
  const [select, setSelect] = React.useState("Compras");
  const [disabled, setDisabled] = React.useState(true);
  const [form, setForm] = React.useState({
    motivo: "",
    descricao: "",
    responsavel: "",
    numeroCrs: "",
  });

  function handleChange({ target }) {
    if (
      form.motivo !== "" &&
      form.descricao !== "" &&
      form.responsavel !== "" &&
      form.numeroCrs !== ""
    ) {
      setDisabled(false);
    }
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  }

  const callCadastrarApi = async () => {
    const response = await fetch(`${apiUrl}/v1/createcrs/${form.motivo}&${form.descricao}&${form.responsavel}&${form.numeroCrs}&${select}`,{method: "POST"});
    console.log(response);
    window.location.replace("/");
  };

  function handleClick(event) {
    event.preventDefault();
    if (
      form.motivo !== "" &&
      form.descricao !== "" &&
      form.responsavel !== "" &&
      form.numeroCrs !== ""
    ) {
      callCadastrarApi();
    }
  }
  return (
    <>
      <Link to="/">
        <p className="voltar-button">← Voltar</p>
      </Link>
      <div className="container crsadd">
        <form>
          <label htmlFor="nucleo:">Núcleo:</label>
          <select
            id="nucleo"
            value={select}
            onChange={({ target }) => setSelect(target.value)}
          >
            <option value="Compras">Compras</option>
            <option value="Contábil">Contábil</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Fiscal">Fiscal</option>
            <option value="Técnico">Técnico</option>
            <option value="Vendas e Logística">Vendas e Logística</option>
            <option value="Pós Implantação">Pós Implantação</option>
          </select>
          <label htmlFor="motivo" required>
            Motivo:
          </label>
          <input
            type="text"
            id="motivo"
            value={form.motivo}
            onChange={handleChange}
          ></input>

          <label htmlFor="descricao" required>
            Descrição:
          </label>
          <input
            type="text"
            id="descricao"
            value={form.descricao}
            onChange={handleChange}
          ></input>

          <label htmlFor="responsavel" required>
            Responsável:
          </label>
          <input
            type="text"
            id="responsavel"
            value={form.responsavel}
            onChange={handleChange}
          ></input>

          <label htmlFor="numeroCrs" required>
            Número da CRS:
          </label>
          <input
            type="number"
            id="numeroCrs"
            value={form.numeroCrs}
            onChange={handleChange}
          ></input>

          <button
            className="buttonSave"
            disabled={disabled}
            onClick={handleClick}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
};

export default CRSAdd;
