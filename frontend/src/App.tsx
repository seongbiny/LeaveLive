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
