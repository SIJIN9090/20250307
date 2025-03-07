import React from "react";
import styled from "styled-components";
import do1 from "../../assets/imgs/do1.jpg";
import do2 from "../../assets/imgs/do2.jpg";
import do3 from "../../assets/imgs/do3.jpg";
import do4 from "../../assets/imgs/do4.jpg";

const doctors = [
  {
    name: "오예준 원장님",
    specialties: ["외과", "내과"],
    description:
      "오예준 원장님은 20년 이상의 경력을 자랑하는 외과 및 내과 전문의로, 최신 외과적 기술과 환자 맞춤형 치료를 통해 많은 환자들의 삶의 질을 개선해왔습니다. 복부 수술과 암 수술 분야에서 높은 전문성을 보유하고 있습니다.",
    imageUrl: do1,
  },
  {
    name: "이영현 원장님",
    specialties: ["정형외과"],
    description:
      "이영현 원장님은 정형외과 분야에서 15년 이상의 경력을 쌓은 전문가로, 관절 수술 및 재활 치료에 뛰어난 능력을 자랑합니다. 스포츠 손상, 골절, 퇴행성 질환 치료를 전문으로 합니다.",
    imageUrl: do2,
  },
  {
    name: "김동선 원장님",
    specialties: ["치과"],
    description:
      "김동선 원장님은 치과 분야에서 10년 이상의 경력을 보유하고 있으며, 치아 미백, 임플란트, 교정 치료 등 다양한 분야에서 전문적인 진료를 제공합니다.",
    imageUrl: do3,
  },
  {
    name: "박시진 원장님",
    specialties: ["안과", "정형외과"],
    description:
      "박시진 원장님은 안과 및 정형외과 분야에서 경력을 쌓은 전문가로, 백내장, 굴절 이상, 골절 치료 등 다양한 질환에 대한 진료를 제공합니다. 최신 장비를 활용한 정밀 검사를 통해 최적의 치료를 합니다.",
    imageUrl: do4,
  },
];
function Introduce() {
  return (
    <IntroduceContainer>
      <IntroduceSection>
        <LoginBox>
          <LoginTitle>개요</LoginTitle>
          <LoginSub>하이펫병원의 비전과 미션을 소개합니다.</LoginSub>
        </LoginBox>

        <AboutHospitalContainer>
          <AboutHospitalCard>
            <div>
              <AboutHospitalName>하이펫 병원</AboutHospitalName>
              <AboutHospitalDescription>
                하이펫병원은 동물들의 건강을 최우선으로 생각하는 종합병원입니다.
                최신 의료 장비와 전문적인 의료진을 갖추고 있으며, 모든 동물이
                편안하고 안전하게 치료를 받을 수 있도록 노력하고 있습니다.
                우리는 동물들의 건강을 지키기 위해 최고의 서비스를 제공하고
                있습니다.
              </AboutHospitalDescription>
            </div>
          </AboutHospitalCard>
        </AboutHospitalContainer>

        <DoctorsContainer>
          {doctors.map((doctor, index) => (
            <DoctorCard key={index}>
              <DoctorImage imageUrl={doctor.imageUrl} />
              <div>
                <DoctorName>{doctor.name}</DoctorName>
                <Specialty>{doctor.specialties.join(", ")}</Specialty>
                <Description>{doctor.description}</Description>
              </div>
            </DoctorCard>
          ))}
        </DoctorsContainer>
      </IntroduceSection>
    </IntroduceContainer>
  );
}

const IntroduceContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IntroduceSection = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 20vh;
  pointer-events: none;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const LoginTitle = styled.h1`
  font-weight: 700;
  line-height: 1.3em;
  font-size: 42px;
  color: #111;
  text-align: center;
`;
const LoginSub = styled.p`
  display: block;
  margin-top: 1.5em;
  color: #888888;
  font-size: 14px;
  text-align: center;
`;
const AboutHospitalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const AboutHospitalCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 15px;
  width: 80%;
  max-width: 1280px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const AboutHospitalName = styled.h3`
  font-weight: 500;
  font-size: 24px;
  color: #111111;
  margin-bottom: 10px;
`;

const AboutHospitalDescription = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #777;
  line-height: 1.5;
  text-align: left;
  width: 80%; /* 내용이 넓게 퍼지도록 */
`;
const DoctorImage = styled.div`
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  width: 1200px;
  height: 300px;
  border-radius: 15px;
  margin-right: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1); /* 이미지 확대 효과 */
  }
`;
// ----------------------------------------------------------------------------
const DoctorsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 40px;
  justify-items: center;
  margin-bottom: 140px;
`;

const DoctorCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 15px;
  width: 500px;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const DoctorName = styled.h3`
  font-weight: 500;
  font-size: 20px;
  color: #111111;
  margin-bottom: 10px;
`;

const Specialty = styled.p`
  font-weight: 500;
  font-size: 20px;
  color: #555;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #777;
  line-height: 1.5;
  text-align: left;
`;

export default Introduce;
