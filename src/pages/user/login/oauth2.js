import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // react-router-dom v6 이상에서는 useNavigate 사용
import { jwtDecode } from "jwt-decode"; // jwt-decode 라이브러리 import
function OAuth2() {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 토큰 추출
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");

    let nickName = null;
    if (token) {
      try {
        // 토큰 디코딩
        const decodedToken = jwtDecode(token);
        console.log(decodedToken); // 디코딩된 토큰 내용 확인

        // email 속성이 존재하고 문자열인지 확인
        if (decodedToken.email && typeof decodedToken.email === "string") {
          nickName =
            "social_" +
            decodedToken.email.substring(0, decodedToken.email.indexOf("@"));
          console.log("생성된 닉네임:", nickName);
        } else {
          console.log("유효한 이메일 정보가 없습니다.");
          navigate("/login", { replace: true });
        }
        localStorage.setItem("nick_name", nickName);
        localStorage.setItem("access_token", token);
        navigate("/", { replace: true });
      } catch (e) {
        console.log("토큰 디코딩 오류:", e.message);
      }
    }
  }, [navigate]);

  return <div>로그인 중...</div>;
}

export default OAuth2;
