import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrash,
  faStar,
  faMapMarkerAlt,
  faPlus,
  faSearch,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { MOCK_DATA } from '../../services/pontosTuristicosService';
import './Listagem.css';

const CATEGORIAS = ['Todas', 'Praia', 'Parque', 'Museu', 'Monumento', 'Gastronomia', 'Outro'];

export default function Listagem() {
  const navigate = useNavigate();
  const [pontos, setPontos] = useState(MOCK_DATA);
  const [loading] = useState(false);
  const [busca, setBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [deletandoId, setDeletandoId] = useState(null);

  function handleExcluir(id, nome) {
    if (!window.confirm(`Deseja excluir "${nome}"?`)) return;
    setDeletandoId(id);
    setPontos((prev) => prev.filter((p) => p.id !== id));
    toast.success(`"${nome}" excluído com sucesso!`);
    setDeletandoId(null);
  }

  const pontosFiltrados = pontos.filter((p) => {
    const matchBusca =
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.cidade.toLowerCase().includes(busca.toLowerCase()) ||
      p.estado.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoriaFiltro === 'Todas' || p.categoria === categoriaFiltro;
    return matchBusca && matchCategoria;
  });

  return (
    <div className="listagem-page">
      <div className="container py-4">

        {/* Título e botão */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <h1 className="page-title">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-success" />
              Pontos Turísticos
            </h1>
            <p className="text-muted mb-0">{pontos.length} local(is) cadastrado(s)</p>
          </div>
          <button className="btn btn-success btn-novo" onClick={() => navigate('/cadastro')}>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Novo Ponto
          </button>
        </div>

        {/* Filtros */}
        <div className="filtros-bar mb-4">
          <div className="input-group search-input">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nome, cidade ou estado..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className="categoria-filter">
            <FontAwesomeIcon icon={faFilter} className="me-2 text-muted" />
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm filter-chip ${categoriaFiltro === cat ? 'active' : ''}`}
                onClick={() => setCategoriaFiltro(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status" />
            <p className="mt-3 text-muted">Carregando pontos turísticos...</p>
          </div>
        ) : pontosFiltrados.length === 0 ? (
          <div className="empty-state text-center py-5">
            <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" className="text-muted mb-3" />
            <h5 className="text-muted">Nenhum ponto encontrado</h5>
            <p className="text-muted">Tente ajustar os filtros ou cadastre um novo ponto.</p>
          </div>
        ) : (
          <div className="row g-4">
            <AnimatePresence>
              {pontosFiltrados.map((ponto) => (
                <motion.div
                  key={ponto.id}
                  className="col-12 col-md-6 col-xl-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <div className="ponto-card card h-100">
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex align-items-start justify-content-between mb-1">
                        <h5 className="card-title mb-0">{ponto.nome}</h5>
                        <span className={`categoria-badge badge-${ponto.categoria.toLowerCase()}`}>
                          {ponto.categoria}
                        </span>
                      </div>

                      <div className="localizacao mb-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1 text-danger" />
                        <small>
                          {ponto.cidade}, {ponto.estado}
                        </small>
                      </div>

                      <p className="card-text text-muted flex-grow-1">{ponto.descricao}</p>

                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div className="avaliacao">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FontAwesomeIcon
                              key={i}
                              icon={faStar}
                              className={i < ponto.avaliacao ? 'star-filled' : 'star-empty'}
                            />
                          ))}
                        </div>

                        <div className="card-actions">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => navigate(`/editar/${ponto.id}`)}
                            title="Editar"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleExcluir(ponto.id, ponto.nome)}
                            disabled={deletandoId === ponto.id}
                            title="Excluir"
                          >
                            {deletandoId === ponto.id ? (
                              <span className="spinner-border spinner-border-sm" />
                            ) : (
                              <FontAwesomeIcon icon={faTrash} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
