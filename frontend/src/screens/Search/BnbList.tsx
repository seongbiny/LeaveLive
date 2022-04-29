import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';


const BnbList = ({ navigation }: any) => {
    return (
        <ScrollView>
            <Container>
                <Box onPress={() => navigation.navigate('BnbDetail')}>
                    <Image
                        style={styles.img}
                        source={{
                            uri: 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2018/04/19/1206/Grand-Hyatt-Seoul-P1117-Executive-Suite-Night-Bedroom.jpg/Grand-Hyatt-Seoul-P1117-Executive-Suite-Night-Bedroom.4x3.jpg?imwidth=1280',
                        }}
                    />
                    <Styledtitle>그랜드 하얏트 제주</Styledtitle>
                    <Styledprice>756,000원</Styledprice>
                </Box>
                <Box onPress={() => navigation.navigate('BnbDetail')}>
                    <Image
                        style={styles.img}
                        source={{
                            uri: 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2018/04/19/1206/Grand-Hyatt-Seoul-P1117-Executive-Suite-Night-Bedroom.jpg/Grand-Hyatt-Seoul-P1117-Executive-Suite-Night-Bedroom.4x3.jpg?imwidth=1280',
                        }}
                    />
                    <Styledtitle>그랜드 하얏트 제주</Styledtitle>
                    <Styledprice>756,000원</Styledprice>
                </Box>
                <Box onPress={() => navigation.navigate('BnbDetail')}>
                    <Image
                        style={styles.img}
                        source={{
                            uri: 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2018/04/19/1206/Grand-Hyatt-Seoul-P1117-Executive-Suite-Night-Bedroom.jpg/Grand-Hyatt-Seoul-P1117-Executive-Suite-Night-Bedroom.4x3.jpg?imwidth=1280',
                        }}
                    />
                    <Styledtitle>그랜드 하얏트 제주</Styledtitle>
                    <Styledprice>756,000원</Styledprice>
                </Box>
                <Box onPress={() => navigation.navigate('BnbDetail')}>
                    <Image
                        style={styles.img}
                        source={{
                            uri: 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2018/04/19/1206/Grand-Hyatt-Seoul-P1117-Executive-Suite-Night-Bedroom.jpg/Grand-Hyatt-Seoul-P1117-Executive-Suite-Night-Bedroom.4x3.jpg?imwidth=1280',
                        }}
                    />
                    <Styledtitle>그랜드 하얏트 제주</Styledtitle>
                    <Styledprice>756,000원</Styledprice>
                </Box>
                <Box onPress={() => navigation.navigate('BnbDetail')}>
                    <Image
                        style={styles.img}
                        source={{
                            uri: 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2018/04/19/1206/Grand-Hyatt-Seoul-P1117-Executive-Suite-Night-Bedroom.jpg/Grand-Hyatt-Seoul-P1117-Executive-Suite-Night-Bedroom.4x3.jpg?imwidth=1280',
                        }}
                    />
                    <Styledtitle>그랜드 하얏트 제주</Styledtitle>
                    <Styledprice>756,000원</Styledprice>
                </Box>
                <Box onPress={() => navigation.navigate('BnbDetail')}>
                    <Image
                        style={styles.img}
                        source={{
                            uri: 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2018/04/19/1206/Grand-Hyatt-Seoul-P1117-Executive-Suite-Night-Bedroom.jpg/Grand-Hyatt-Seoul-P1117-Executive-Suite-Night-Bedroom.4x3.jpg?imwidth=1280',
                        }}
                    />
                    <Styledtitle>그랜드 하얏트 제주</Styledtitle>
                    <Styledprice>756,000원</Styledprice>
                </Box>
            </Container>
        </ScrollView>
    )
}

const Box = styled.TouchableOpacity`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   border: 1px solid;
  margin-bottom: 20;
  width: 90%;
`;
const Styledtitle = styled.View`
    margin-bottom: 10;
`;
const Styledprice = styled.View`
    flex-direction: row-reverse;
`;
const Container = styled.View`
    flex: 1;
    // justify-content: center;
    align-items: center;
    // margin-top: 50;
    // margin-bottom: 50;
`;

const styles = StyleSheet.create({
    img: {
      width: '100%',
      height: 200,
    },
  });

export default BnbList;