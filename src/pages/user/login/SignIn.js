import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { AuthContext, HttpHeadersContext } from "../../../context";
import one from "../../../assets/imgs/one.svg";
import google from "../../../assets/imgs/google_login.svg";
import naverLogin from "../../../assets/imgs/naver_login.svg";

function SignIn() {
  const { setAuth } = useContext(AuthContext);
  const { setHeaders } = useContext(HttpHeadersContext);

  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const changeId = (event) => {
    setId(event.target.value);
  };

  const changePwd = (event) => {
    setPwd(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  useEffect(() => {
    // 페이지 새로고침 시, 토큰과 닉네임을 localStorage에서 가져오기
    const token = localStorage.getItem("access_token") || "";
    const nickName = localStorage.getItem("nick_name") || "";

    if (token && nickName) {
      setAuth({ nick_name: nickName, access_token: token });

      // 헤더 설정
      setHeaders({ Authorization: `Bearer ${token}` });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      // 토큰 또는 닉네임이 없으면 로그인 상태 해제
      setAuth(null);
    }
  }, [setAuth, setHeaders]); // setHeaders를 의존성 배열에 추가

  const login = async () => {
    const req = {
      email: id,
      password: pwd,
    };

    try {
      const resp = await axios.post("/api/login", req);
      console.log("Login OK");
      console.log(resp.data);

      alert(resp.data.nickName + "님, 성공적으로 로그인 되었습니다요");

      // JWT 토큰 저장
      localStorage.setItem("access_token", resp.data.token);
      localStorage.setItem("nick_name", resp.data.nickName);

      // 상태 업데이트
      setAuth({ nick_name: resp.data.nickName, access_token: resp.data.token });

      // axios 인스턴스에 헤더 설정
      setHeaders({ Authorization: `Bearer ${resp.data.token}` });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${resp.data.token}`;

      navigate("/"); // 로그인 후 홈으로 리다이렉트
    } catch (e) {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
      console.error("Error Details:", e);
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <LoginTitle>로그인</LoginTitle>
        <LoginSub>
          하이펫 홈페이지에 방문해주신 여러분 진심으로 환영합니다
        </LoginSub>
      </LoginBox>

      <LoginSection>
        {/*<div className="logo_t">Hi Pet,&nbsp; Animal Medical Center</div>*/}
        <div className="logo_t">응급 24시 하이펫 반려동물 전문 메디컬센터</div>

        <InputBox>
          <input
            type="text"
            placeholder="아이디를 입력해주세요."
            value={id}
            onChange={changeId}
            logo_t
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={pwd}
            onChange={changePwd}
            onKeyDown={handleKeyDown}
          />
        </InputBox>

        {/* 로그인 버튼*/}
        <SignInButton onClick={login}>로그인</SignInButton>

        {/* 회원가입/아이디찾기/비밀번호찾기*/}
        <LoginArticle>
          <Signup>
            <Link to="/signup">회원가입</Link>
            <img src={one} alt="one" />
          </Signup>

          <IdFind>
            <Link to="/findId">아이디 찾기</Link>
            <img src={one} alt="one" />
          </IdFind>

          <PwFind>
            <Link to="/findPw">비밀번호 찾기</Link>
          </PwFind>
        </LoginArticle>

        {/*SNS 간편 로그인*/}
        <Article>
          <div className="left"></div>
          <div className="sns">SNS 간편 로그인</div>
          <div className="right"></div>
        </Article>
        <Link to="http://localhost:8080/oauth2/authorization/google">
          <SignButton>
            <img src={google} alt="google" />
            구글 로그인
          </SignButton>
        </Link>
        <Link to="http://localhost:8080/oauth2/authorization/naver">
          <SignsButton>
            <img src={naverLogin} alt="naver" />
            네이버 로그인
          </SignsButton>
        </Link>
      </LoginSection>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  //height: 1040px;
  //margin: 0 auto;
  //display: flex;
  //flex-direction: column;
  //align-items: center;

  //

  //
  padding-bottom: 90px;
`;

// 1.로그인 문구_박스
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  pointer-events: none;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const LoginTitle = styled.h1`
  font-weight: 700;
  line-height: 1.3em;
  font-size: 42px;
  color: #111;
`;

const LoginSub = styled.p`
  display: block;
  margin-top: 1.5em;
  color: #888888;
  font-size: 14px;
  text-align: center;
`;

//02.로그인 전체 박스
const LoginSection = styled.div`
  max-width: 1280px;
  background-color: #f5f7f9;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 65px 0px;

  .logo_t {
    font-size: 24px;
    font-weight: 700;
    color: #0d326f;
    text-align: center;
    //font-family: "Montserrat", serif;
  }
`;

//3.로그인박스
const InputBox = styled.div`
  margin-top: 60px;
  width: 450px;
  box-sizing: border-box;
  text-align: center;

  input {
    width: 450px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 32px;
    border-radius: 5px;
    border: 1.5px solid #e0e0e0;
    background-color: #fff;
    outline: none;

    //
    font-size: 14.2px;
    color: #0d326f;
    font-weight: 400;
  }

  input:nth-child(2) {
    margin-top: 15px;
  }
`;

//4.로그인 버튼
const SignInButton = styled.button`
  margin-top: 45px;
  width: 450px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  border-radius: 5px;
  border: none;
  background-color: #0d326f;
  outline: none;

  color: #fff;
  font-weight: 500;
  font-size: 17px;
  margin-bottom: 45px;
  text-align: center;

  &:hover {
    border: 1px solid #ffa228;
    background-color: #ffa228;
  }
`;

//5.회원가입,아이디찾기,비밀번호찾기=부모박스
const LoginArticle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #888888;
  width: 420px;
  height: 23px;
  text-align: center;
  margin: 0 auto;
  padding: 20px 40px 20px 40px;
  margin-bottom: 45px;

  img {
    padding-left: 5px;
    padding-right: 5px;
    margin-bottom: 3px;
  }
`;

//5-1.회원가입
const Signup = styled.a`
  text-align: center;
  &:hover {
    color: #0d326f;
    font-weight: 600;
  }
`;

//5-2.아이디 찾기
const IdFind = styled.a`
  text-align: center;
  &:hover {
    color: #0d326f;
    font-weight: 600;
  }
`;

//5-3.비밀번호 찾기
const PwFind = styled.a`
  text-align: center;
  &:hover{
    color: #0D326F;
    font-weight: 600;
  };
  }
`;

//6-1. sns 간편 로그인
const Article = styled.div`
  position: relative;
  width: 470px;

  .sns {
    font-size: 12px;
    font-weight: 700;
    color: #888888;
    text-align: center;
    padding: 0px 20px 0px 5px;
  }
  .left {
    position: absolute;
    left: 20%;
    top: 50%;
    width: 25%;
    height: 1px;
    background-color: #e0e0e0;
    transform: translate(-50%, -50%);
  }
  .right {
    position: absolute;
    right: 0;
    top: 50%;
    width: 25%;
    height: 1px;
    background-color: #e0e0e0;
    transform: translate(-50%, -50%);
  }
`;

//6-2.구글 로그인(SNS)
const SignButton = styled.button`
  margin-top: 45px;
  width: 450px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  border: 1.5px solid #e0e0e0;
  background-color: #fff;
  outline: none;

  color: #888888;
  font-weight: 500;
  font-size: 15.2px;
  text-align: center;
  margin-bottom: 20px;
  position: relative;

  img {
    float: left;
    position: absolute;
    left: 0;
    margin-left: 20px;
  }

  &:hover {
    box-shadow: 0 0 10px 0 rgba(13, 50, 111, 0.15);
  }
`;
//6-3.네이버 로그인(SNS)
const SignsButton = styled.button`
  width: 450px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  border: 1.5px solid #e0e0e0;
  background-color: #03c75a;
  color: #fff;
  outline: none;

  font-weight: 500;
  font-size: 15.2px;
  text-align: center;
  margin-bottom: 45px;
  position: relative;

  img {
    float: left;
    position: absolute;
    left: 0;
    margin-left: 20px;
  }

  &:hover {
    box-shadow: 0 0 10px 0 rgba(13, 50, 111, 0.15);
  }
`;

export default SignIn;
