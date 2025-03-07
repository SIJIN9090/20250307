import axios from "axios";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { HttpHeadersContext, AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";

function Comment({ reviewId, comment, getCommentList }) {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const commentId = comment.id;

  const deleteComment = async () => {
    try {
      const response = await axios.delete(`/api/comment/${commentId}`, {
        headers: headers,
      });
      console.log(response.data);
      if (response.data.status == 200) {
        console.log("댓글 삭제 완료");
      }
      getCommentList();
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });
  }, []);
  return (
    <Container>
      <CommentBox>
        <Table>
          <tbody>
            <tr>
              <Td>{comment.nickName}</Td>
            </tr>
            <tr>
              <Td>{comment.content}</Td>
            </tr>
            <tr>
              <Td>{comment.createdDate}</Td>
            </tr>
          </tbody>
        </Table>

        <BtnBox>
          <Btn onClick={deleteComment}>삭제</Btn>
        </BtnBox>
      </CommentBox>
    </Container>
  );
}

// 스타일 정의
const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentBox = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 10px;
`;

const Table = styled.table`
  width: 100%;
`;

const Td = styled.td`
  padding: 5px;
  font-size: 14px;
`;

const BtnBox = styled.div`
  display: flex;
  gap: 10px;
`;

const Btn = styled.button`
  width: 50px;
  height: 30px;
  border: 1px solid #111111;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

export default Comment;
