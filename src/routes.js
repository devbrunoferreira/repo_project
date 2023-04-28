import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Main from "./pages/Main";
import Repositorio from "./pages/Repositorio";

const MyRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/repositorio/:repositorio" element={<Repositorio/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;