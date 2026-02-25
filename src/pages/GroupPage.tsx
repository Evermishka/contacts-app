import { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { Empty } from 'src/components/Empty';
import { ContactCard } from 'src/components/ContactCard';
import { useAppSelector } from 'src/store/hooks';

export const GroupPage = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();

  const contacts = useAppSelector((state) => state.contacts);
  const groups = useAppSelector((state) => state.groups);

  const groupContactsCurrent = groups.find(({ id }) => id === groupId);
  const contactsCurrent = groupContactsCurrent
    ? contacts.filter(({ id }) => groupContactsCurrent.contactIds.includes(id))
    : [];

  return (
    <Row className="g-4">
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
