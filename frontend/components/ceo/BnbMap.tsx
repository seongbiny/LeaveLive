import React, { useEffect } from "react";
import styled from "styled-components";

interface IPropTypes {
  address?: string;
  latitude: number;
  longitude: number;
}

const MapContainer = styled.div`
  aspect-ratio: 320 / 220;
`;

const BnbMap = ({ address, latitude, longitude }: IPropTypes) => {
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
            console.log(result[0]);
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
  }, []);

  return <MapContainer id="map" />;
};

export default BnbMap;
