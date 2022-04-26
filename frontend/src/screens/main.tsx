import React from "react";
import { View, Text, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainParamList } from "../navigations/MainNavigator";

type MainScreenNavigationProp = StackNavigationProp<MainParamList, 'Main'>;
type Props = { navigation: MainScreenNavigationProp };

const Main = ({ navigation }: Props) => {
    return <View>
        <Text>Main</Text>
        <Button title="카메라" onPress={() => navigation.navigate("Camera2") }></Button>
    </View>
}

export default Main;