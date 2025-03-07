import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
function List({ postType }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCancelClick = () => {
    switch (postType) {
      case 1:
        navigate("/admin/notice"); // 공지사항 관리 페이지로 이동
        break;
      case 2:
        // 질문 관리 페이지 (어드민과 일반 페이지 구분)
        if (location.pathname.includes("/admin")) {
          navigate("/admin/question"); // 어드민 질문 관리 페이지로 이동
        } else {
          navigate("/question"); // 일반 질문 페이지로 이동
        }
        break;
      case 3:
        // 리뷰 관리 페이지 (어드민과 일반 페이지 구분)
        if (location.pathname.includes("/admin")) {
          navigate("/admin/review"); // 어드민 리뷰 관리 페이지로 이동
        } else {
          navigate("/review"); // 일반 리뷰 페이지로 이동
        }
        break;
      default:
        console.warn("Invalid postType:", postType); // 예외 처리
        alert("잘못된 페이지 요청입니다.");
    }
  };
  return <Button onClick={handleCancelClick}>목록</Button>;
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

export default List;
