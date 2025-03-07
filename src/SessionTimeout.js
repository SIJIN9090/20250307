import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context"; // AuthContext import

const SessionTimeout = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const TIMEOUT_DURATION = 30 * 60 * 1000; // 30분 (밀리초 단위)

  useEffect(() => {
    const updateActivity = () => {
      setLastActivity(Date.now());
    };

    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("click", updateActivity);
    window.addEventListener("scroll", updateActivity);

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      if (auth?.access_token && currentTime - lastActivity > TIMEOUT_DURATION) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("nick_name");
        setAuth(null);

        alert(
          "장시간 활동이 없어 자동 로그아웃 되었습니다. 다시 로그인해주세요."
        );
        navigate("/signIn");
      }
    }, 60000); // 1분마다 체크

    return () => {
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("scroll", updateActivity);
      clearInterval(intervalId);
    };
  }, [auth, lastActivity, navigate, setAuth]);

  return null;
};

export default SessionTimeout;
