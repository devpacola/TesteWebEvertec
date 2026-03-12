import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // trocar pela URL real da API

// ─── Dados chumbados (remover quando a API estiver pronta) ────────────────────
export const MOCK_DATA = [
  {
    id: 1,
    nome: 'Cristo Redentor',
    descricao: 'Estátua monumental do Cristo Redentor, um dos Sete Milagres do Mundo Moderno, localizada no topo do morro do Corcovado.',
    endereco: 'Parque Nacional da Tijuca, Alto da Boa Vista',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    categoria: 'Monumento',
    avaliacao: 5,
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Cristo_Redentor_-_2014_%2801%29.jpg/800px-Cristo_Redentor_-_2014_%2801%29.jpg',
  },
  {
    id: 2,
    nome: 'Parque Ibirapuera',
    descricao: 'O maior parque urbano de São Paulo, com museus, lagos, pistas de skate e muita área verde para lazer e esportes.',
    endereco: 'Av. Pedro Álvares Cabral, s/n',
    cidade: 'São Paulo',
    estado: 'SP',
    categoria: 'Parque',
    avaliacao: 4,
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Parque_Ibirapuera_-_pavilhao_japonês.jpg/800px-Parque_Ibirapuera_-_pavilhao_japonês.jpg',
  },
  {
    id: 3,
    nome: 'Praia de Jericoacoara',
    descricao: 'Considerada uma das praias mais bonitas do mundo, com dunas, lagoas e pôr do sol deslumbrante.',
    endereco: 'Parque Nacional de Jericoacoara',
    cidade: 'Jijoca de Jericoacoara',
    estado: 'CE',
    categoria: 'Praia',
    avaliacao: 5,
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jericoacoara_sunset.jpg/800px-Jericoacoara_sunset.jpg',
  },
  {
    id: 4,
    nome: 'Teatro Amazonas',
    descricao: 'Imponente ópera construída durante o ciclo da borracha, símbolo cultural de Manaus e da região amazônica.',
    endereco: 'Largo de São Sebastião, s/n - Centro',
    cidade: 'Manaus',
    estado: 'AM',
    categoria: 'Museu',
    avaliacao: 4,
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Teatro_Amazonas_-_Manaus%2C_AM%2C_Brazil_%282009%29.jpg/800px-Teatro_Amazonas_-_Manaus%2C_AM%2C_Brazil_%282009%29.jpg',
  },
  {
    id: 5,
    nome: 'Lençóis Maranhenses',
    descricao: 'Parque Nacional com dunas brancas e lagoas de água cristalina, formando uma paisagem única no mundo.',
    endereco: 'Parque Nacional dos Lençóis Maranhenses',
    cidade: 'Barreirinhas',
    estado: 'MA',
    categoria: 'Parque',
    avaliacao: 5,
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Lencois_Maranhenses.jpg/800px-Lencois_Maranhenses.jpg',
  },
];

// ─── Serviço com chamadas à API (descomentar quando a API estiver pronta) ─────
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const pontosTuristicosService = {
  listar: () => api.get('/pontos-turisticos'),
  buscarPorId: (id) => api.get(`/pontos-turisticos/${id}`),
  criar: (data) => api.post('/pontos-turisticos', data),
  atualizar: (id, data) => api.put(`/pontos-turisticos/${id}`, data),
  excluir: (id) => api.delete(`/pontos-turisticos/${id}`),
};

export default pontosTuristicosService;
