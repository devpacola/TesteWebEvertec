import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Header from './components/Header/Header';
import Listagem from './pages/Listagem/Listagem';
import Cadastro from './pages/Cadastro/Cadastro';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/"           element={<Listagem />} />
          <Route path="/cadastro"   element={<Cadastro />} />
          <Route path="/editar/:id" element={<Cadastro />} />
          <Route path="*"           element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}
