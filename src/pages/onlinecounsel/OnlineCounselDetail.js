import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext, HttpHeadersContext } from "../../context";
import File from "../file/File";
import Delete from "../../components/button/Delete";
import UpdateGo from "../../components/button/UpdateGo";
import List from "../../components/button/List";
import AdminCounselAnswer from "../admin/onlinecounsel/AdminCounselAnswer";

function QuestionDetail() {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const [question, setQuestion] = useState({});
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [postType, setPostType] = useState(2);

  const getBbsDetail = async () => {
    if (!questionId) {
      console.error("questionId가 존재하지 않습니다.");
      return; // questionId가 없으면 API 요청을 보내지 않음
    }

    try {
      const response = await axios.get(`/api/member/question/${questionId}`, {
        headers,
      });
      console.log("[questionDetail.js] getBbsDetail() success :D");
      console.log(response.data);
      setQuestion(response.data);
    } catch (error) {
      console.log("[questionDetail.js] getBbsDetail() error :<");
      console.error(error);
    }
  };

  useEffect(() => {
    if (!questionId) {
      console.error("questionId가 존재하지 않습니다.");
      return;
    }

    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });
    getBbsDetail();
  }, [questionId]); // questionId가 변경될 때마다 실행

  useEffect(() => {
    console.log("questionId:", questionId);
    if (!questionId) return;
    console.log("questionId:", questionId);
    getBbsDetail();
  }, []);
  return (
    <Container>
      <ContentWrapper>
        <TableBox>
          <Table>
            <tbody>
              <tr>
                <TableTitle>{question.title}</TableTitle>
              </tr>

              <tr>
                <TableContent>{question.content} </TableContent>
              </tr>
            </tbody>
          </Table>
        </TableBox>

        <coment>
          <AdminCounselAnswer />
        </coment>

        <BottomBox>
          <Delete />
          <UpdateGo />
          <List postType={postType} />
        </BottomBox>
      </ContentWrapper>
    </Container>
  );
}

// 컨테이너
const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 내부 콘텐츠
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

//  테이블 박스
const TableBox = styled.div`
  width: 100%;
  max-width: 1000px;

  margin-top: 20px;
`;

// 테이블
const Table = styled.table`
  width: 100%;

  border-collapse: separate;
  border-spacing: 10px 10px;
`;

// 입력 필드
const TableTitle = styled.td`
  width: 1000px;

  height: 40px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: medium;
  font-size: 20px;
  font-family: "Noto Sans KR", serif;
  margin-bottom: 30px;
`;

const TableContent = styled.td`
  width: 1000px;

  height: 400px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  font-weight: regular;
  font-size: 16px;
  font-family: "Noto Sans KR", serif;
`;

// 하단 버튼 박스
const BottomBox = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
`;

// 버튼 스타일
const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #111111;
  color: white;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #111111;
  }
`;

export default QuestionDetail;
