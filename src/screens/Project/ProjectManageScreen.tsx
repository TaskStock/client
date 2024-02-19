import { Pressable, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import PageHeader from "../../components/molecules/PageHeader";
import Section from "../../components/molecules/Section";
import ContentLayout from "../../components/atoms/ContentLayout";
import { TextInputWithBorder } from "../../components/atoms/TextInput";
import FlexBox from "../../components/atoms/FlexBox";
import { spacing } from "../../constants/spacing";
import RoundItemBtn from "../../components/atoms/RoundItemBtn";
import Margin from "../../components/atoms/Margin";
import { BlackBtnForProject, GrayBtn } from "../../components/atoms/Buttons";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { useTheme } from "styled-components/native";
import { useProjectForm } from "../../hooks/useProjectForm";
import Text from "../../components/atoms/Text";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProjectStackParamList } from "../../navigators/ProjectStack";
import Icons, { IconsPic } from "../../components/atoms/Icons";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { BoxIcon } from "../../components/organisms/Project/ProjectList";

const THEME_CONSTANTS = {
  dark: {
    addEmoji: require("../../../assets/icons/addEmoji-dark.png"),
  },
  gray: {
    addEmoji: require("../../../assets/icons/addEmoji-light.png"),
  },
};

const ProjectSection = ({
  headerText,
  children,
}: {
  headerText: string;
  children: React.ReactNode;
}) => {
  return (
    <Section
      header={
        <Section.Header>
          <Section.HeaderText>{headerText}</Section.HeaderText>
        </Section.Header>
      }
      gapSize="lg"
    >
      {children}
    </Section>
  );
};

const PUBLIC_TYPE = [
  {
    name: "전체공개",
    value: "all",
  },
  {
    name: "팔로워",
    value: "follow",
  },
  {
    name: "비공개",
    value: "none",
  },
];

const progressType = [
  {
    name: "진행중",
    value: false,
  },
  {
    name: "완료",
    value: true,
  },
];

export default function ProjectManageScreen() {
  const theme = useTheme();

  const navigation = useNavigation<NavigationProp<ProjectStackParamList>>();

  const {
    form,
    isEditMode,
    onChangeProjectName,
    onChangeProjectPublic,
    onChangeProjectProgress,
    onChangeProjectEmoji,
    onSubmit,
    onRemove,
  } = useProjectForm();

  const onPressSubmitBtn = () => {
    onSubmit();
    navigation.goBack();
  };

  const onPressDeleteBtn = () => {
    onRemove();
    navigation.goBack();
  };
  const [isEmojiSelectorOpen, setIsEmojiSelectorOpen] = useState(false);
  const [emoji, setEmoji] = useState("");
  const AddEmoji = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => setIsEmojiSelectorOpen((prev) => !prev)}
          style={{
            position: "absolute",
            right: 5,
            bottom: 5,
            // backgroundColor: emoji ? "black" : "transparent",
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
            width: 40,
            height: 40,
            borderRadius: 40,
          }}
        >
          {emoji !== "" ? (
            <BoxIcon hasImoji>
              <Text size="xl">{emoji}</Text>
            </BoxIcon>
          ) : (
            <IconsPic source={THEME_CONSTANTS[theme.name].addEmoji} size={35} />
          )}
        </TouchableOpacity>
      </>
    );
  };

  const EmojiSelectorBox = () => {
    const onEmojiSelected = (emoji: string) => {
      setEmoji(emoji);
      onChangeProjectEmoji(emoji);

      setIsEmojiSelectorOpen(false);
    };

    return (
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "50%",
          backgroundColor: "white",
          zIndex: 100,
          bottom: 0,
        }}
      >
        <EmojiSelector
          category={Categories.all}
          onEmojiSelected={onEmojiSelected}
          placeholder={"검색"}
          columns={10}
          showHistory={false}
          showTabs={false}
          showSectionTitles={false}
        />
      </View>
    );
  };

  return (
    <Pressable
      style={{
        flex: 1,
        backgroundColor: theme.box,
      }}
      onPress={() => setIsEmojiSelectorOpen(false)}
    >
      <PageHeader />
      {isEmojiSelectorOpen && <EmojiSelectorBox />}

      <ContentLayout>
        <FlexBox direction="column" gap={spacing.gutter} alignItems="stretch">
          <ProjectSection headerText="프로젝트 이름">
            <TextInputWithBorder
              value={form.name}
              placeholderTextColor={theme.textDim}
              onChangeText={onChangeProjectName}
              placeholder="프로젝트 이름을 입력하세요"
              maxLength={25}
            ></TextInputWithBorder>
            {form.project_emoji ? (
              <Pressable
                style={{
                  position: "absolute",
                  right: 5,
                  bottom: 5,
                }}
                onPress={() => setIsEmojiSelectorOpen((prev) => !prev)}
              >
                <BoxIcon hasImoji>
                  <Text size="xl">{form.project_emoji}</Text>
                </BoxIcon>
              </Pressable>
            ) : (
              <AddEmoji />
            )}
          </ProjectSection>

          <ProjectSection headerText="공개설정">
            <FlexBox direction="row" gap={spacing.padding}>
              {PUBLIC_TYPE.map((item) => (
                <RoundItemBtn
                  key={item.value}
                  onPress={() => onChangeProjectPublic(item.value)}
                  isSelected={form.public_range === item.value ? true : false}
                >
                  <Text
                    size="sm"
                    color={
                      theme.name == "dark"
                        ? theme.text
                        : form.public_range === item.value
                        ? theme.textReverse
                        : theme.text
                    }
                  >
                    {item.name}
                  </Text>
                </RoundItemBtn>
              ))}
            </FlexBox>
          </ProjectSection>
          {isEditMode && (
            <ProjectSection headerText="완료여부">
              <FlexBox direction="row" gap={spacing.padding}>
                {progressType.map((item) => (
                  <RoundItemBtn
                    key={item.name}
                    onPress={() => onChangeProjectProgress(item.value)}
                    isSelected={form.finished === item.value}
                  >
                    <Text
                      size="sm"
                      color={
                        form.finished === item.value ? "white" : theme.text
                      }
                    >
                      {item.name}
                    </Text>
                  </RoundItemBtn>
                ))}
              </FlexBox>
            </ProjectSection>
          )}
        </FlexBox>
        <Margin margin={useResponsiveFontSize(100)} />
        <FlexBox gap={spacing.padding}>
          <BlackBtnForProject
            text="확인"
            onPress={onPressSubmitBtn}
            style={{ flex: 3 }}
          ></BlackBtnForProject>
          {isEditMode && (
            <GrayBtn
              text="삭제"
              onPress={onPressDeleteBtn}
              style={{
                flex: 1,
              }}
            ></GrayBtn>
          )}
        </FlexBox>
      </ContentLayout>
    </Pressable>
  );
}
