import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

function Delete() {
  const navigate = useNavigate();
  const { noticeId, questionId, reviewId } = useParams(); // reviewId 추가
  const location = useLocation();

  // 로컬 스토리지에서 access_token을 가져옵니다.
  const token = localStorage.getItem("access_token"); // 'access_token'은 로컬 스토리지에 저장된 토큰 이름입니다.

  const deleteItem = async () => {
    try {
      const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
      if (!isConfirmed) return;

      let apiUrl = "";
      let redirectUrl = "";

      // 1️⃣ 공지사항 삭제
      if (location.pathname.includes("/admin/notice")) {
        apiUrl = `/api/admin/notice/${noticeId}`;
        redirectUrl = "/admin/notice";
      }
      // 2️⃣ 질문 삭제
      else if (location.pathname.includes("/question/")) {
        const isAdmin = location.pathname.includes("/admin");
        apiUrl = `/api/question/${questionId}`;
        redirectUrl = isAdmin ? "/admin/question" : "/question";
      }
      // 3️⃣ 리뷰 삭제
      else if (location.pathname.includes("/review/")) {
        const isAdmin = location.pathname.includes("/admin");
        apiUrl = `/api/review/${reviewId}`;
        redirectUrl = isAdmin ? "/admin/review" : "/review";
      }

      if (!apiUrl) throw new Error("잘못된 요청입니다.");

      // 토큰 확인
      const token = localStorage.getItem("access_token");
      console.log("Token:", token); // 토큰 확인

      const response = await axios.delete(apiUrl, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response); // 응답 확인

      if (response.status === 200) {
        alert("삭제되었습니다.");
        navigate(redirectUrl);
      } else {
        throw new Error("삭제 실패");
      }
    } catch (error) {
      console.error("deleteItem error", error);
      alert("삭제에 실패하였습니다. 다시 시도해 주세요.");
    }
  };
  return <Button onClick={deleteItem}>삭제</Button>;
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

export default Delete;
