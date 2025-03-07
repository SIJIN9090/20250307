import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { HttpHeadersContext } from "../../context";
import File from "../file/File";

import Delete from "../../components/button/Delete";
import UpdateGo from "../../components/button/UpdateGo";
import List from "../../components/button/List";

function NoticeDetail() {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const [notice, setNotice] = useState({});
  const { noticeId } = useParams();
  const location = useLocation();
  const shouldHideTitle = location.pathname.startsWith("/notice");
  const [postType, setPostType] = useState(1);
  const [files, setFiles] = useState([]); // 파일 상태와 setFiles 함수 정의

  const getBbsDetail = async () => {
    try {
      const response = await axios.get(`/api/notice/${noticeId}`);
      console.log("[NoticeDetail.js] getBbsDetail() success :D", response.data);

      setNotice(response.data);

      // 서버에서 받아온 파일 목록이 있는지 확인
      if (
        response.data.noticeFiles &&
        Array.isArray(response.data.noticeFiles)
      ) {
        setFiles(response.data.noticeFiles); // 파일 목록이 배열인 경우에만 설정
      } else {
        setFiles([]); // 파일 목록이 없으면 빈 배열로 설정
      }
    } catch (error) {
      console.log("[NoticeDetail.js] getBbsDetail() error :<", error);
    }
  };

  useEffect(() => {
    console.log("noticeId:", noticeId); // 콘솔로 확인
    if (!noticeId) return;

    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });

    getBbsDetail(); // noticeId가 있을 때만 데이터 요청
  }, [noticeId]);

  return (
    <Container>
      <ContentWrapper>
        <TableBox>
          <Table>
            <tbody>
              <tr>
                <TableTitle>{notice.title}</TableTitle>
              </tr>
              <tr>
                <td>
                  <File files={files} noticeId={noticeId} />
                </td>
              </tr>
              <tr>
                <TableContent>{notice.content}</TableContent>
              </tr>
            </tbody>
          </Table>
        </TableBox>

        <coment></coment>
        {!shouldHideTitle && (
          <BottomBox>
            <Delete />
            <UpdateGo />
            <List postType={postType} />
          </BottomBox>
        )}
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

export default NoticeDetail;
