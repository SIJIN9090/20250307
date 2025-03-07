import { createContext, useState, useEffect } from "react";

// AuthContext: 인증 관련 상태 관리
export const AuthContext = createContext();

// HttpHeadersContext: HTTP 헤더 관리 (예: Authorization 헤더)
export const HttpHeadersContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const nickName = localStorage.getItem("nick_name") || ""; // null 방지
    const token = localStorage.getItem("access_token") || ""; // null 방지
    return { nick_name: nickName, access_token: token };
  });

  useEffect(() => {
    if (auth?.nick_name) {
      localStorage.setItem("nick_name", auth.nick_name);
    } else {
      localStorage.removeItem("nick_name"); // nick_name이 없으면 제거
    }

    if (auth?.access_token) {
      localStorage.setItem("access_token", auth.access_token);
    } else {
      localStorage.removeItem("access_token"); // access_token이 없으면 제거
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const HttpHeadersProvider = ({ children }) => {
  const [headers, setHeaders] = useState({});

  return (
    <HttpHeadersContext.Provider value={{ headers, setHeaders }}>
      {children}
    </HttpHeadersContext.Provider>
  );
};
