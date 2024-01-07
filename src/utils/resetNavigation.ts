export const resetNavigation = (navigation: any) => {
  navigation.reset({
    index: 0,
    routes: [
      {
        name: "LoginStack",
        state: {
          routes: [{ name: "Welcome" }],
        },
      },
    ],
  });
};
