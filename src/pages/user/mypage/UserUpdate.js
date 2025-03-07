import React from "react";
import styled from "styled-components";
import AnimalProfile from "./AnimalProfile";

function UserUpdate() {
  return (
    <UserUpdateContainer>
      <UserUpdateUserBox>
        <UserUpdateUserTable>
          <thead>
            <tr>
              <TableHeader colSpan="3">회원 정보</TableHeader>
            </tr>
          </thead>
          <tbody>
            {userFields.map((field, index) => (
              <TableRow key={index}>
                <TableHead>{field.label}</TableHead>
                <TableData>
                  <Input type={field.type} />
                </TableData>
                {field.button && (
                  <TableData>
                    <ActionButton>{field.button}</ActionButton>
                  </TableData>
                )}
              </TableRow>
            ))}
          </tbody>
        </UserUpdateUserTable>
      </UserUpdateUserBox>

      <UserUpdateAnimalBox>
        <AnimalProfile />
      </UserUpdateAnimalBox>

      <UserUpdateButtonBox>
        <SubmitButton>수정</SubmitButton>
        <CancelButton>취소</CancelButton>
      </UserUpdateButtonBox>
    </UserUpdateContainer>
  );
}

const userFields = [
  { label: "이름", type: "text" },
  { label: "이메일", type: "text" },
  { label: "비밀번호", type: "password" },
  { label: "비밀번호 확인", type: "password" },
  { label: "닉네임", type: "text", button: "중복 확인" },
  { label: "주소", type: "text", button: "검색" },
  { label: "상세 주소", type: "text" },
  { label: "생년월일", type: "date" },
  { label: "핸드폰 번호", type: "text" },
];

const UserUpdateContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: "Noto Sans KR", serif;
`;

const UserUpdateUserBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const UserUpdateUserTable = styled.table`
  width: 100%;
  max-width: 1000px;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  font-size: 20px;
  padding: 12px;
  text-align: center;
  background-color: #111111;
  color: #ffffff;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #ffffff;
  }
`;

const TableHead = styled.th`
  font-size: 16px;
  padding: 10px;
  text-align: left;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  width: 30%;
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  background-color: #f4f4f4;
  color: #111111;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-weight: medium;
  font-size: 16px;
  font-family: "Noto Sans KR", serif;

  &:hover {
    background-color: #111111;
    color: #ffffff;
  }
`;

const UserUpdateAnimalBox = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const UserUpdateButtonBox = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #111111;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-family: "Noto Sans KR", serif;

  &:hover {
    background-color: #111111;
  }
`;

const CancelButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #111111;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-family: "Noto Sans KR", serif;

  &:hover {
    background-color: #111111;
  }
`;

export default UserUpdate;
