import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Main, Camera } from "../screens";

// Screen에 넘길 파라미터가 없으면 undefined, 있다면 파라미터 객체를 작성해 주세요!
export type MainParamList = {
    Main: undefined,
    Camera2: undefined,
}

const Stack = createStackNavigator<MainParamList>();

const StackNav = () => {
    return <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Camera2" component={Camera} />
    </Stack.Navigator>
}

export default StackNav;