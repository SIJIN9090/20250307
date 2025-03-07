import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

function A_ReservationDetail() {
  const { reservationId } = useParams();
  const [reservation, setReservation] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchReservationDetail = async () => {
  //     try {
  //       const response = await axios.get(`/api/reservation/${reservationId}`);
  //       setReservation(response.data);
  //     } catch (error) {
  //       console.error("Error fetching reservation details:", error);
  //       navigate("/adminreservation");
  //     }
  //   };

  //   fetchReservationDetail();
  // }, [reservationId, navigate]);

  // if (!reservation) return <p>로딩 중...</p>;

  return (
    <Container>
      <h2>예약 상세 정보</h2>
      <DetailWrapper>
        {/* <p>
          <strong>예약자 이름:</strong> {reservation.memberName}
        </p>
        <p>
          <strong>반려동물 이름:</strong> {reservation.petName}
        </p>
        <p>
          <strong>예약 날짜:</strong> {reservation.dateTime}
        </p>
        <p>
          <strong>부서:</strong> {reservation.department}
        </p>
        <p>
          <strong>예약 상태:</strong> {reservation.status}
        </p>
        <p>
          <strong>슬롯 상태:</strong>{" "}
          {reservation.slotStatus ? "예약됨" : "가용"}
        </p> */}
      </DetailWrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
`;

const DetailWrapper = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 50%;
  margin: auto;
`;

export default A_ReservationDetail;
