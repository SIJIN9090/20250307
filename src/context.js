import { createContext, useState, useEffect } from "react";

// AuthContext: 인증 관련 상태 관리
export const AuthContext = createContext();

// HttpHeadersContext: HTTP 헤더 관리 (예: Authorization 헤더)
export const HttpHeadersContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const nickName = localStorage.getItem("nick_name");
    const token = localStorage.getItem("access_token");
    return { nick_name: nickName, access_token: token };
  });

  useEffect(() => {
    if (auth.nick_name) {
      localStorage.setItem("nick_name", auth.nick_name);
    }
    if (auth.access_token) {
      localStorage.setItem("access_token", auth.access_token);
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
