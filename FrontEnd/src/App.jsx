import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Header from './components/Header/Header';
import Listagem from './pages/Listagem/Listagem';
import Cadastro from './pages/Cadastro/Cadastro';

const API_HEALTH_URL = 'http://localhost:5000/health';

export default function App() {
  const [apiStatus, setApiStatus] = useState('verificando');

  useEffect(() => {
    fetch(API_HEALTH_URL)
      .then((res) => setApiStatus(res.ok ? 'online' : 'offline'))
      .catch(() => setApiStatus('offline'));
  }, []);

  if (apiStatus === 'verificando') {
    return (
      <div style={styles.overlay}>
        <div style={styles.box}>
          <div className="spinner-border text-primary mb-3" role="status" />
          <h5>Verificando conexão com a API...</h5>
        </div>
      </div>
    );
  }

  if (apiStatus === 'offline') {
    return (
      <div style={styles.overlay}>
        <div style={styles.box}>
          <div style={{ fontSize: 48 }}>⚠️</div>
          <h4 className="mt-3 text-danger">API indisponível</h4>
          <p className="text-muted mb-4">
            Não foi possível conectar ao servidor. Verifique se a API está em execução e tente novamente.
          </p>
          <button
            className="btn btn-primary"
            onClick={() =>
              fetch(API_HEALTH_URL)
                .then((res) => setApiStatus(res.ok ? 'online' : 'offline'))
                .catch(() => setApiStatus('offline'))
            }
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

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

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    zIndex: 9999,
  },
  box: {
    textAlign: 'center',
    padding: '2.5rem',
    borderRadius: '1rem',
    backgroundColor: '#fff',
    boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
    maxWidth: 400,
    width: '90%',
  },
};
