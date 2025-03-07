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
  background-color: #111111;
  color: white;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #111111;
  }
`;
export default Back;
