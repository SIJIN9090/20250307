import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function AdminCounselAnswer() {
  const location = useLocation();
  const { questionId } = useParams();
  const isAdmin = location.pathname.includes("/admin"); // 어드민 여부 확인
  const token = localStorage.getItem("access_token");

  const [content, setContent] = useState(""); // 답변 내용
  const [answerId, setAnswerId] = useState(null); // 기존 답변 ID
  const [isRegistered, setIsRegistered] = useState(false); // 답변 여부 체크

  useEffect(() => {
    if (questionId) {
      fetchAnswer();

      // localStorage에서 기존 답변을 불러오기
      const savedAnswer = localStorage.getItem(`answer_${questionId}`);
      if (savedAnswer) {
        const { content, answerId, isRegistered } = JSON.parse(savedAnswer);
        setContent(content);
        setAnswerId(answerId);
        setIsRegistered(isRegistered);
      }
    }
  }, [questionId]);

  // 기존 답변 조회
  const fetchAnswer = async () => {
    try {
      const response = await axios.get(
        `/api/question/${questionId}/answer/${answerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
          },
        }
      );

      if (response.data) {
        setContent(response.data.content);
        setAnswerId(response.data.id);
        setIsRegistered(true);
      } else {
        // 답변이 없을 경우에는 아무 작업도 하지 않음
        setIsRegistered(false);
        setContent(""); // 답변이 없다면 내용도 초기화
        setAnswerId(null);
      }
    } catch (error) {
      console.error("답변 불러오기 실패:", error);
      // 알람을 띄우지 않음
    }
  };

  // 답변 등록
  const handleRegister = async () => {
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `/api/admin/question/${questionId}/answer`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
          },
        }
      );
      setAnswerId(response.data.id);
      setIsRegistered(true);

      // localStorage에 답변 등록 정보 저장
      localStorage.setItem(
        `answer_${questionId}`,
        JSON.stringify({
          content: response.data.content,
          answerId: response.data.id,
          isRegistered: true,
        })
      );

      alert("답변이 등록되었습니다.");
    } catch (error) {
      console.error("답변 등록 실패:", error);
      alert("답변 등록에 실패했습니다.");
    }
  };
  // 답변 수정
  const handleUpdate = async () => {
    if (!answerId) return;

    try {
      await axios.put(
        `/api/admin/${answerId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
          },
        }
      );

      // 수정된 내용 localStorage에 저장
      localStorage.setItem(
        `answer_${questionId}`,
        JSON.stringify({
          content,
          answerId,
          isRegistered: true,
        })
      );

      alert("답변이 수정되었습니다.");
    } catch (error) {
      console.error("답변 수정 실패:", error);
      alert("답변 수정에 실패했습니다.");
    }
  };
  // 답변 삭제
  const handleDelete = async () => {
    if (!answerId) return;

    try {
      await axios.delete(`/api/admin/${answerId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
        },
      });
      setContent("");
      setIsRegistered(false);
      setAnswerId(null);

      // 삭제된 내용 localStorage에서 제거
      localStorage.removeItem(`answer_${questionId}`);

      alert("답변이 삭제되었습니다.");
    } catch (error) {
      console.error("답변 삭제 실패:", error);
      alert("답변 삭제에 실패했습니다.");
    }
  };
  return (
    <NoticeContainer>
      <h2>상담 답변</h2>
      <NoticeSection>
        <div>
          <label>내용</label>
          {isAdmin ? (
            <textarea
              rows="3"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <p>{isRegistered ? content : "아직 답변이 등록되지 않았습니다."}</p>
          )}
        </div>
      </NoticeSection>

      {isAdmin && (
        <WriteBox>
          {!isRegistered ? (
            <Button onClick={handleRegister}>등록</Button>
          ) : (
            <>
              <Button onClick={handleUpdate}>수정</Button>
              <Button onClick={handleDelete}>삭제</Button>
            </>
          )}
        </WriteBox>
      )}
    </NoticeContainer>
  );
}
const NoticeContainer = styled.div`
  margin: auto;
  display: block;
  width: 1000px;
  height: auto;
  position: relative;
`;

const NoticeSection = styled.div`
  margin: auto;
  display: block;
  width: 1000px;
  height: auto;
  position: relative;
  div {
    background-color: #f4f4f4;
    width: 1000px;
    padding: 10px;
  }
  textarea {
    width: 100%;
    height: 100px;
    resize: none;
  }
`;

const WriteBox = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #111111;
  color: white;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #333333;
  }
`;

export default AdminCounselAnswer;
