import { ThemeProvider } from "styled-components/native";
import Navigation from "./navigations";
import { StatusBar } from "react-native";
import { theme } from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor={theme.white} barStyle="dark-content" />
      <Navigation />
    </ThemeProvider>
  );
}

// import React from "react";
// import { WebView } from "react-native-webview";
// import { View, Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// // const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage("this is message from web");`;
// import styled from "styled-components/native";

// const Container = styled.SafeAreaView`
//   align-items: center;
//   justify-content: center;
// `;
// const LoginTest = () => {
//   return (
//     // <Container>
//     //   <Text>휴..</Text>
//     <WebView
//       originWhitelist={["*"]}
//       source={{
//         url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces",
//       }}
//     />
//     // </Container>
//   );
// };

// export default LoginTest;
