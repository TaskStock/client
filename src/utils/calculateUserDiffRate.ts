import { IUserBox } from "../@types/userBox";

export const calculateUserDiffRate = (user: {
  cumulative_value: IUserBox["cumulative_value"];
  value_yesterday_ago: IUserBox["value_yesterday_ago"];
}) => {
  const data = {
    cumulative_value: user.cumulative_value,
    value_month_ago: user.value_yesterday_ago,
  };

  const diff = data.cumulative_value - data.value_month_ago;
  const diff_rate =
    ((data.cumulative_value - data.value_month_ago) * 100) /
    data.value_month_ago;

  const renderDiffRate = diff_rate.toFixed(2);

  return { diff, diff_rate, renderDiffRate };
};
