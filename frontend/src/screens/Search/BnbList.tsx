import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import styled from 'styled-components/native';

const BnbList = () => {
    return (
        <View>
            <Container>
                <Image
                    style={styles.logo}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                <Styledtitle>그랜드 하얏트 제주</Styledtitle>
                <Styledprice>756,000원</Styledprice>
            </Container>
        </View>
    )
}

const Container = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
  border: 1px solid;
`;
const Styledtitle = styled.Text`
    flex-direction: row; 
`;
const Styledprice = styled.Text`
    flex-direction: reverse-row;
`;

const styles = StyleSheet.create({
    logo: {
      width: 66,
      height: 58,
    },
  });

export default BnbList;