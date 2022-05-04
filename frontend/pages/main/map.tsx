import styled from 'styled-components';
import { useEffect } from "react";
import { KakaoLoginRequest } from '../../api/user';

declare global {
  interface Window {
    kakao: any;
  }
}
// interface MapProps {
//   latitude: number;
//   longitude: number;
// }

// function Map({ latitude, longitude }: MapProps) {
function Map() {
  let latitude: number = 0;
  let longitude: number = 0;

  // let infowindow = new window.kakao.maps.InfoWindow({zIndex:1});

  // 현재 위치 경도 위도 얻는 함수
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords.latitude, position.coords.longitude);
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    });
  },[])

  // 현재 위치에 대한 맵 반환하는 함수
  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [latitude, longitude]);

  return (
    <MapContainer id="map" />
  );
}

const MapContainer = styled.div`
  // aspect-ratio: 320 / 220;
  width: 100%;
  display: inline-block;
  height: 100%;
`;

export default Map;