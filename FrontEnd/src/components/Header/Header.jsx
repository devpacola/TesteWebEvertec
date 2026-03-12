import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPlus, faList } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

export default function Header() {
  const location = useLocation();

  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="brand-icon" />
            <span>Pontos Turísticos</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                  to="/"
                >
                  <FontAwesomeIcon icon={faList} className="me-2" />
                  Listagem
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link btn-cadastro ${location.pathname === '/cadastro' ? 'active' : ''}`}
                  to="/cadastro"
                >
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Novo Ponto
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
