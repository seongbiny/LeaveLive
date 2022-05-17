import styled from 'styled-components';
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { KakaoLoginRequest } from '../../api/user';
import Header from '../../components/Header';

declare global {
  interface Window {
    kakao: any;
  }
}

function Map() {
  const router = useRouter();
  let latitude: any = router.query.latitude;
  let longitude: any = router.query.longitude;
  let tag: any = router.query.tag;

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


        const locPosition = new window.kakao.maps.LatLng(latitude, longitude);
        const message = '<div style="padding:5px;">여기에 계신가요?!</div>';
        currMarker(locPosition, message);
        
        const sw = new window.kakao.maps.LatLng(latitude-0.02, longitude-0.02);
        const ne = new window.kakao.maps.LatLng(Number(latitude)+0.02, Number(longitude)+0.02);
        
        // console.log(typeof(latitude), longitude)
        // console.log(map.getBounds().getNorthEast())
        // console.log(map.getBounds().getSouthWest())
        // console.log(sw)
        // console.log(ne)
        var test = new window.kakao.maps.LatLng(36, 127);
        var test2 = new window.kakao.maps.LatLng(37, 128);

        var tbounds = new window.kakao.maps.LatLngBounds(test, test2);
        console.log(tbounds)
        let ttbound = new window.kakao.maps.LatLngBounds(sw, ne);
        console.log(ttbound)
        // 장소 검색 객체를 생성
        const ps = new window.kakao.maps.services.Places(map);
        ps.categorySearch(`${tag}`, placesSearchCB, {
          useMapBounds:true,
          location: new window.kakao.maps.LatLng(latitude, longitude),
          // radius: 10000,
          bounds: new window.kakao.maps.LatLngBounds(sw, ne),
          page: 2
        }); 

        // 장소검색이 완료됐을 때 호출되는 콜백함수
        function placesSearchCB(data: any, status: any, pagination: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출
            console.log(data.length)
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
            position: new window.kakao.maps.LatLng(place.y, place.x),
          });
          const iwRemoveable = true;
          // 마커에 클릭이벤트를 등록합니다
          const infowindow = new window.kakao.maps.InfoWindow({
            removable: iwRemoveable
          })
          window.kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            const content = '<div style="padding:5px;z-index:1;" class="marker-title">' + place.place_name + '</div>';
            infowindow.setContent(content);
            infowindow.open(map, marker);
          });
        }

        function currMarker(locPosition: any, message: any) {
          let marker = new window.kakao.maps.Marker({
            map: map,
            position: locPosition,
            image: new window.kakao.maps.MarkerImage('https://i1.daumcdn.net/dmaps/apis/n_local_blit_04.png', new window.kakao.maps.Size(31, 35))
          });
          const iwContent = message;
          const iwRemoveable = true;
          const infowindow = new window.kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable
          })
          infowindow.open(map, marker);
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



        // const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
        // const marker = new window.kakao.maps.Marker({
        //   position: markerPosition,
        // });

        // marker.setMap(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [latitude, longitude]);

  return (
    <>
      <Header title='편의시설' />
      <MapContainer id="map" />
    </>
  );
}

const MapContainer = styled.div`
  // aspect-ratio: 320 / 220;
  width: 100%;
  display: inline-block;
  height: 100%;
`;

export default Map;