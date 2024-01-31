import React from "react";
import PageHeader from "../../components/molecules/PageHeader";
import Text from "../../components/atoms/Text";

const AlarmDetailScreen = ({ route }) => {
  const { detail, title, createdAt } = route.params;

  return (
    <>
      <PageHeader title="알림 상세페이지" />
      <Text size="lg" weight="bold">
        {title}
      </Text>
      <Text size="md">{createdAt}</Text>
      <Text size="md">{detail}</Text>
    </>
  );
};

export default AlarmDetailScreen;
