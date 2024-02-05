export const buttonRender = (
  isPending,
  isPrivate,
  isFollowingMe,
  isFollowingYou
) => {
  // - **상대가 나를 팔로우하고 있지 않을 때 (`isFollowingMe = false`):**
  //     - 내가 상대를 팔로우하고 있을 때(**`isFollowingYou = true`**):
  //         - **"팔로잉"(언팔로우) 버튼**
  //     - 내가 상대를 팔로우하지 않을 때 (**`isFollowingYou = false`**):
  //         - 계정이 공개일 경우 (**`private = false`**): **"팔로우" 버튼**
  //         - 계정이 비공개이며 팔로우 요청이 대기 중이 아닐 때 (**`private = true`**, **`isPending = false`**): **"팔로우" 버튼**
  //         - 계정이 비공개이며 팔로우 요청이 대기 중일 때 (**`private = true`**, **`isPending = true`**): **"요청 취소" 버튼**
  //     -
  // - **상대가 나를 팔로우하고 있을 때 (`isFollowingMe = true`):**
  //     - 내가 상대를 팔로우하고 있지 않을 때 (**`isFollowingYou = false`**): **"맞팔로우" 버튼**
  //     - 내가 이미 상대를 팔로우하고 있을 때 (**`isFollowingYou = true`**): “**팔로잉" 버튼**
  let button;
  if (isFollowingMe === false) {
    if (isFollowingYou === true) {
      button = "팔로잉";
    } else {
      if (isPrivate === true) {
        isPending ? (button = "요청됨") : (button = "팔로우");
      } else {
        button = "팔로우";
      }
    }
  } else {
    // 상대가 나를 팔로우할 경우
    if (isFollowingYou === true) {
      button = "팔로잉";
    } else {
      if (isPrivate === true) {
        isPending ? (button = "요청됨") : (button = "맞팔로우");
      } else {
        button = "맞팔로우";
      }
    }
  }

  return button;
};
