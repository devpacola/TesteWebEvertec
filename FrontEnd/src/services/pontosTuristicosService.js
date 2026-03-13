import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const pontosTuristicosService = {
  listar: () => api.get('/pontos-turisticos'),
  buscarPorId: (id) => api.get(`/pontos-turisticos/${id}`),
  buscarPorCategoria: (categoria) => api.get(`/pontos-turisticos/categoria/${categoria}`),
  buscarPorFiltro: (termo) => api.get(`/pontos-turisticos/buscar`, { params: { termo } }),
  criar: (data) => api.post('/pontos-turisticos', data),
  atualizar: (id, data) => api.put(`/pontos-turisticos/${id}`, data),
  excluir: (id) => api.delete(`/pontos-turisticos/${id}`),
};

export default pontosTuristicosService;
