import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const BnbDetail = () => {
    return (
        <Container>
            <Image
                style={styles.img}
                source={{
                    uri: 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2018/04/19/1206/Grand-Hyatt-Seoul-P1117-Executive-Suite-Night-Bedroom.jpg/Grand-Hyatt-Seoul-P1117-Executive-Suite-Night-Bedroom.4x3.jpg?imwidth=1280',
                }}
            />
            <StyleBody>
                <View>제목: 그랜드 하얏트 제주</View>
                <View>감성적인 숙소에서 친구/연인/가족과 함께 휴식 시간을 가져보세요</View>
                <View>위치</View>
            </StyleBody>
        </Container>
    )
}
const Container = styled.View`
    flex: 1;
    align-items: center;
`;

const StyleBody = styled.View`
    width: 90%;
    border: 1px solid;
`;

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: 300,
    },
})

export default BnbDetail;