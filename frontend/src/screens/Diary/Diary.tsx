import React from "react";
import { View, Text, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DiaryParamList } from '../../navigations/UserStack/DiaryStack';
import styled from "styled-components/native";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import AntDesign from 'react-native-vector-icons/AntDesign'

type DiaryScreenNavigationProp = StackNavigationProp<DiaryParamList, "Diary">;
type Props = { navigation: DiaryScreenNavigationProp };

LocaleConfig.locales['en'] = {
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    monthNamesShort: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
  dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일', '월','화','수','목','금','토'],
//   today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'en'

const Diary = ({navigation}: Props) => {

    return (
    <Container>
        <StyledProfile>
            <Text>김당당</Text>
            <Button title="수정" onPress={() => navigation.navigate('Profile')} />
        </StyledProfile>
        <View style={{ paddingTop: 50, flex: 1 }}>
            <Calendar
                // 처음으로 선택되어질 날짜(현재날짜), Default = Date()
                current={'2022-04-27'}
                // 선택이 가능한 최소 날짜, 이 날짜 이전은 회색날짜로 표시됨, Default = undefined
                minDate={'2022-04-01'}
                // 선택이 가능한 최대 날짜, 이 날짜 이후는 회색날짜로 표시됨, Default = undefined
                maxDate={'2022-12-31'}
                // 날짜를 눌렀을 때 실행되는 함수, Default = undefined
                onDayPress={(day) => {console.log('selected day', day)}}
                // 날짜를 길게 눌렀을 때 실행되는 함수, Default = undefined
                onDayLongPress={(day) => {console.log('selected day', day)}}
                // 달력 제목에 표시될 월 형식, Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM'}
                // 달력에서 보이는 월이 바뀔때 실행되는 함수, Default = undefined
                onMonthChange={(month) => {console.log('month changed', month)}}
                // 달 이동 화살표 숨기기, Default = false
                hideArrows={false}
                // 기본 화살표를 커스텀화살표로 대체 (방향은 '왼쪽'이나 '오른쪽')
                // renderArrow={(direction) => (<Arrow/>)}
                renderArrow={(direction) => direction === "left" ? (
                    <AntDesign name="left" size={20} color="#50cebb" />
                    ) : (
                    <AntDesign name="right" size={20} color="#50cebb" />
                    )
                }
                // 이번 달 페이지에 다른 달 숫자를 보이지 않게 함, Default = false
                hideExtraDays={true}
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={7}
                // Hide day names. Default = false
                hideDayNames={false}
                // Show week numbers to the left. Default = false
                showWeekNumbers={false}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={subtractMonth => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
                disableArrowLeft={true}
                disableArrowRight={true}
                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays={true}
                /** 기본 월 및 연도 제목을 사용자 지정 제목으로 바꿈. 함수는 매개변수로 day를 받는다. */
                // 이 부분을 주석처리 해주었더니 달력이 보여졌다. 이유는 아직도 모르겠다,,
                // renderHeader={(date) => {Return JSX}}
                enableSwipeMonths={true}
            />
        </View>
    </Container>
    ) 
}

const Container = styled.View`
    // flex: 1;
    // justify-content: center;
    // align-items: center;
`;
const StyledProfile = styled.View`
    box-sizing: border;
    border: 1px solid;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`;

export default Diary;