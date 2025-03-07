import axios from "axios";

// 이메일 중복 확인
export const idDuplicateCheck = async (id) => {
  try {
    const response = await axios.post(`/api/checkEmail?email=${id}`);
    if (response.status !== 200) {
      throw new Error("아이디 중복 확인 오류");
    }
    return response.data; // 성공한 경우 응답 데이터 반환
  } catch (error) {
    console.error("아이디 중복 확인 오류:", error);
    throw new Error("중복 확인 응답 오류");
  }
};

// 닉네임 중복 확인
export const nicknameDuplicateCheck = async (nickname) => {
  try {
    const response = await axios.post(
      `/api/checkNickName?nickName=${nickname}`
    );
    if (response.status !== 200) {
      throw new Error("닉네임 중복 확인 오류");
    }
    return response.data; // 성공한 경우 응답 데이터 반환
  } catch (error) {
    console.error("닉네임 중복 확인 오류:", error);
    throw new Error("중복 확인 응답 오류");
  }
};

// 인증 코드 전송
export const sendVerificationEmail = async (email) => {
  try {
    const response = await axios.post(
      "/api/email/send",
      {
        receiver: email,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status !== 200) {
      throw new Error("인증 코드 전송 실패");
    }
    return response.data; // 성공한 경우 응답 데이터 반환
  } catch (error) {
    console.error("인증 코드 전송 실패:", error);
    throw error; // 에러를 상위 함수로 전달
  }
};

// 인증 코드 검증
export const verifyEmailCode = async (email, code) => {
  try {
    const response = await axios.post(
      `/api/email/verify?receiver=${email}&code=${code}`
    );

    if (response.status !== 200) {
      throw new Error("메일 인증 실패");
    }
    const data = response.data;
    console.log("메일 인증 성공:", data); // 성공 메시지 출력
  } catch (error) {
    console.error("메일 인증 오류:", error);
    throw error;
  }
};
