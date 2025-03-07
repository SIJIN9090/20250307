import React, { useContext, useState } from "react";
import styled from "styled-components";

import { Link, useNavigate, useParams } from "react-router-dom";
import { HttpHeadersContext } from "../../context";
import axios from "axios";

function CommentWrite(props) {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const reviewId = props.reviewId;

  const nickName = localStorage.getItem("nick_name");

  const navigate = useNavigate();

  const [content, setContent] = useState("");

  const changeContent = (event) => {
    setContent(event.target.value);
  };

  const createComment = async () => {
    const req = {
      content: content,
    };
    console.log(req);

    await axios
      .post(`/api/review/${reviewId}/comment`, req, { headers: headers })
      .then((response) => {
        console.log("createComment success", response.data);
        alert("댓글을 등록하였습니다.");
        navigate(0);
      })
      .catch((error) => {
        console.log("createComment error", error);
      });
  };

  return (
    <Container>
      <CommentBox>
        <CommentInput value={content} onChange={changeContent} />

        <WriteBtn onClick={createComment}>작성</WriteBtn>
      </CommentBox>
    </Container>
  );
}

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
  padding 10px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  max-width: 900px;
  min-height: 50px;
  padding: 5px;
  font-size: 12px;
  font-weight: 300;
  font-family: "Noto Sans KR", serif;
  outline: none;
  resize: none;
  overflow-x: hidden;
`;

const WriteBtn = styled.button`
  width: 50px;
  height: 30px;
  border: 1px solid #111111;
`;

export default CommentWrite;
