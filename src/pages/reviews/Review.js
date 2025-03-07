import React, { lazy, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CommonTable from "../../components/common/CommonTable";
import CustomPagination from "../../components/common/CustomPagination";
import { AuthContext, HttpHeadersContext } from "../../context";
import WriteGo from "../../components/button/WriteGo";

function Review() {
  const [bbsList, setBbsList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCnt, setTotalCnt] = useState(0);
  const [role, setRole] = useState(null); // 역할을 state로 설정
  const [linkValue, setLinkValue] = useState("/review");

  const columns = [
    { label: "No", field: "id" },
    { label: "제목", field: "title", link: true },
    { label: "작성자", field: "nickName" },
    { label: "작성일", field: "createdDate" },
    { label: "조회수", field: "views" },
    { label: "좋아요", field: "likes" },
  ];

  useEffect(() => {
    if (window.location.pathname.includes("/admin")) {
      setLinkValue("/admin/review"); // "/admin/question"으로 설정
    } else {
      setLinkValue("/review"); // "/question"으로 설정
    }
  }, []); // 컴포넌트가 처음 렌더링될 때 한번만 실행

  const getBbsList = async (page) => {
    try {
      const response = await axios.get("/api/review", {
        params: { page: page - 1 },
      });
      console.log(response.data);
      setBbsList(response.data.content || []); // 응답이 없을 경우 빈 배열 처리
      setPageSize(response.data.pageSize || 10);
      setTotalCnt(response.data.totalElements);
    } catch (error) {
      console.error("Error fetching board data:", error);
    }
  };
  useEffect(() => {
    getBbsList(page);
  }, [page]);

  const addEmptyRows = (data) => {
    const rowsWithEmpty = [];
    data.forEach((item) => {
      rowsWithEmpty.push({}); // 빈 데이터 행 추가 (공백 행)
      rowsWithEmpty.push(item); // 데이터 행 추가
    });
    return rowsWithEmpty;
  };
  const bbsListWithEmptyRows = addEmptyRows(bbsList);

  return (
    <Container>
      <ContentWrapper>
        <CommonTable
          bbsList={bbsListWithEmptyRows}
          columns={columns}
          linkPrefix={linkValue}
        />
        <PaginationBox>
          <CustomPagination
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            totalCnt={totalCnt}
          />
        </PaginationBox>
        <WriteGo />
      </ContentWrapper>
    </Container>
  );
}

// 스타일 컴포넌트들
const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 100px;
  text-align: left;
  h1 {
    font-weight: bold;
    font-size: 36px;
    font-family: "Noto Sans KR", serif;
  }
`;

const PaginationBox = styled.div`
  padding: 10px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 50px;
  background-color: #ffffff;
  flex-direction: row;

  .pagination {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  .pagination li {
    display: inline-block;
    margin: 0 5px;
  }
`;

const WriteBtn = styled.button`
  width: 50px;
  height: 30px;
  font-weight: 400;
  font-size: 16px;
  font-family: "Noto Sans KR", serif;
  background-color: #f4f4f4;
  border: 1px solid #111111;
`;

const WriteBtnBox = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: end;
  margin-top: 30px;
`;

export default Review;
