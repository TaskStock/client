import { appleAuth } from "@invertase/react-native-apple-authentication";

export async function onAppleButtonPress() {
  try {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    //   console.log("apple response: ", appleAuthRequestResponse);

    const appleUser = {
      // apple은 처음 로그인 시에만 email을 제공해줌. 따라서 user identifier(user)를 email로 사용함
      email: appleAuthRequestResponse.user,
      userName: `${appleAuthRequestResponse.fullName?.givenName} ${appleAuthRequestResponse.fullName?.familyName}`,
      userPicture: null,
      isAgree: 1,
      strategy: "apple",
    };
    console.log("appleUser: ", appleUser);
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );
    //   console.log("apple credentialState: ", credentialState);
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      return appleUser;
    }
  } catch (error) {
    console.log("apple error: ", error);
  }
}
