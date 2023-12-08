import './ButtonPreloader.css';

function ButtonPreloader({ statPage }: { statPage?: boolean }) {
  return <span className={`loader ${statPage ? 'loader_stat-page' : ''}`}></span>;
}

export default ButtonPreloader;
