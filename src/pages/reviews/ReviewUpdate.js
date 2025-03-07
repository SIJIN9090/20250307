import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Update from "../../components/button/Update";
import Back from "../../components/button/Back";

function ReviewUpdate() {
  const location = useLocation();
  const { bbs } = location.state || {};
  console.log(bbs);
  // const boardId = bbs.boardId;
  const [title, setTitle] = useState(bbs.title);
  const [content, setContent] = useState(bbs.content);
  const [pageNumber, setPageNumber] = useState(1);
  const reviewId = bbs?.id;
  const navigate = useNavigate();
  const update = async () => {
    try {
      const token = localStorage.getItem("access_token"); // 🔥 토큰 가져오기
      if (!token) {
        console.error("🚨 토큰이 없음! 로그인 상태 확인 필요");
        return;
      }

      await axios.patch(
        `/api/review/${bbs.id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 토큰 추가
          },
          withCredentials: true, // 쿠키 정보 포함 (백엔드가 필요하면 추가)
        }
      );

      alert("수정되었습니다.");
      window.location.href = "/review";
    } catch (error) {
      console.error("🚨 Error updating review:", error);
    }
  };

  //changeTitle
  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  //changeContent
  const changeContent = (event) => {
    setContent(event.target.value);
  };

  return (
    <Container>
      <ContentWrapper>
        <TableBox>
          <Table>
            <tbody>
              <tr>
                <td>
                  <TableTitle
                    type="text"
                    value={title}
                    onChange={changeTitle}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TableContent value={content} onChange={changeContent} />
                </td>
              </tr>
            </tbody>
          </Table>
        </TableBox>

        <BottomBox>
          <Update
            noticeId={reviewId}
            navigate={navigate}
            title={title}
            content={content}
          />
          <Back pageNumber={pageNumber} itemId={bbs.id} />
        </BottomBox>
      </ContentWrapper>
    </Container>
  );
}

//  컨테이너
const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//  내부 콘텐츠
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

//  테이블 박스
const TableBox = styled.div`
  width: 100%;
  margin-top: 20px;
`;

// 테이블
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

//  입력 필드
const TableTitle = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px;
  border: none;
  border-bottom: 1px solid #111111;
  font-size: 20px;
  font-weight: medium;
  font-family: "Noto Sans KR", serif;
  margin-bottom: 30px;

  outline: none;
`;

const TableContent = styled.textarea`
  width: 100%;
  min-height: 400px;
  padding: 5px;
  border: none;
  font-size: 16px;
  font-weight: 300;
  font-family: "Noto Sans KR", serif;
  border: none;
  border-bottom: 1px solid #111111;
  outline: none;
  resize: none;
  overflow-x: hidden;
`;

//  하단 버튼 박스
const BottomBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 100px;
`;

// 버튼 스타일
const Button = styled.button`
  width: 50px;
  height: 30px;
  font-weight: 400;
  font-size: 16px;
  font-family: "Noto Sans KR", serif;
  background-color: #f4f4f4;
  border: 1px solid #111111;
  margin-left: 20px;
`;
export default ReviewUpdate;
