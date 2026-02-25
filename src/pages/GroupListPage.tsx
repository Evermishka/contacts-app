import { memo, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { loadGroupsAsync, reloadGroupsAsync } from 'src/store/actions';
import { ErrorIndicator, LoadingIndicator } from 'src/components/StatusIndicator';

export const GroupListPage = memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Загружаем группы при монтировании компонента
    dispatch(loadGroupsAsync());
  }, [dispatch]);

  const groups = useAppSelector((state) => state.groups);
  const {
    loading: loadingGroups,
    error: errorGroups,
    errorMessage: errorMessageGroups,
  } = useAppSelector((state) => state.ui.groups);

  const handleRetry = () => {
    dispatch(reloadGroupsAsync());
  };

  if (loadingGroups) {
    return <LoadingIndicator loading={loadingGroups} message="Загрузка..." />;
  }

  if (errorGroups) {
    return (
      <ErrorIndicator error={errorGroups} errorMessage={errorMessageGroups} onRetry={handleRetry} />
    );
  }

  return (
    <>
      <Row xxl={4}>
        {groups.map((groupContacts) => (
          <Col key={groupContacts.id}>
            <GroupContactsCard groupContacts={groupContacts} withLink />
          </Col>
        ))}
      </Row>
    </>
  );
});
