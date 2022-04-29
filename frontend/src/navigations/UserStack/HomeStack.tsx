import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Login } from "../../screens";
import { MaterialIcons } from "@expo/vector-icons";
import LoginTest from "../../components/Login/LoginTest";

// Screen에 넘길 파라미터가 없으면 undefined, 있다면 파라미터 객체를 작성해 주세요!
export type MainParamList = {
  Home: undefined;
  Login: undefined;
  LoginTest: undefined;
};

const Stack = createStackNavigator<MainParamList>();

const HomeStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: theme.background },
        headerTintColor: theme.main,
        headerTitleAlign: "center",
        headerTitleStyle: {
          //   color: theme.text,
        },
        headerLeft: ({ onPress }) => {
          return (
            <MaterialIcons
              name="keyboard-arrow-left"
              size={30}
              style={{ marginLeft: 8 }}
              color={theme.main}
              onPress={onPress}
            />
          );
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginTest"
        component={LoginTest}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
