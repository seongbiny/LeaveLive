import React from "react";
import { View, Text, Button } from "react-native";

const Main = ({ navigation }) => {
    return <View>
        <Text>Main</Text>
        <Button title="카메라" onPress={() => navigation.navigate("Camera2")}></Button>
    </View>
}

export default Main;