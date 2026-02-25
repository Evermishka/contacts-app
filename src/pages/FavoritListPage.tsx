import { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { useAppSelector } from 'src/store/hooks';

export const FavoritListPage = memo(() => {
  const contacts = useAppSelector((state) => state.contacts);
  const favorites = useAppSelector((state) => state.favorites);

  const contactsCurrent = contacts.filter(({ id }) => favorites.includes(id));

  return (
    <Row xxl={4} className="g-4">
      {contactsCurrent.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
