import React from "react";
import { WebView } from "react-native-webview";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage("this is message from web");`;
const CLIENT_ID = "a94a58a320c014113abad6cefb630872";
const REDIRECT_URI = "http://localhost:19006";

const handleResponse = (data: any) => {
  console.log(data);
};

const LoginTest = () => {
  return (
    <WebView
      style={{ marginTop: 50 }}
      originWhitelist={["*"]}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      javaScriptEnabled={true}
      source={{
        uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`,
      }}
      onMessage={(event) => {
        console.log("왱애애애앢");
        handleResponse(event);
      }}
    />
  );
};

export default LoginTest;
