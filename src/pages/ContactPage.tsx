import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactCard } from 'src/components/ContactCard';
import { Empty } from 'src/components/Empty';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { loadContactsAsync, reloadContactsAsync } from 'src/store/actions';
import { ErrorIndicator, LoadingIndicator } from 'src/components/StatusIndicator';

export const ContactPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Загружаем контакты при монтировании компонента
    dispatch(loadContactsAsync());
  }, [dispatch]);

  const { contactId } = useParams<{ contactId: string }>();
  const contacts = useAppSelector((state) => state.contacts);
  const {
    loading: loadingContacts,
    error: errorContacts,
    errorMessage: errorMessageContatcts,
  } = useAppSelector((state) => state.ui.contacts);

  const contactCurrent = contacts.find(({ id }) => id === contactId);

  const handleRetry = () => {
    dispatch(reloadContactsAsync());
  };

  if (loadingContacts) {
    return <LoadingIndicator loading={loadingContacts} message="Загрузка..." />;
  }

  if (errorContacts) {
    return (
      <ErrorIndicator
        error={errorContacts}
        errorMessage={errorMessageContatcts}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contactCurrent ? <ContactCard contact={contactCurrent} /> : <Empty />}
      </Col>
    </Row>
  );
};
