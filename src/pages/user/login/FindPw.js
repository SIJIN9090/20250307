import React, { useState, useEffect } from "react";

import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FindPassword() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const navigate = useNavigate();
  const handleSendCode = async () => {
    try {
      await axios.post("/api/findPw", { email });
      alert("인증 메일이 전송되었습니다.");
      setIsCodeSent(true);
    } catch (error) {
      alert(error.response?.data || "이메일 전송에 실패했습니다.");
    }
  };
  const handleVerifyCode = async () => {
    console.log("Email:", email);
    console.log("Verification Code:", verificationCode); // 입력된 인증코드 확인
    try {
      await axios.post("api/findPw/verify", { email, code: verificationCode });
      alert("인증번호가 확인되었습니다.");
      setIsCodeVerified(true);
      console.log("isCodeVerified 상태:", isCodeVerified); // 디버깅용 로그
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "잘못된 인증번호입니다.");
    }
  };
  const handleSubmit = async () => {
    if (newPassword !== newPasswordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (newPassword.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    if (!/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      alert("비밀번호는 문자와 숫자를 포함해야 합니다.");
      return;
    }

    try {
      await axios.post("api/findPw/resetPw", {
        email,
        code: verificationCode,
        newPassword,
        newPasswordCheck,
      });
      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/signIn"); // 로그인 화면으로 이동
    } catch (error) {
      alert(error.response?.data || "비밀번호 변경에 실패했습니다.");
    }
  };
  useEffect(() => {
    if (isCodeVerified) {
      // 인증번호가 확인되었을 때 비밀번호 창을 보여주는 로직
      console.log("isCodeVerified 상태:", isCodeVerified);
    }
  }, [isCodeVerified]);

  return (
    <FindPasswordContainer>
      <FindPwBox>
        <FindPwTitle>비밀번호 찾기</FindPwTitle>
        <FindPwSub>
          이메일을 인증하면 새로운 비밀번호를 입력 할 수 있습니다.
        </FindPwSub>
      </FindPwBox>

      <FindPasswordSection>
        <div className="logo_t">응급 24시 하이펫 반려동물 전문 메디컬센터</div>
        <FindInput>
          <div>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isCodeSent} // 발송 후 이메일 입력 비활성화
            />
            {!isCodeSent && <button onClick={handleSendCode}>발송</button>}
          </div>
        </FindInput>

        {isCodeSent && !isCodeVerified && (
          <VerificationSection>
            <div>
              <input
                type="text"
                placeholder="인증번호"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button onClick={handleVerifyCode}>인증번호 확인</button>
            </div>
          </VerificationSection>
        )}

        {isCodeVerified && (
          <PasswordSection>
            <div>
              <input
                type="password"
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="새 비밀번호 확인"
                value={newPasswordCheck}
                onChange={(e) => setNewPasswordCheck(e.target.value)}
              />
            </div>
          </PasswordSection>
        )}

        {isCodeVerified && (
          <CheckBox>
            <button onClick={handleSubmit}>확인</button>
          </CheckBox>
        )}
      </FindPasswordSection>
    </FindPasswordContainer>
  );
}

const FindPasswordContainer = styled.div`
  width: 1920px;
  min-height: 500px;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FindPwBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  pointer-events: none;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const FindPwTitle = styled.h1`
  font-weight: 700;
  line-height: 1.3em;
  font-size: 42px;
  color: #111;
`;

const FindPwSub = styled.p`
  display: block;
  margin-top: 1.5em;
  color: #888888;
  font-size: 14px;
  text-align: center;
`;

const FindPasswordSection = styled.div`
  max-width: 1280px;
  background-color: #f5f7f9;
  height: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const FindInput = styled.div`
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
    color:  #0D326F;
    font-weight: 400;
  }

  button{
   margin-top: 60px;
   width: 450px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  border-radius: 5px;
  border: none;
  background-color: #0D326F;
  outline: none;
  
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  margin-bottom: 85px;
  text-align: center;
  
  &:hover{
    border: 1px solid #FFA228;
    background-color: #FFA228;
  };
`;

const VerificationSection = styled.div`
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
    color:  #0D326F;
    font-weight: 400;
  }

  button{
   margin-top: 60px;
   width: 450px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  border-radius: 5px;
  border: none;
  background-color: #0D326F;
  outline: none;
  
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  margin-bottom: 85px;
  text-align: center;
  
  &:hover{
    border: 1px solid #FFA228;
    background-color: #FFA228;
  };
`;

const PasswordSection = styled.div`
  margin-top: 60px;
  width: 450px;
  box-sizing: border-box;
  text-align: center;
  

  input {
  margin-bottom:15px;
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
    color:  #0D326F;
    font-weight: 400;
  }
    

  button{
   margin-top: 60px;
   width: 450px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  border-radius: 5px;
  border: none;
  background-color: #0D326F;
  outline: none;
  
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  margin-bottom: 85px;
  text-align: center;
  
  &:hover{
    border: 1px solid #FFA228;
    background-color: #FFA228;
  };
`;

const CheckBox = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  width: 450px;

  button {
    width: 100%;
    height: 54px;
    border-radius: 5px;
    border: none;
    background-color: #0d326f;
    color: #fff;
    font-weight: 500;
    font-size: 17px;
    text-align: center;
    outline: none;
    cursor: pointer;

    &:hover {
      border: 1px solid #ffa228;
      background-color: #ffa228;
    }
  }
`;

export default FindPassword;
