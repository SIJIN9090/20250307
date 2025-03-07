import React, { useState } from "react";
import styled from "styled-components";
import my_0 from "../../../assets/imgs/my_0.svg";
import my_1 from "../../../assets/imgs/my_1.svg";
import my_2 from "../../../assets/imgs/my_2.svg";

import { Link, useNavigate } from "react-router-dom";

//MyPage
function MyPage() {
  const [page, setPage] = useState("1");

  // 강사 수정(네비)
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  //return
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
        <MyPageButton
          onClick={() => {
            navigate(`/mypage/UserProfile`);
          }}
        >
          <Article>
            <div className="ico">
              <img src={my_0} alt="my_0" />
            </div>
            <p className="tit">내 프로필</p>
            <p className="tix">회원 정보, 반려동물 정보</p>
          </Article>
        </MyPageButton>

        {/*2.UserUpdate - 화원정보 수정*/}
        <MyPageButton
          onClick={() => {
            navigate(`/mypage/UserUpdate`);
          }}
        >
          <Article>
            <div className="ico">
              <img src={my_1} alt="my_1" />
            </div>
            <p className="tit">내 정보 관리</p>
            <p className="tix">회원정보 수정, 반려동물 추가</p>
          </Article>
        </MyPageButton>

        {/*3.ReservationCheck - 예약확인*/}
        <MyPageButton
          onClick={() => {
            navigate(`/mypage/ReservationCheck`);
          }}
        >
          <Article>
            <div className="ico">
              <img src={my_2} alt="my_2" />
            </div>
            <p className="tit">예약조회</p>
            <p className="tix">진료예약 확인, 진료예약 취소</p>
          </Article>
        </MyPageButton>

        {/*<MyPageButton className="middle" onClick={() => setPage('2')}>회원정보수정</MyPageButton>*/}
        {/*<MyPageButton onClick={() => setPage('3')}>예약확인</MyPageButton>*/}
      </ButtonContainer>

      {/*<MyPageContentBox>*/}
      {/*  {page === '1' && <UserProfile />}*/}
      {/*  {page === '2' && <UserUpdate />}*/}
      {/*  {page === '3' && <ReservationCheck />}*/}
      {/*</MyPageContentBox>*/}
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

export default MyPage;
