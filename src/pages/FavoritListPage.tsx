import { memo, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  loadContactsAsync,
  loadFavoritesAsync,
  reloadContactsAsync,
  reloadFavoritesAsync,
} from 'src/store/actions';
import { ErrorIndicator, LoadingIndicator } from 'src/components/StatusIndicator';

export const FavoritListPage = memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Загружаем контакты и избранное при монтировании компонента
    dispatch(loadContactsAsync());
    dispatch(loadFavoritesAsync());
  }, [dispatch]);

  const contacts = useAppSelector((state) => state.contacts);
  const favorites = useAppSelector((state) => state.favorites);
  const {
    loading: loadingContacts,
    error: errorContacts,
    errorMessage: errorMessageContatcts,
  } = useAppSelector((state) => state.ui.contacts);
  const {
    loading: loadingFavorites,
    error: errorFavorites,
    errorMessage: errorMessageFavorites,
  } = useAppSelector((state) => state.ui.favorites);

  const contactsCurrent = contacts.filter(({ id }) => favorites.includes(id));

  const handleRetry = () => {
    dispatch(reloadContactsAsync());
    dispatch(reloadFavoritesAsync());
  };

  if (loadingContacts || loadingFavorites) {
    return <LoadingIndicator loading={loadingContacts || loadingFavorites} message="Загрузка..." />;
  }

  if (errorContacts || errorFavorites) {
    return (
      <ErrorIndicator
        error={errorContacts || errorFavorites}
        errorMessage={errorMessageContatcts || errorMessageFavorites}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <>
      <Row xxl={4} className="g-4">
        {contactsCurrent.map((contact) => (
          <Col key={contact.id}>
            <ContactCard contact={contact} withLink />
          </Col>
        ))}
      </Row>
    </>
  );
});
