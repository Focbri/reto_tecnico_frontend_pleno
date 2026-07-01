export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box" role="alert">
      <p className="error-box__title">Algo salió mal</p>
      <p className="error-box__text">{message}</p>
      {onRetry && (
        <button className="btn btn--primary" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  )
}
