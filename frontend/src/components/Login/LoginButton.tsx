import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Button } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const LoginButton = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: `349846952013-ki7oc56c72f8ce7vvotjjiqd4hubs8hb.apps.googleusercontent.com`,
    iosClientId: `349846952013-rporj1tujtgglq4etlobt9muc3kaqv1v.apps.googleusercontent.com`,
    androidClientId: `349846952013-8gbl2v0apkj8s56v2r1bjmurj90adujv.apps.googleusercontent.com`,
    webClientId: `349846952013-ki7oc56c72f8ce7vvotjjiqd4hubs8hb.apps.googleusercontent.com`,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log(authentication);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
};

export default LoginButton;
