import { IUserBox } from "../@types/userBox";

export const calculateUserDiffRate = (user: {
  cumulative_value: IUserBox["cumulative_value"];
  value_yesterday_ago: IUserBox["value_yesterday_ago"];
}) => {
  const current = user.cumulative_value;
  const start = user.value_yesterday_ago;

  const toDivide = start === 0 ? 10000 : start;

  const diff = current - start;
  const diff_rate = ((current - start) * 100) / toDivide;

  const renderDiffRate = diff_rate.toFixed(2);

  return { diff, diff_rate, renderDiffRate };
};
