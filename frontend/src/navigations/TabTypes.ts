// 사용자 탭 네비게이션
// Screen에 넘길 파라미터가 없으면 undefined, 있다면 파라미터 객체를 작성해 주세요!
export type UserTabParamList = {
  MainNavigator: undefined;
  Search: undefined;
  Camera: undefined;
  Bookmark: undefined;
  Diary: undefined;
};

// 사장님 탭 네비게이션
export type CeoTabParamList = {
  CeoMain: undefined;
  CeoBnbList: undefined;
  CeoReservationList: undefined;
};

// 탭 네비게이션 아이콘 props
export type TabBarIconProp = {
  focused: boolean;
  color: string;
  size: number;
};