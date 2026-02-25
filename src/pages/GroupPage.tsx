import { memo, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { Empty } from 'src/components/Empty';
import { ContactCard } from 'src/components/ContactCard';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  loadContactsAsync,
  loadGroupsAsync,
  reloadContactsAsync,
  reloadGroupsAsync,
} from 'src/store/actions';
import { ErrorIndicator, LoadingIndicator } from 'src/components/StatusIndicator';

export const GroupPage = memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Загружаем контакты и группы при монтировании компонента
    dispatch(loadContactsAsync());
    dispatch(loadGroupsAsync());
  }, [dispatch]);

  const { groupId } = useParams<{ groupId: string }>();
  const contacts = useAppSelector((state) => state.contacts);
  const groups = useAppSelector((state) => state.groups);
  const {
    loading: loadingContacts,
    error: errorContacts,
    errorMessage: errorMessageContatcts,
  } = useAppSelector((state) => state.ui.contacts);
  const {
    loading: loadingGroups,
    error: errorGroups,
    errorMessage: errorMessageGroups,
  } = useAppSelector((state) => state.ui.groups);

  const groupContactsCurrent = groups.find(({ id }) => id === groupId);
  const contactsCurrent = groupContactsCurrent
    ? contacts.filter(({ id }) => groupContactsCurrent.contactIds.includes(id))
    : [];

  const handleRetry = () => {
    dispatch(reloadContactsAsync());
    dispatch(reloadGroupsAsync());
  };

  if (loadingContacts || loadingGroups) {
    return <LoadingIndicator loading={loadingContacts || loadingGroups} message="Загрузка..." />;
  }

  if (errorContacts || errorGroups) {
    return (
      <ErrorIndicator
        error={errorContacts || errorGroups}
        errorMessage={errorMessageContatcts || errorMessageGroups}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <Row className="g-4">
      <Col xxl={12}></Col>
      {groupContactsCurrent ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={groupContactsCurrent} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className="g-4">
              {contactsCurrent.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <Empty />
      )}
    </Row>
  );
});
