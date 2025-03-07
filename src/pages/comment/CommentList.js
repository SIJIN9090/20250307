import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import CustomPagination from "../../components/common/CustomPagination";

function CommentList(props) {
  const reviewId = props.reviewId;
  console.log(reviewId);

  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [pageSize, setPageSize] = useState(5); // 한 페이지당 댓글 수
  const [totalCnt, setTotalCnt] = useState(0); // 총 댓글 수
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [commentList, setCommentList] = useState([]); // 댓글 목록

  const getCommentListRef = useRef(null);

  // 댓글 목록 가져오는 함수
  const getCommentList = async () => {
    try {
      const response = await axios.get(`/api/review/${reviewId}/comment`, {
        params: { page: page - 1 },
      });
      console.log("CommentList success", response.data);

      setPageSize(response.data.pageSize || 5);
      setTotalCnt(response.data.totalElements); // 총 댓글 수 설정
      setTotalPages(response.data.totalPages); // 총 페이지 수 설정
      setCommentList(response.data.content); // 댓글 목록 설정
    } catch (error) {
      console.log("CommentList error", error);
    }
  };

  useEffect(() => {
    getCommentListRef.current = getCommentList;
    getCommentList(1); // 처음에는 첫 페이지의 댓글 목록을 가져옴
  }, [reviewId, page]);

  return (
    <Container>
      {commentList.length > 0 ? (
        <>
          {commentList.map((comment, index) => (
            <CommentBox key={index}>
              <Comment
                reviewId={reviewId}
                comment={comment}
                getCommentList={getCommentListRef.current}
              />
            </CommentBox>
          ))}
          <PaginationBox>
            <CustomPagination
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              totalCnt={totalCnt}
              totalPages={totalPages}
            />
          </PaginationBox>
        </>
      ) : (
        <NoComments>No comments available.</NoComments>
      )}
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
  padding: 10px;
`;

const NoComments = styled.div`
  font-size: 18px;
  color: #555;
  text-align: center;
  margin-top: 20px;
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

export default CommentList;
