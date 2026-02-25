import { memo, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm, FilterFormValues } from 'src/components/FilterForm';
import { ContactDto } from 'src/types/dto/ContactDto';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { loadContactsAsync, loadGroupsAsync, reloadContactsAsync } from 'src/store/actions';
import { ErrorIndicator, LoadingIndicator } from 'src/components/StatusIndicator';

export const ContactListPage = memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Загружаем контакты и группы при монтировании компонента
    dispatch(loadContactsAsync());
    dispatch(loadGroupsAsync());
  }, [dispatch]);

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

  const [filter, setFilter] = useState<Partial<FilterFormValues>>({});

  const contactsFiltered = useMemo(() => {
    let findContacts: ContactDto[] = contacts;

    if (filter.name) {
      const fvName = filter.name.toLowerCase();
      findContacts = findContacts.filter(({ name }) => name.toLowerCase().indexOf(fvName) > -1);
    }

    if (filter.groupId) {
      const groupContacts = groups.find(({ id }) => id === filter.groupId);

      if (groupContacts) {
        findContacts = findContacts.filter(({ id }) => groupContacts.contactIds.includes(id));
      }
    }

    return findContacts;
  }, [contacts, groups, filter]);

  const handleRetry = () => {
    dispatch(reloadContactsAsync());
    dispatch(loadGroupsAsync());
  };

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    setFilter(fv);
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
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm groupContactsList={groups} initialValues={{}} onSubmit={onSubmit} />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {contactsFiltered.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});
