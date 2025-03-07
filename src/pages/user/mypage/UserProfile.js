import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

function UserProfile() {
  // 강사 수정(네비)
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  return (
    <ProfileContainer>
      {/*내 프로필_타이틀*/}
      <LoginBox>
        <LoginTitle>내 프로필</LoginTitle>
        <LoginSub>회원 정보 및 반려동물 정보를 확인하세요.</LoginSub>
      </LoginBox>
      <TableBase>
        <thead>
          <tr>
            <TableHeader colSpan="2">회원 정보</TableHeader>
          </tr>
        </thead>
        <tbody>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableData>김김김</TableData>
          </TableRow>
          <TableRow>
            <TableHead>닉네임</TableHead>
            <TableData>믹믹믹</TableData>
          </TableRow>
          <TableRow>
            <TableHead>주소</TableHead>
            <TableData>우리집</TableData>
          </TableRow>
          <TableRow>
            <TableHead>휴대폰번호</TableHead>
            <TableData>000-0000-0000</TableData>
          </TableRow>
        </tbody>
      </TableBase>
      <TableBase>
        <thead>
          <tr>
            <TableHeader colSpan="2">반려동물 정보</TableHeader>
          </tr>
        </thead>
        <tbody>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableData>김김김</TableData>
          </TableRow>
          <TableRow>
            <TableHead>종류</TableHead>
            <TableData>고양이</TableData>
          </TableRow>
          <TableRow>
            <TableHead>나이</TableHead>
            <TableData>11</TableData>
          </TableRow>
          <TableRow>
            <TableHead>무게</TableHead>
            <TableData>5.2kg</TableData>
          </TableRow>
        </tbody>
      </TableBase>
      {/* 버튼*/}
      <AnimalBoxButton>
        <button
          onClick={() => {
            navigate(`/mypage`);
          }}
        >
          이전
        </button>
        <button
          onClick={() => {
            navigate(`/mypage`);
          }}
        >
          확인
        </button>
      </AnimalBoxButton>{" "}
    </ProfileContainer>
  );
}

//반려동물정보 - 삭제/추가
const AnimalBoxButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  margin-top: 55px;

  button {
    color: #0d326f;
    border: 1px solid #0d326f;
    transition: color 0.3s, background-color 0.3s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 180px;
    height: 54px;
    padding: 0 31.5px;
    font-weight: 500;
    font-size: 15.3px;
    text-align: center;
    border-radius: 80px;
    margin-right: 20px;

    &:hover {
      background-color: #0d326f;
      color: #fff;
    }
  }
`;

const ProfileContainer = styled.div`
  margin: 0 auto;
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 80px;
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

//
const TableBase = styled.table`
  width: 900px;
  margin: 0 auto;
  border-collapse: collapse;
  //border: 1px solid #ddd;
  //box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 65px;
`;

const TableHeader = styled.th`
  font-size: 18px;
  text-align: center;
  color: #fff;
  font-weight: 400;
  padding: 12px;
  background-color: #0d326f;
  outline: 1px solid #5e89d5;
`;

const TableRow = styled.tr`
  border: 1px solid #ddd;
  &:nth-child(even) {
    background-color: #f4f4f4;
  }
`;

const TableHead = styled.th`
  color: #111;
  font-weight: 400;
  font-size: 14px;
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
  width: 400px;
`;

const TableData = styled.td`
  color: #111;
  font-weight: 400;
  font-size: 14px;
  padding: 10px;
  text-align: center;
  width: 600px;
  //border: 1px solid ;
`;

export default UserProfile;
