import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactCard } from 'src/components/ContactCard';
import { Empty } from 'src/components/Empty';
import { useAppSelector } from 'src/store/hooks';

export const ContactPage = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const contacts = useAppSelector((state) => state.contacts);

  const contactCurrent = contacts.find(({ id }) => id === contactId);

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contactCurrent ? <ContactCard contact={contactCurrent} /> : <Empty />}
      </Col>
    </Row>
  );
};
