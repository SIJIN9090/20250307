import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext, HttpHeadersContext } from "../../context";
import Delete from "../../components/button/Delete";
import List from "../../components/button/List";
import CommentList from "../comment/CommentList";
import CommentWrite from "../comment/CommentWrite";
import UpdateGo from "../../components/button/UpdateGo";

function ReviewDetail() {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const [review, setReview] = useState({});
  const { reviewId } = useParams();
  const { member } = useContext(AuthContext); // AuthContext에서 member 객체 가져오기
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [postType, setPostType] = useState(3);

  const getBbsDetail = async () => {
    try {
      const response = await axios.get(`/api/review/${reviewId}`);

      console.log("[reviewDetail.js] getBbsDetail() success :D");
      console.log(response.data);

      setReview(response.data);
    } catch (error) {
      console.log("[reviewDetail.js] getBbsDetail() error :<");
      console.error(error);
    }
  };

  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });
    getBbsDetail();
  }, [reviewId]);

  return (
    <Container>
      <ContentWrapper>
        <TableBox>
          <Table>
            <tbody>
              <tr>
                <TableTitle>{review.title}</TableTitle>
              </tr>
              <tr>
                <TableContent>{review.content} </TableContent>
              </tr>
            </tbody>
          </Table>
        </TableBox>

        <CommentList reviewId={reviewId} comments={comments} />

        <CommentWrite reviewId={reviewId} />

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

export default ReviewDetail;
