import React from "react";
import FlexBox from "../../atoms/FlexBox";
import Margin from "../../atoms/Margin";
import { spacing } from "../../../constants/spacing";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import Text from "../../atoms/Text";

const UnSubscribeNotice = () => {
  return (
    <FlexBox
      direction="column"
      alignItems="center"
      gap={spacing.padding}
      styles={{ paddingHorizontal: spacing.offset }}
    >
      <Margin margin={useResponsiveFontSize(55)} />
      <Text size="md" weight="semibold">
        탈퇴하시겠습니까?
      </Text>
      <Text size="md" weight="semibold">
        아래 탈퇴 유의사항을 읽어주세요.
      </Text>
      <Margin margin={useResponsiveFontSize(44)} />
      <Text size="md">
        · 회원 탈퇴를 하면 현재 로그인된 아이디는 즉시 탈퇴 처리돼요.
      </Text>
      <Text size="md">
        · 회원탈퇴를 하면 개인정보 취급방침 및 이용약관에 따라 개인정보는
        삭제돼요.
      </Text>
      <Text size="md">
        · 탈퇴 후 관련된 회원 및 활동 정보는 모두 삭제되며, 복구되지 않아요.
      </Text>
    </FlexBox>
  );
};

export default UnSubscribeNotice;
