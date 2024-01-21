import styled, { useTheme } from "styled-components/native";
import Icons from "../atoms/Icons";
import { TextInput } from "react-native-gesture-handler";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { WithLocalSvg } from "react-native-svg";
import SearchIcon from "../../../assets/icons/search.svg";
import { spacing } from "../../constants/spacing";
const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 7px 13px;
  gap: ${spacing.small}px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.box};
`;

export const SearchBar = () => {
  const theme = useTheme();
  return (
    <Container>
      <WithLocalSvg asset={SearchIcon} width={34} height={34} />
      <TextInput
        placeholderTextColor={theme.textDim}
        placeholder="내용이나 날짜를 검색하세요."
        style={{
          fontSize: useResponsiveFontSize(16),
        }}
      ></TextInput>
    </Container>
  );
};
