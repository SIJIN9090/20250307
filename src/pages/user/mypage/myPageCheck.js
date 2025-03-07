import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import my_0 from "../../../assets/imgs/my_0.svg";
import { AuthContext, HttpHeadersContext } from "../../../context";

function MyPageCheck() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  console.log(password);
  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });
    const nick_name = localStorage.getItem("nick_name");
    // 로그인한 사용자인지 체크
    if (!auth) {
      alert("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
      navigate(-1);
    }
  }, []);
  const getProfile = async () => {
    const req = {
      password: password,
    };
    await axios
      .post("/api/myPage", req, { headers: headers })
      .then((response) => {
        console.log("응답 데이터", response.data);
        const profile = response.data;
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <MyPageContainer>
      {/*마이페이지_타이틀*/}
      <LoginBox>
        <LoginTitle>마이페이지</LoginTitle>
        <LoginSub>
          마음으로 공감하는 반려동물 중심의 의료기관 하이 펫 메디컬 센터입니다.
        </LoginSub>
      </LoginBox>

      {/* 마이페이지_바디*/}
      <ButtonContainer>
        {/*1.UserProfile - 회원프로필*/}

        <Article>
          <div className="ico">
            <img src={my_0} alt="my_0" />
          </div>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={getProfile}>
            확인
          </button>
        </Article>
      </ButtonContainer>
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 90px;
`;

// 1.문구_박스
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 20vh;
  pointer-events: none;
  margin-top: 60px;
  margin-bottom: 30px;
`;
const LoginTitle = styled.h1`
  font-weight: 700;
  line-height: 1.3em;
  font-size: 42px;
  color: #111;
  text-align: center;
`;
const LoginSub = styled.p`
  display: block;
  margin-top: 1.5em;
  color: #888888;
  font-size: 14px;
  text-align: center;
`;

//2.전체 박스
const ButtonContainer = styled.div`
  width: 1280px;
  height: 324px;
  display: flex;
  justify-content: center;
  //
  //.middle{
  //  border:none;
  //  border-top:  1px solid #111111;
  //  border-bottom: 1px solid #111111;
  //
  //}
`;

const Article = styled.div`
  width: 319px;
  height: 324px;
  padding-top: 80px;
  background-color: #f5f7f9;
  border-radius: 2rem;
  text-align: center;
  position: relative;
  margin-right: 40px;

  .ico {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
  img {
    width: 77px;
    height: auto;
    cursor: pointer;
  }
  .tit {
    margin-top: 20px;
    font-size: 27px;
    font-weight: 600;
    color: #111;
    text-align: center;
    cursor: pointer;
  }
  .tix {
    margin-top: 15px;
    font-size: 15.3px;
    font-weight: 400;
    color: #888;
    text-align: center;
    cursor: pointer;
  }

  &:hover {
    box-shadow: 0 0 30px 0 rgba(13, 50, 111, 0.15);
  }
`;

//탭 스타일
const MyPageButton = styled.button`
  //width: 1440px;
  //height: 324px;
  //margin: 0 auto;
  //position: relative;
  //display: flex;
  //align-items: stretch;
  //justify-content: center;
`;

const MyPageContentBox = styled.div`
  width: 100%;
  max-width: 1280px;
  padding-left: 140px;
  padding-right: 140px;
  margin-bottom: 30px;
`;

export default MyPageCheck;
