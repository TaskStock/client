import { client } from "../../services/api";

export const followInAlarm = async (userId, accessToken, noticeId) => {
  try {
    const res = await client.post(
      "sns/follow",
      { following_id: userId, notice_id: noticeId },
      { accessToken }
    );
    console.log("팔로우 성공: ", res);
  } catch (e) {
    console.log("팔로우 실패: ", e);
  }
};

export const unfollowInAlarm = async (userId, accessToken, noticeId) => {
  try {
    const res = await client.delete(
      `sns/unfollow`,
      { unfollowing_id: userId, notice_id: noticeId },
      {
        accessToken,
      }
    );
    console.log("언팔로우 성공: ", res);
  } catch (e) {
    console.log("언팔로우 실패: ", e);
  }
};

export const cancelRequestInAlarm = async (userId, accessToken, noticeId) => {
  try {
    const res = await client.delete(
      "sns/follow",
      { following_id: userId, notice_id: noticeId },
      { accessToken }
    );
    console.log("요청 취소 성공: ", res);
  } catch (e) {
    console.log("요청 취소 실패: ", e);
  }
};

export const acceptRequestInAlarm = async (userId, accessToken, noticeId) => {
  try {
    const res = await client.patch(
      "sns/pending",
      { follower_id: userId, notice_id: noticeId },
      { accessToken }
    );
    console.log("요청 수락 response: ", res);
  } catch (e) {
    console.log("요청 수락 실패: ", e);
  }
};
