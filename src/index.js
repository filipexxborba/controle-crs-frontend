import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStorage } from "./Context/GlobalContext";
import Home from "./Pages/Home/Home";
import CRSInfo from "./Pages/CRSInfo/CRSInfo";
import CRSAdd from "./Pages/CRSAdd/CRSAdd";
import CRSEdit from "./Pages/CRSEdit/CRSEdit";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStorage>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {/* Rota da home */}
          <Route index element={<Home />} />
          {/* Rota das informações de uma CRS específica */}
          <Route path="/crs/:id" element={<CRSInfo />} />
          {/* Rota para adicionar uma nova CRS */}
          <Route path="/adicionar" element={<CRSAdd />} />
          {/* Rota para editar uma CRS */}
          <Route path="/editar/:id" element={<CRSEdit />} />
        </Routes>
      </BrowserRouter>
    </GlobalStorage>
  </React.StrictMode>
);
