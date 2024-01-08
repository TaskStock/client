export const resetNavigation = (navigation: any) => {
  console.log("reset");
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
