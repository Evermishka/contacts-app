import { Alert, Button, Spinner } from 'react-bootstrap';

interface LoadingIndicatorProps {
  loading: boolean;
  message?: string;
}

export const LoadingIndicator = ({ loading, message }: LoadingIndicatorProps) => {
  if (!loading) return null;

  return (
    <div className="d-flex align-items-center justify-content-center my-3">
      <Spinner animation="border" role="status" size="sm" className="me-2">
        <span className="visually-hidden">Загрузка...</span>
      </Spinner>
      <span>{message || 'Загрузка...'}</span>
    </div>
  );
};

interface ErrorIndicatorProps {
  error: boolean;
  errorMessage?: string;
  onRetry?: () => void;
}

export const ErrorIndicator = ({ error, errorMessage, onRetry }: ErrorIndicatorProps) => {
  if (!error) return null;

  return (
    <Alert variant="danger" className="d-flex align-items-center justify-content-between">
      <span>{errorMessage || 'Произошла ошибка'}</span>
      {onRetry && (
        <Button variant="outline-danger" size="sm" onClick={onRetry}>
          Повторить
        </Button>
      )}
    </Alert>
  );
};
