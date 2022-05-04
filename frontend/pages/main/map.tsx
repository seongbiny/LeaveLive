import styled from 'styled-components';
import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

function Map() {
  let latitude: number = 0;
  let longitude: number = 0;

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
    // mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&libraries=services&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOptions = {
          center: new window.kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
        // 지도 생성
        const map = new window.kakao.maps.Map(mapContainer, mapOptions);
        // 장소 검색 객체를 생성
        const ps = new window.kakao.maps.services.Places(map);
        ps.categorySearch('CE7', placesSearchCB, {useMapBounds:true}); 

        // 장소검색이 완료됐을 때 호출되는 콜백함수
        function placesSearchCB(data: any, status: any, pagination: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출
            for (var i=0; i<data.length; i++) {
              displayMarker(data[i])
            }   
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return;
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
          }
        }

        function displayMarker(place: any) {
          let marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(place.y, place.x)
          });
          // 마커에 클릭이벤트를 등록합니다
          window.kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            const content = '<div style="padding:5px;z-index:1;" class="marker-title">' + place.place_name + '</div>';
            infowindow.setContent(content);
            infowindow.open(map, marker);
  });
        }
  
        // function displayInfowindow(marker: any, title: string) {
        //   const content = '<div style="padding:5px;z-index:1;" class="marker-title">' + title + '</div>';
        //   infowindow.setContent(content);
        //   infowindow.open(map, marker);
        // }

        // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
        const infowindow = new window.kakao.maps.InfoWindow({zIndex:1});
        // const mapTypeControl = new window.kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        // map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPLEFT);
  
        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);



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