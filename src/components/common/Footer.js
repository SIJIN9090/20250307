import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import footer_logo from "../../assets/imgs/footer_logo.png";
import media_icon_instagram from "../../assets/imgs/media_icon_instagram.png";
import media_icon_youtube from "../../assets/imgs/media_icon_youtube.png";
import media_icon_appstore from "../../assets/imgs/media_icon_appstore.png";
import media_icon_googleplay from "../../assets/imgs/media_icon_googleplay.png";
import styled from "styled-components";

function Footer() {
  return (
    <FooterContainer>
      <FooterSection>
      <FooterSections>
        <FooterBoxA>
          <FooterLogo>
            <img src={footer_logo} width="180px" height="" />
          </FooterLogo>
          <Footertel>
            <p>하이펫 동물의료센터 긴급전화</p>
            <p>02-837-9922</p>
          </Footertel>
        </FooterBoxA>

        <FooterBoxB>
          <FooterText>
            <table>
              <tr>
                <td>문의</td>
                <td>
                  {" "}
                  대표번호 : 02-837-9922 팩스 : 02-3482-8835 이메일:
                  saff@saff.kr
                </td>
              </tr>
              <tr>
                <td>주소</td>
                <td>
                  {" "}
                  서울특별시 구로구 시흥대로 163길 33 2층, 3층 (주호타워)
                  사업자등록번호 : 203-87-00672
                </td>
              </tr>
            </table>
          </FooterText>
          <FooterIcon>
            <a href="#">
              <img src={media_icon_instagram} width="30px" />
            </a>
            <a href="#">
              <img src={media_icon_youtube} width="30px" />
            </a>
            <a href="#">
              <img src={media_icon_appstore} width="30px" />
            </a>
            <a href="#">
              <img src={media_icon_googleplay} width="30px" />
            </a>
          </FooterIcon>
          <Copy>
            <p>©&nbsp;Copyright 2025 HIPAT. All Rights Reserved</p>
          </Copy>{" "}
        </FooterBoxB>
      </FooterSections>
      </FooterSection>
    </FooterContainer>
  );
}

//1.푸터 전체 박스
const FooterContainer = styled.div`
  width: 100%;
 `;


//2.푸터 알맹이 박스
const FooterSection = styled.div`
  
  position: absolute;
  //bottom: 0;
  
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;

  text-align: center;
  width: 100%;
  z-index: 99999!important;
  border-top: 1px solid rgb(25, 31, 40);
  background-color: #0E0E0E;
`;


//3.
const FooterSections = styled.div`
  width: 1280px;
  height: 265px;
  position: relative;
  margin: 0 auto;
  //display: flex;
`;


const FooterBoxA = styled.div`
  float: left;
  width: 239px;
  height: 265px;
  position: relative;
  display: block;
`;

const FooterLogo = styled.div`
  margin-top: 60px;
  margin-left: 40px;
  
  display: flex;
  position: relative;
  top: 0px;
`;

const Footertel = styled.div`
  position: relative;
  width: 206px;
  height: 58px;
  color: #f4f4f4;
  margin-top: 40px;
  margin-left: 18px;
  
  p:first-child {
    line-height: 1.5;
    font-family: "Noto Sans KR", serif;
    font-size: 13px;
  
  }
  p {
    font-family: "Montserrat", serif;
    font-weight: 600;
    margin: 0px;
    font-size: 28px;
  }
`;
// -------------------------------------------------------------------------
const FooterBoxB = styled.div`
  float: left;
  width: 1000px;
  height: 265px;
  display: block;
`;
const FooterText = styled.div`
  display: block;
  margin-top: 50px;
  margin-bottom: 18px;
  margin-left: 214px;
  position: relative;
  font-size: 14px;
  color: #f4f4f4;
  width: 750px;
  height: 48px;
  line-height: 24px;
  font-family: "Noto Sans KR", serif;
  text-align: left;
  td:first-child {
    padding-right: 10px;
    font-weight: 800;
  }
`;
const FooterIcon = styled.div`
  margin-bottom: 31px;
  margin-left: 214px;
  position: relative;
  width: 180px;
  height: 30px;
  a {
    padding: 0px 15px 0px 0px;
  }
  img {
  }
`;

const Copy = styled.div`
  display: block;
  width: 300px;
  height: 15px;
  margin-bottom: 47px;
  margin-left: 214px;
  position: relative;
  font-size: 13px;
  color: #f4f4f4;
  //width: 300px;
  height: 15px;
  p {
    font-family: "Montserrat", serif;
  }
`;

export default Footer;
