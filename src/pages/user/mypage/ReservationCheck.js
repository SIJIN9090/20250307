import React from "react";
import styled from "styled-components";

function ReservationCheck() {
  return (
    <ReservCheckContainer>
      <ReservCheckTableBox>
        <ReservCheckTable>
          <thead>
            <TableRow>
              <TableHeader>예약번호</TableHeader>
              <TableHeader>진료과</TableHeader>
              <TableHeader>날짜</TableHeader>
              <TableHeader>시간</TableHeader>
              <TableHeader>반려동물 이름</TableHeader>
              <TableHeader>생성 시간</TableHeader>
              <TableHeader>예약 삭제</TableHeader>
            </TableRow>
          </thead>
          <tbody>{/* 데이터 추가 예정 */}</tbody>
        </ReservCheckTable>
      </ReservCheckTableBox>
    </ReservCheckContainer>
  );
}

const ReservCheckContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReservCheckTableBox = styled.div`
  width: 100%;
  max-width: 1000px;
  overflow-x: auto; /* 테이블이 너무 길어질 경우 스크롤 */
`;

const ReservCheckTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f4f4f4;
  }
`;

const TableHeader = styled.th`
  background-color: #111111;
  color: white;
  font-size: 16px;
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
`;

export default ReservationCheck;
