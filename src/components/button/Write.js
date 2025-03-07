import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Write({
  title,
  content,
  files,
  setTitle,
  setContent,
  setFiles,
  headers,
  postType,
  fileUpload, // fileUpload 함수 전달 받기
}) {
  const navigate = useNavigate(); // navigate 훅 추가

  // 공지사항 게시글 작성
  const createBbsForNotice = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const req = { title, content };

    try {
      const response = await axios.post("/api/admin/notice", req, { headers });
      console.log("게시글 등록 응답:", response); // 응답을 로그로 확인
      const noticeId = response.data.id;

      if (noticeId) {
        // 게시글 등록 성공 시 파일 업로드
        await fileUpload(noticeId); // 파일 업로드가 완료된 후 alert을 띄운다
        alert("새로운 공지사항 게시글을 성공적으로 등록했습니다 :D");

        // 상태 리셋
        setTitle("");
        setContent("");
        setFiles([]);

        // 공지사항 목록 페이지로 이동
        navigate("/admin/notice");
      } else {
        alert("공지사항 게시글 등록에 실패했습니다.");
      }
    } catch (err) {
      console.error("공지사항 게시글 작성 오류:", err);
    }
  };

  // 질문 게시글 작성
  const createBbsForQuestion = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const req = { title, content };

    try {
      const response = await axios.post("/api/member/question", req, {
        headers,
      });
      const questionId = response.data.id;

      if (questionId) {
        alert("새로운 질문 게시글을 성공적으로 등록했습니다 :D");

        // 작성하는 페이지가 어드민 페이지일 경우 이동 경로 설정
        if (window.location.pathname.includes("/admin")) {
          navigate("/admin/question"); // 어드민 페이지로 이동
        } else {
          navigate("/question"); // 일반 사용자 질문 페이지로 이동
        }
      } else {
        alert("질문 게시글 등록에 실패했습니다.");
      }
    } catch (err) {
      console.error("질문 게시글 작성 오류:", err);
    }
  };
  const createBbsForAnswer = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const req = { title, content };

    try {
      const response = await axios.post("/api/member/review", req, { headers });
      const answerId = response.data.id;

      if (answerId) {
        alert("새로운 답변 게시글을 성공적으로 등록했습니다 :D");

        // 작성하는 페이지가 어드민 페이지일 경우 이동 경로 설정
        if (window.location.pathname.includes("/admin")) {
          navigate("/admin/review"); // 어드민 페이지로 이동
        } else {
          navigate("/review"); // 일반 사용자 답변 페이지로 이동
        }
      } else {
        alert("답변 게시글 등록에 실패했습니다.");
      }
    } catch (err) {
      console.error("답변 게시글 작성 오류:", err);
    }
  };

  const postTypeHandlers = {
    1: createBbsForNotice,
    2: createBbsForQuestion,
    3: createBbsForAnswer,
  };

  // handleSubmit 함수
  const handleSubmit = () => {
    const handler = postTypeHandlers[postType];
    if (handler) {
      handler(); // 해당하는 handler 실행
    } else {
      console.error("지원되지 않는 postType 값입니다.");
    }
  };
  return (
    <Button
      onClick={handleSubmit}
      disabled={!title || !content} // 제목이나 내용이 비어있으면 버튼 비활성화
    >
      작성 완료
    </Button>
  );
}

const Button = styled.button`
  padding: 10px 20px;
  border: none;

  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  background-color: #000; /* 검정색 배경 */
  color: white;
  margin-bottom: 50px;

  &:hover {
    background-color: #333; /* hover 시 더 어두운 검정색 */
  }
`;

export default Write;
