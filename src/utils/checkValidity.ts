export const checkValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

// 수정 필요
export const checkValidPassword = (password) => {
  // 8자 이상이며, 적어도 하나의 숫자를 포함하는 정규표현식
  const regex = /^(?=.*[0-9]).{8,}$/;
  return regex.test(password);
};
