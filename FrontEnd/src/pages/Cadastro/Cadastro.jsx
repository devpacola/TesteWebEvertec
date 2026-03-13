import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
  faArrowLeft,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import axios from 'axios';
import pontosTuristicosService from '../../services/pontosTuristicosService';
import './Cadastro.css';

const CATEGORIAS = ['Praia', 'Parque', 'Museu', 'Monumento', 'Gastronomia', 'Outro'];

const ESTADOS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC',
  'SP','SE','TO',
];

const FORM_INICIAL = {
  nome: '',
  descricao: '',
  endereco: '',
  cidade: '',
  estado: '',
  categoria: '',
};

export default function Cadastro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdicao = Boolean(id);

  const [form, setForm] = useState(FORM_INICIAL);
  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    if (!isEdicao) return;
    pontosTuristicosService.buscarPorId(id)
      .then((res) => setForm({
        nome: res.data.nome,
        descricao: res.data.descricao,
        endereco: res.data.endereco,
        cidade: res.data.cidade,
        estado: res.data.estado,
        categoria: res.data.categoria,
      }))
      .catch(() => toast.error('Erro ao carregar ponto turístico.'));
  }, [id, isEdicao]);

  useEffect(() => {
    if (!form.estado) return;
    axios
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form.estado}/municipios?orderBy=nome`)
      .then((res) => setMunicipios(res.data.map((m) => m.nome)))
      .catch(() => setMunicipios([]));
  }, [form.estado]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value, ...(name === 'estado' ? { cidade: '' } : {}) }));
    if (erros[name]) {
      setErros((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function validar() {
    const novosErros = {};
    if (!form.nome.trim())       novosErros.nome      = 'Nome é obrigatório.';
    if (!form.descricao.trim())  novosErros.descricao = 'Descrição é obrigatória.';
    if (!form.endereco.trim())   novosErros.endereco  = 'Endereço é obrigatório.';
    if (!form.cidade.trim())     novosErros.cidade    = 'Cidade é obrigatória.';
    if (!form.estado)            novosErros.estado    = 'Estado é obrigatório.';
    if (!form.categoria)         novosErros.categoria = 'Categoria é obrigatória.';
    return novosErros;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      toast.warn('Preencha todos os campos obrigatórios.');
      return;
    }

    setSalvando(true);
    try {
      if (isEdicao) {
        await pontosTuristicosService.atualizar(id, form);
        toast.success('Ponto atualizado com sucesso!');
      } else {
        await pontosTuristicosService.criar(form);
        toast.success('Ponto cadastrado com sucesso!');
      }
      navigate('/');
    } catch {
      toast.error(isEdicao ? 'Erro ao atualizar o ponto turístico.' : 'Erro ao cadastrar o ponto turístico.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="cadastro-page">
      <div className="container py-4">
        <motion.div
          className="cadastro-card card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Cabeçalho */}
          <div className="card-header-custom">
            <button className="btn btn-back" onClick={() => navigate('/')}>
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Voltar
            </button>
            <div>
              <h2 className="form-title">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                {isEdicao ? 'Editar Ponto Turístico' : 'Novo Ponto Turístico'}
              </h2>
              <p className="text-muted mb-0 form-subtitle">
                {isEdicao ? 'Atualize as informações abaixo.' : 'Preencha as informações do local.'}
              </p>
            </div>
          </div>

          <div className="card-body p-4">
            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                {/* Nome */}
                <div className="col-12">
                  <label className="form-label required">Nome do Local</label>
                  <input
                    type="text"
                    name="nome"
                    className={`form-control ${erros.nome ? 'is-invalid' : ''}`}
                    placeholder="Ex: Praia de Copacabana"
                    value={form.nome}
                    onChange={handleChange}
                    maxLength={100}
                  />
                  {erros.nome && <div className="invalid-feedback">{erros.nome}</div>}
                </div>

                {/* Descrição */}
                <div className="col-12">
                  <label className="form-label required">Descrição</label>
                  <textarea
                    name="descricao"
                    className={`form-control ${erros.descricao ? 'is-invalid' : ''}`}
                    placeholder="Descreva o ponto turístico..."
                    rows={3}
                    value={form.descricao}
                    onChange={handleChange}
                    maxLength={100}
                  />
                  <div className="d-flex justify-content-between">
                    {erros.descricao
                      ? <div className="invalid-feedback d-block">{erros.descricao}</div>
                      : <span />
                    }
                    <small className="text-muted">{form.descricao.length}/100</small>
                  </div>
                </div>

                {/* Endereço */}
                <div className="col-12">
                  <label className="form-label required">Endereço</label>
                  <input
                    type="text"
                    name="endereco"
                    className={`form-control ${erros.endereco ? 'is-invalid' : ''}`}
                    placeholder="Rua, número, bairro"
                    value={form.endereco}
                    onChange={handleChange}
                  />
                  {erros.endereco && <div className="invalid-feedback">{erros.endereco}</div>}
                </div>

                {/* Estado e Cidade */}
                <div className="col-md-4">
                  <label className="form-label required">Estado</label>
                  <select
                    name="estado"
                    className={`form-select ${erros.estado ? 'is-invalid' : ''}`}
                    value={form.estado}
                    onChange={handleChange}
                  >
                    <option value="">UF</option>
                    {ESTADOS.map((uf) => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                  {erros.estado && <div className="invalid-feedback">{erros.estado}</div>}
                </div>

                <div className="col-md-8">
                  <label className="form-label required">Cidade</label>
                  <select
                    name="cidade"
                    className={`form-select ${erros.cidade ? 'is-invalid' : ''}`}
                    value={form.cidade}
                    onChange={handleChange}
                    disabled={!form.estado || municipios.length === 0}
                  >
                    <option value="">
                      {!form.estado ? 'Selecione um estado primeiro' : municipios.length === 0 ? 'Carregando...' : 'Selecione a cidade'}
                    </option>
                    {municipios.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  {erros.cidade && <div className="invalid-feedback">{erros.cidade}</div>}
                </div>

                {/* Categoria */}
                <div className="col-md-6">
                  <label className="form-label required">Categoria</label>
                  <select
                    name="categoria"
                    className={`form-select ${erros.categoria ? 'is-invalid' : ''}`}
                    value={form.categoria}
                    onChange={handleChange}
                  >
                    <option value="">Selecione uma categoria</option>
                    {CATEGORIAS.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {erros.categoria && <div className="invalid-feedback">{erros.categoria}</div>}
                </div>

                {/* Botões */}
                <div className="col-12 d-flex gap-3 justify-content-end mt-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/')}
                    disabled={salvando}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success btn-salvar"
                    disabled={salvando}
                  >
                    {salvando ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faSave} className="me-2" />
                        {isEdicao ? 'Atualizar' : 'Cadastrar'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
