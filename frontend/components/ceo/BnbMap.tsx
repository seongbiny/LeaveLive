import React, { CSSProperties, useEffect, useState } from "react";
import styled from "styled-components";

interface IPropTypes {
  address: string;
  // latitude: number;
  // longitude: number;
  style: CSSProperties;
}

const MapContainer = styled.div`
  aspect-ratio: 320 / 220;
`;

// props로 주소를 전달하면 전달된 주소의 위치를 띄워주는 맵 컴포넌트
const BnbMap = ({ address, style }: IPropTypes) => {
  // 기본 위치: 싸피 광주캠퍼스 (광주광역시 광산구 하남산단 6번로 107)
  const [longitude, setLongitude] = useState<number>(126.81043382380057); // 경도
  const [latitude, setLatitude] = useState<number>(35.209204369023425); // 위도

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&libraries=services&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        const getAddress = (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x
            );

            map.setCenter(coords);
          }
        };
        geocoder.addressSearch(address, getAddress);

        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [address]);

  return <MapContainer id="map" style={style} />;
};

export default BnbMap;
