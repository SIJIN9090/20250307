import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import styled from "styled-components";

function FindId() {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [emailFound, setEmailFound] = useState(""); // 찾은 이메일 저장
  const [isEmailVisible, setIsEmailVisible] = useState(false); // 이메일 표시 여부
  const [error, setError] = useState(""); // 에러 메시지 상태 추가
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const handleFindEmail = async () => {
    setError("");
    setIsLoading(true);

    if (!name || !phoneNum) {
      setError("이름과 전화번호를 모두 입력해주세요.");
      setIsLoading(false);
      return;
    }

    console.log("Request data: ", { name, phoneNum }); // 데이터 확인용 로그

    try {
      const response = await fetch("/api/findId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phoneNum }),
      });

      if (!response.ok) {
        const errorDetails = await response.text(); // 오류 메시지 받기
        throw new Error(`아이디를 찾을 수 없습니다. ${errorDetails}`);
      }
      const data = await response.text();
      console.log("Response data: ", data); // 백엔드 응답 확인용 로그

      const email = data.replace("귀하의 이메일 입니다. : ", "");
      setEmailFound(email);
      setIsEmailVisible(true);
    } catch (err) {
      setError(err.message);
      setIsEmailVisible(false);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (value) => {
    // 하이픈 자동 삽입
    const cleaned = value.replace(/[^\d]/g, ""); // 숫자만 남기기
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handlePhoneNumChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhoneNum(formattedPhone);
  };

  return (
    <FindIdContainer>
      <FindIdBox>
        <FindIdTitle>아이디 찾기</FindIdTitle>
        <FindIdSub>
          이름과 전화번호를 입력하면 이메일을 찾을 수 있습니다.
        </FindIdSub>
      </FindIdBox>
      <FindIdSection>
        <div className="logo_t">응급 24시 하이펫 반려동물 전문 메디컬센터</div>
        <FindiIdInput>
          <div>
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="전화번호"
              value={phoneNum}
              onChange={handlePhoneNumChange}
            ></input>
          </div>
        </FindiIdInput>

        {error && <ErrorSection>{error}</ErrorSection>}
        {isEmailVisible && (
          <FoundEmailSection>
            <p>찾은 이메일 - {emailFound} - 입니다</p>
          </FoundEmailSection>
        )}

        <PwFind>
          <Link to="/findPw">
            <h6>비밀번호찾기 </h6>
          </Link>
        </PwFind>

        <CheckBox>
          <button onClick={handleFindEmail}>확인</button>
        </CheckBox>
      </FindIdSection>
    </FindIdContainer>
  );
}

const FindIdContainer = styled.div`
  width: 1920px;
  min-height: 500px;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ----------------------------------------------------------------------------------

const FindIdBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  pointer-events: none;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const FindIdTitle = styled.h1`
  font-weight: 700;
  line-height: 1.3em;
  font-size: 42px;
  color: #111;
`;

const FindIdSub = styled.p`
  display: block;
  margin-top: 1.5em;
  color: #888888;
  font-size: 14px;
  text-align: center;
`;

const FindIdSection = styled.div`
  max-width: 1280px;
  background-color: #f5f7f9;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 65px 0px;
  width: 800px;

  .logo_t {
    font-size: 24px;
    font-weight: 700;
    color: #0d326f;
    text-align: center;
    //font-family: "Montserrat", serif;
  }
`;

const FindiIdInput = styled.div`
  margin-top: 60px;
  width: 450px;
  box-sizing: border-box;
  text-align: center;

  input {
    margin-bottom: 15px;
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
`;

const FoundEmailSection = styled.div`
  margin: 20px;
  text-align: center;

  p {
    font-size: 18px;
    color: #111111;
  }
`;

const PwFind = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #888888;
  width: 420px;
  height: 23px;
  text-align: center;
  margin: 0 auto;
  padding: 30px 40px 20px 40px;
  margin-bottom: 25px;
`;
const CheckBox = styled.div`
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
  margin-bottom: 85px;
  text-align: center;

  &:hover {
    border: 1px solid #ffa228;
    background-color: #ffa228;
  }
`;
const ErrorSection = styled.div`
  color: red;
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
`;

export default FindId;
