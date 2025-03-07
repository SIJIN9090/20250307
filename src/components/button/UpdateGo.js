import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { HttpHeadersContext } from "../../context"; // HttpHeadersContext import

function UpdateGo() {
  const { setHeaders } = useContext(HttpHeadersContext); // setHeaders 가져오기
  const { noticeId, questionId, reviewId } = useParams(); // useParams로 noticeId 받기
  const navigate = useNavigate();
  const location = useLocation();
  const [notice, setNotice] = useState(null); // notice 상태 추가
  const [question, setQuestion] = useState(null); // question 상태 추가
  const [review, setReview] = useState(null); // review 상태 추가

  // 게시글 상세 데이터를 가져오는 함수
  const getBbsDetail = async () => {
    try {
      const response = await axios.get(`/api/notice/${noticeId}`);
      setNotice(response.data); // 받아온 데이터를 notice 상태에 저장
    } catch (error) {
      console.error("getBbsDetail() error:", error);
    }
  };

  const getQuestionDetail = async () => {
    try {
      const response = await axios.get(`/api/question/${questionId}`);
      setQuestion(response.data); // 받아온 데이터를 question 상태에 저장
    } catch (error) {
      console.error("getQuestionDetail() error:", error);
    }
  };

  const getReviewDetail = async () => {
    try {
      const response = await axios.get(`/api/review/${reviewId}`);
      setReview(response.data); // 받아온 데이터를 review 상태에 저장
    } catch (error) {
      console.error("getReviewDetail() error:", error);
    }
  };

  useEffect(() => {
    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });

    // 각각의 API 호출
    if (noticeId) {
      getBbsDetail();
    }
    if (questionId) {
      getQuestionDetail();
    }
    if (reviewId) {
      getReviewDetail();
    }
  }, [noticeId, questionId, reviewId, setHeaders]);

  useEffect(() => {
    if (location.state) {
      setNotice(location.state.bbs); // location.state로 전달된 notice가 있으면 상태로 설정
      setQuestion(location.state.question); // location.state로 전달된 question이 있으면 상태로 설정
      setReview(location.state.review); // location.state로 전달된 review가 있으면 상태로 설정
    }
  }, [location.state]);

  const handleEditClick = () => {
    const isAdmin = location.pathname.includes("/admin"); // 어드민 여부 확인

    if (question) {
      navigate(`${isAdmin ? "/admin" : ""}/question/${noticeId}/update`, {
        state: { bbs: question },
      });
    } else if (review) {
      navigate(`${isAdmin ? "/admin" : ""}/review/${noticeId}/update`, {
        state: { bbs: review },
      });
    } else {
      navigate(`${isAdmin ? "/admin" : ""}/notice/${noticeId}/update`, {
        state: { bbs: notice },
      });
    }
  };

  return <Button onClick={handleEditClick}>수정</Button>;
}

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  background-color: #000; /* 검정색 배경 */
  color: white;

  &:hover {
    background-color: #333; /* hover 시 더 어두운 검정색 */
  }
`;

export default UpdateGo;
