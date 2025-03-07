import { Map, MapMarker } from "react-kakao-maps-sdk";
import React from "react";

function KakaoMap() {
  return (
    <Map
      center={{ lat: 37.48197988243028, lng: 126.89814204687781 }}
      style={{ width: "918px", height: "329px" }}
      level={3}
    >
      {/* 마커 추가 */}
      <MapMarker position={{ lat: 37.48197988243028, lng: 126.89814204687781 }}>
        <div style={markerStyle}>
          <strong>🏥 하이펫동물병원</strong>
        </div>
      </MapMarker>
    </Map>
  );
}

const markerStyle = {
  background: "#ffffff",
  padding: "10px 13px 9px 15px",
  borderRadius: "8px",

  color: "#333",
  fontSize: "14px",
  fontWeight: "bold",
  textAlign: "center",
  whiteSpace: "nowrap",
};

export default KakaoMap;
