import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  CeoBnbList,
  CeoBnbDetail,
  CeoBnbCreate,
  CeoBnbUpdate,
} from "../../screens";
import { MaterialIcons } from "@expo/vector-icons";
import { headerTitleStyle } from "../TabTypes";

export type StackParamList = {
  CeoBnbList: undefined;
  CeoBnbDetail: undefined;
  CeoBnbCreate: undefined;
  CeoBnbUpdate: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const StackNav = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="CeoBnbList"
      screenOptions={{
        cardStyle: { backgroundColor: theme.background },
        headerTintColor: theme.main,
        headerTitleAlign: "center",
        headerTitleStyle: headerTitleStyle,
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
        name="CeoBnbList"
        component={CeoBnbList}
        options={{
          headerTitle: "숙소 관리",
          headerLeft: () => {
            return null;
          },
        }}
      />
      <Stack.Screen
        name="CeoBnbDetail"
        component={CeoBnbDetail}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="CeoBnbCreate"
        component={CeoBnbCreate}
        options={{ headerTitle: "숙소 정보 등록" }}
      />
      <Stack.Screen
        name="CeoBnbUpdate"
        component={CeoBnbUpdate}
        options={{ headerTitle: "숙소 정보 수정" }}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
