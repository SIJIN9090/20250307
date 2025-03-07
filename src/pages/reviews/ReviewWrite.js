import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext, HttpHeadersContext } from "../../context";
import axios from "axios";
import List from "../../components/button/List";
import Write from "../../components/button/Write";

function ReviewWrite() {
  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState(3);

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeContent = (event) => {
    setContent(event.target.value);
  };


  useEffect(() => {
    console.log("access_token:", localStorage.getItem("access_token"));
    // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });

    // 로그인한 사용자인지 체크
    if (!auth) {
      alert("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
      navigate(-1);
    }
  }, []);

  return (
    <Container>
      <ContentWrapper>
        <Title>
          <h1>고객리뷰</h1>
        </Title>

        <TableBox>
          <Table>
            <tbody>
              <tr>
                <td>
                  <TableTitle
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={changeTitle}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TableContent
                    placeholder="내용"
                    value={content}
                    onChange={changeContent}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </TableBox>

        <BottomBox>
          <div>
            <Write
              title={title}
              content={content}
              setTitle={setTitle}
              setContent={setContent}
              headers={headers}
              postType={postType}
            />
            <List postType={postType} />
          </div>
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

//  제목 섹션
const Title = styled.div`
  margin-top: 100px;
  width: 100%;
  text-align: left;
  font-size: 36px;
  font-weight: bold;
  font-family: "Noto Sans KR", serif;
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

export default ReviewWrite;
