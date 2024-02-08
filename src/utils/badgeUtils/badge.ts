import badgeThunk from "./badgeThunk";

// ======== 뱃지 타입 ========
// 1: 10명의 팔로워를 달성했을 때
// 2: 42명의 팔로워를 달성했을 때
// 3. 가치 10만원 돌파
// 4. 가치 20만원 돌파
// 5. 가치 50만원 돌파
// 6. 가치 100만원 돌파
// 7. percentage 정확히 11%
// 8. percentage 50% 이상
// 9. 첫 투두 완료

// 사용 예:
// const badgeDispatcher = createBadgeDispatcher(dispatch);
// badgeDispatcher.reached10Followers();

const createBadgeDispatcher = (dispatch) => ({
  reached10Followers: () => dispatch(badgeThunk(1)),
  reached42Followers: () => dispatch(badgeThunk(2)),
  reached10K: () => dispatch(badgeThunk(3)),
  reached20K: () => dispatch(badgeThunk(4)),
  reached50K: () => dispatch(badgeThunk(5)),
  reached100K: () => dispatch(badgeThunk(6)),
  reached11Percent: () => dispatch(badgeThunk(7)),
  reached50Percent: () => dispatch(badgeThunk(8)),
  firstTodo: () => dispatch(badgeThunk(9)),
});

export const firstTodoBadgeDispatcher = (dispatch) => ({
  firstTodo: () => dispatch(badgeThunk(9)),
});

export default createBadgeDispatcher;
