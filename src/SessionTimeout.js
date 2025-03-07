import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context"; // AuthContext import

const SessionTimeout = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const TIMEOUT_DURATION = 30 * 60 * 1000; // 30분 (밀리초 단위)

  useEffect(() => {
    const updateActivity = () => setLastActivity(Date.now());

    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("click", updateActivity);
    window.addEventListener("scroll", updateActivity);

    // 서버 상태 확인 함수
    const checkServerStatus = async () => {
      try {
        const response = await fetch("http://localhost:3000/ping");
        if (!response.ok) throw new Error("서버 다운");
      } catch (error) {
        console.error("서버가 꺼짐:", error);
        forceLogout("서버가 중단되었습니다. 다시 로그인해주세요.");
      }
    };

    const intervalId = setInterval(() => {
      const currentTime = Date.now();

      if (auth && auth.access_token) {
        if (currentTime - lastActivity > TIMEOUT_DURATION) {
          forceLogout("장시간 활동이 없어 자동 로그아웃 되었습니다.");
        } else {
          checkServerStatus(); // 서버 상태 체크
        }
      }
    }, 60000);

    return () => {
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("scroll", updateActivity);
      clearInterval(intervalId);
    };
  }, [auth, lastActivity, navigate, setAuth]);

  const forceLogout = (message) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("nick_name");
    setAuth(null);
    alert(message);
    navigate("/signIn");
  };

  return null;
};

export default SessionTimeout;
