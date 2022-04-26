import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Main, Login } from "../screens";
import { MaterialIcons } from "@expo/vector-icons";

// Screen에 넘길 파라미터가 없으면 undefined, 있다면 파라미터 객체를 작성해 주세요!
export type MainParamList = {
  Main: undefined;
  Login: { type: "user" };
};

const Stack = createStackNavigator<MainParamList>();

const StackNav = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.main,
        headerTitleAlign: "center",
        headerTitleStyle: {
          //   color: theme.text,
        },
        headerLeft: () => {
          return (
            <MaterialIcons
              name="keyboard-arrow-left"
              size={30}
              style={{ marginLeft: 8 }}
              color={theme.main}
            />
          );
        },
      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        initialParams={{ type: "user" }}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
