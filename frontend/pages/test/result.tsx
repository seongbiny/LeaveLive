import React,{useState} from "react";
import { useRouter } from 'next/router'

const Result = () => {
  const router = useRouter();
  const result = router.query.region;
  return (
    <>
      <div>
        {result === '경상북도 포항' && <div>열정적이고 역동적인에너지가 가득한청춘여행 스타일~! 경상북도 포항</div>}
        {result === '제주도' && <div>유명한 관광지 여행을 좋아하는알짜배기 여행 스타일~! 제주도</div>}
        {result === '경상남도 거제' && <div>탁 트인 바다를 바라보며느긋하게 힐링하는 여행 스타일~! 경상남도 거제</div>}
        {result === '강원도 강릉' && <div>푸르른 산속의 맑은 공기와함께 여유를 즐기는 여행 스타일~! 강원도 강릉</div>}
        {result === '광주광역시' && <div>여행지의 이색적인 음식과역사를 즐기는 여행 스타일~! 광주광역시</div>}
        {result === '전라북도 전주' && <div>여행지 전통 본연의 맛과문화를 즐기는 여행 스타일~! 전라북도 전주</div>}
        {result === '충청남도 논산' && <div>느긋한 자연 속 힐링하는 여행 스타일! 근교나들이 충청남도 논산</div>}
        {result === '충청북도 청주' && <div>감성적이고 따뜻한 분위기를 즐기는 여행 스타일 충청북도 청주</div>}
      </div>
      <button onClick={() => {router.push(`/search/${result}`)}}>여행가기</button>
    </>
  )
};

export default Result;
