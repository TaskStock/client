export interface IUserBox {
  user_id: number;
  user_name: string;
  rank: number;
  cumulative_value: number;
  value_yesterday_ago: number;
  image: string;
  strategy: string;
  private: boolean;
  isFollowingMe: boolean;
  isFollowingYou: boolean;
  pending: boolean;
  button: "팔로우" | "팔로잉" | "맞팔로우" | "요청됨";
}
