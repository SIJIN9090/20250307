import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Back({ pageNumber, itemId }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // 이전 페이지로 이동
    navigate(-1); // -1로 이전 페이지로 이동
  };

  return <Button onClick={handleButtonClick}>뒤로 가기</Button>;
}
const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  background-color: #000; /* 검정색 배경 */
  color: white;
  margin-bottom: 50px;

  &:hover {
    background-color: #333; /* hover 시 더 어두운 검정색 */
  }
`;

export default Back;
