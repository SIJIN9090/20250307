import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const AnimalProfile = () => {
  const [inputValue, setInputValue] = useState([]);

  useEffect(() => {
    axios
      .get("/api/{memerId}/pet")
      .then((response) => {
        setInputValue([
          {
            name: response.data.name,
            species: response.data.species,
            age: response.data.age,
            weight: response.data.weight,
          },
        ]);
      })
      .catch(() => {
        setInputValue([{ name: "", species: "", age: "", weight: "" }]);
      });
  }, []);

  const addContent = () => {
    setInputValue([
      ...inputValue,
      { name: "", species: "", age: "", weight: "" },
    ]);
  };

  const deleteContent = (index) => {
    setInputValue(inputValue.filter((_, i) => i !== index));
  };

  return (
    <AnimalProfileContainer>
      <AddButton onClick={addContent}>+ 반려동물 추가</AddButton>

      {inputValue.map((item, index) => (
        <AnimalTableWrapper key={index}>
          <DeleteButton onClick={() => deleteContent(index)}>삭제</DeleteButton>
          <AnimalTable>
            <tbody>
              {["이름", "종류", "나이"].map((label, i) => (
                <TableRow key={i}>
                  <TableHead>{label}</TableHead>
                  <TableData>
                    <Input
                      type="text"
                      value={item[label.toLowerCase()]}
                      onChange={(e) => {
                        const newInputValue = [...inputValue];
                        newInputValue[index][label.toLowerCase()] =
                          e.target.value;
                        setInputValue(newInputValue);
                      }}
                    />
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </AnimalTable>
        </AnimalTableWrapper>
      ))}
    </AnimalProfileContainer>
  );
};

// 📌 `UserUpdate` 폼과 일관된 너비 유지
const AnimalProfileContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-family: "Noto Sans KR", serif;
`;

const AddButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #111111;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 20px;
  font-family: "Noto Sans KR", serif;
  margin-bottom: 15px;

  &:hover {
    background-color: #111111;
  }
`;

const AnimalTableWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  font-family: "Noto Sans KR", serif;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: darkred;
  }
`;

const AnimalTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
  background-color: #fff;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #ff;
  }
`;

const TableHead = styled.th`
  background: #f2f2f2;
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
  width: 30%;
  font-size: 16px;
  font-weight: medium;
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 440px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

export default AnimalProfile;
