import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export function NotFoundPage() {
  return (
    <div className="notfound">
      <h1 className="notfound__header">404</h1>
      <h2 className="notfound__text">Страница не найдена</h2>
      <Link to="/" className="notfound__link">
        На главную
      </Link>
    </div>
  );
}
