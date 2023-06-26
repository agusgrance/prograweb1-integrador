import React from "react";
import { BrowserRouter } from "react-router-dom";
import Rutas from "./Rutas";
import Navbar from "./partes/Navbar";

import setAxiosInterceptors from "./axiosConfig";

setAxiosInterceptors();

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Rutas />
    </BrowserRouter>
  );
}

export default App;
