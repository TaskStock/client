import React, { useEffect, useState } from "react";
import Icons from "../../components/atoms/Icons";
import PageHeader from "../../components/molecules/PageHeader";
import { spacing } from "../../constants/spacing";
import UserInfo from "../../components/organisms/SNS/UserInfo";
import styled from "styled-components/native";
import { client } from "../../services/api";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import { getTargetUserThunk } from "../../store/modules/getFriends";

// const data = {
//   result: "success",
//   targetData: {
//     user_id: 132,
//     user_name: "민세원",
//     image: "public/images/ic_profile.png",
//     cumulative_value: 0,
//     strategy: "local",
//     private: false,
//     pending: false,
//     follower_count: 2,
//     following_count: 9,
//     introduce: null,
//     isFollowingMe: false,
//     isFollowingYou: false,
//   },
//   values: [
//     {
//       value_id: 84,
//       date: "2024-01-16T21:00:00.000Z",
//       start: 50000,
//       end: 50000,
//       low: 50000,
//       high: 50000,
//       user_id: 132,
//     },
//   ],
//   todos: [
//     {
//       todo_id: 684,
//       content: "ㅎㅇ",
//       check: false,
//       date: "2024-01-30T02:01:26.124Z",
//       level: 3,
//       index: 1,
//       user_id: 132,
//       project_id: 23,
//     },
//   ],
//   projects: [
//     {
//       project_id: 23,
//       name: "이이잉",
//       public_range: "all",
//       user_id: 132,
//       finished: false,
//     },
//   ],
// };

const Container = styled.View`
  flex: 1;
  padding: 0 ${spacing.offset}px;
`;

const UserDetailScreen = ({ route }) => {
  const userId = route.params.userId;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTargetUserThunk(userId));
  }, []);

  // const getUserInfo = async () => {
  //   try {
  //     const res = await client.get(`sns/users/${userId}`, {
  //       accessToken,
  //     });
  //     if (res.result === "success") {
  //       console.log("성공", res.targetData);
  //       setUserInfo(res.targetData);
  //       return res;
  //     } else {
  //       console.log("서버에서 타겟유저 정보 불러오기 실패: ", res);
  //     }
  //   } catch (e) {
  //     console.log("타겟유저 정보 불러오기 실패: ", e);
  //   }
  // };
  // useEffect(() => {
  //   getUserInfo();
  // }, []);
  return (
    <>
      <PageHeader
        title=""
        headerRight={<Icons name="share" type="entypo" size={spacing.gutter} />}
      />
      <UserInfo />

      <Container>{/* 여기에 추가 */}</Container>
    </>
  );
};

export default UserDetailScreen;
