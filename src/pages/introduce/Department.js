import React from "react";
import styled from "styled-components";

function Department() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section &&
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
  };

  return (
    <DepartmentContainer>
      <DepartmentSection>
        <DepartmentTitle>
          <h1>진료과 소개</h1>
        </DepartmentTitle>

        {/* New Section with 5 Horizontal Boxes */}
        <HorizontalBoxes>
          <Box id="internal">
            <Icon>1</Icon>
            <BoxContent>
              <h3>내과</h3>
              <p>
                내과는 신체의 내부 장기에 관련된 질병을 진단하고 치료하는
                과입니다. 내과에서는 심장병, 고혈압, 당뇨병, 호흡기 질환 등
                다양한 만성 질환과 급성 질환을 다룹니다.
              </p>
              <p>
                내과 전문의는 환자의 전반적인 건강 상태를 점검하고, 필요한 경우
                다양한 검사와 치료를 제공합니다. 심장, 호흡기, 소화기, 신장 등
                여러 분야에 걸쳐 전문적인 진료를 받으실 수 있습니다.
              </p>
            </BoxContent>
          </Box>

          <Box id="surgery">
            <Icon>2</Icon>
            <BoxContent>
              <h3>외과</h3>
              <p>
                외과는 외상, 종양, 장기 절제 등과 같은 외과적 수술을 전문으로
                하는 분야입니다. 외과에서는 수술을 통해 환자의 신체적인 문제를
                해결하고 회복을 돕습니다.
              </p>
              <p>
                외과 의사는 환자의 상태를 평가하고, 수술적 치료가 필요한 경우
                적절한 수술 방법을 선택하여 치료합니다. 내시경 수술, 로봇 수술
                등 다양한 첨단 기술을 이용한 수술도 진행하고 있습니다.
              </p>
            </BoxContent>
          </Box>

          <Box id="orthopedics">
            <Icon>3</Icon>
            <BoxContent>
              <h3>정형외과</h3>
              <p>
                정형외과는 뼈, 관절, 근육, 인대 등과 관련된 질환을 다루는
                과입니다. 관절염, 골절, 퇴행성 질환 등 여러 가지 신체의 구조적
                문제를 해결합니다.
              </p>
              <p>
                정형외과 전문의는 수술, 물리치료, 재활치료 등을 통해 환자들이
                정상적인 신체 기능을 회복할 수 있도록 도와줍니다. 특히 운동
                선수들의 부상 치료에도 중요한 역할을 합니다.
              </p>
            </BoxContent>
          </Box>

          <Box id="ophthalmology">
            <Icon>4</Icon>
            <BoxContent>
              <h3>안과</h3>
              <p>
                안과는 눈과 시각에 관련된 질환을 다루는 분야로, 백내장, 녹내장,
                시력 교정, 눈물샘 질환 등 다양한 안과적 문제를 치료합니다.
              </p>
              <p>
                안과 전문의는 각종 안과적 질환을 진단하고, 약물 치료나 수술을
                통해 시력 회복을 돕습니다. 또한, 노화와 관련된 눈의 문제나
                유전적 요인에 의한 질환도 관리할 수 있습니다.
              </p>
            </BoxContent>
          </Box>

          <Box id="dentistry">
            <Icon>5</Icon>
            <BoxContent>
              <h3>치과</h3>
              <p>
                치과는 구강 건강을 관리하고 치료하는 과입니다. 치아, 잇몸, 구강
                내 질환을 예방하고 치료하는 역할을 합니다. 충치 치료, 치주 질환
                치료, 교정 치료 등 다양한 서비스를 제공합니다.
              </p>
              <p>
                치과 전문의는 치아 및 구강 건강을 개선하기 위한 치료와 예방을
                진행하며, 미백, 임플란트, 보철 등 미용적인 측면에서도 중요한
                치료를 제공합니다.
              </p>
            </BoxContent>
          </Box>
        </HorizontalBoxes>
      </DepartmentSection>

      {/* Buttons container for easy clicking, aligned to the right */}
      <ButtonContainer>
        <Button onClick={() => scrollToSection("internal")}>내과</Button>
        <Button onClick={() => scrollToSection("surgery")}>외과</Button>
        <Button onClick={() => scrollToSection("orthopedics")}>정형외과</Button>
        <Button onClick={() => scrollToSection("ophthalmology")}>안과</Button>
        <Button onClick={() => scrollToSection("dentistry")}>치과</Button>
      </ButtonContainer>
    </DepartmentContainer>
  );
}

const DepartmentContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DepartmentSection = styled.div`
  width: 100%;
  height: 1500px;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
`;

const DepartmentTitle = styled.div`
  padding-left: 140px;

  width: 100%;
  height: 50px;
  margin-top: 100px;
  text-align: left;
  h1 {
    font-weight: bold;
    font-size: 36px;
    font-family: "Noto Sans KR", serif;
    color: #333; /* 텍스트 색을 어두운 회색으로 */
  }
`;

// Horizontal container for boxes
const HorizontalBoxes = styled.div`
  padding-left: 140px;
  padding-right: 140px;
  display: flex;
  gap: 20px;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: flex-start; /* 왼쪽 정렬 */
`;

// Individual Box style with 1000px width
const Box = styled.div`
  width: 1000px;
  height: auto;
  background-color: #ffffff;
  border: 1px solid #e1e1e1;
  display: flex;
  align-items: center;
  padding: 30px;
  position: relative;
  flex-direction: row;
  border-radius: 15px; /* 둥근 모서리 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  transition: all 0.3s ease; /* hover 시 애니메이션 효과 */

  &:hover {
    transform: translateY(-5px); /* hover 시 살짝 위로 올라오는 효과 */
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* hover 시 그림자 강조 */
  }
`;

// Icon part (placeholder for icons)
const Icon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #000; /* 검은색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  font-size: 28px;
  font-weight: bold;
  color: white; /* 흰색 글씨 */
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Box content (title and description)
const BoxContent = styled.div`
  h3 {
    font-size: 26px;
    font-weight: bold;
    margin: 0;
    color: #333;
  }
  p {
    font-size: 16px;
    margin-top: 15px;
    line-height: 1.6;
    color: #555;
    text-align: justify; /* 양쪽 정렬 */
  }
`;

// 버튼들을 화면 우측에 고정시키는 컨테이너
const ButtonContainer = styled.div`
  width: 100px;
  position: fixed;
  right: 20px;
  top: 150px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: calc(100vh - 150px);
  overflow-y: auto;
`;

// 버튼 스타일
const Button = styled.button`
  padding: 10px;
  background-color: #000; /* 검은색 배경 */
  color: white; /* 흰색 글씨 */
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #333; /* hover 시 어두운 검은색 */
    transform: translateY(-3px); /* hover 시 버튼 살짝 떠오르는 효과 */
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2); /* 입체감 추가 */
  }

  &:active {
    transform: translateY(0); /* 클릭 시 원래 위치로 돌아오는 효과 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 클릭 시 그림자 감소 */
  }
`;

export default Department;
