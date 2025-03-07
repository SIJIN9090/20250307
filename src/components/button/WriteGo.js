import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function WriteGo() {
  const navigate = useNavigate();

  const handleChangeClick = () => {
    navigate("write"); // "write" 경로로 이동
  };

  return <Button onClick={handleChangeClick}>작성</Button>;
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

export default WriteGo;
