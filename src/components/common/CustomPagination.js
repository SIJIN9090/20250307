import React from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";

function CustomPagination({ page, setPage, pageSize, totalPages, totalCnt }) {
  // 페이지 변경 처리
  const changePage = (page) => {
    setPage(page);
  };
  return (
    <Container>
      <PaginationBox>
        <Pagination
          className="pagination"
          activePage={page}
          itemsCountPerPage={pageSize}
          totalItemsCount={totalCnt}
          pageRangeDisplayed={totalPages}
          prevPageText={"<"}
          nextPageText={">"}
          onChange={changePage}
        />
      </PaginationBox>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export default CustomPagination;
