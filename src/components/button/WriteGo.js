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
  background-color: #111111;
  color: white;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #111111;
  }
`;
export default WriteGo;
