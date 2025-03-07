import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode"; // jwt-decode 라이브러리 import
import header_logo from "../../assets/imgs/footer_logo.png";
import header_menu_stroke from "../../assets/imgs/header_menu.svg";
import myIcon from "../../assets/imgs/header_mypage.svg";
import userIcon from "../../assets/imgs/header_user.svg";
import searchIcon from "../../assets/imgs/header_search.svg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext, HttpHeadersContext } from "../../context";
import axios from "axios";
// --------------------------------------------------------------------------------------------------------------------

function Header() {
  const navItems = [
    {
      name: "병원 소개",
      path: "/introduce",
      submenu: [
        { path: "/introduce", name: "병원 소개" },
        { path: "/introduce", name: "개요" },
        { path: "/directions", name: "오시는 길" },
        { path: "/department", name: "진료과 소개" },
      ],
    },
    {
      name: "공지사항",
      path: "/notice",
      submenu: [
        { path: "/notice", name: "공지 사항" },
        { path: "/notice", name: "목록" },
        { path: "/notice", name: "관리자" },
      ],
    },
    {
      name: "온라인예약",
      path: "/userreserv",
      submenu: [
        { path: "/userreserv", name: "온라인 예약" },
        { path: "/userreserv", name: "회원 예약" },
        { path: "/nonuserreserve", name: "비회원 예약" },
      ],
    },
    {
      name: "온라인상담",
      path: "/question",
      submenu: [
        { path: "/question", name: "온라인 상담" },
        { path: "/question", name: "목록" },
        { path: "/question", name: "관리자" },
      ],
    },

    {
      name: "고객 리뷰",
      path: "/review",
      submenu: [
        { path: "/review", name: "고객 리뷰" },
        { path: "/review", name: "목록" },
        { path: "/review", name: "관리자" },
      ],
    },
  ];

  const [showBox, setShowBox] = useState(true);
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const token = localStorage.getItem("access_token");
  const { setHeaders } = useContext(HttpHeadersContext); // HttpHeadersContext에서 setHeaders 가져오기

  let useRole = null;
  if (token) {
    try {
      // 토큰 디코딩
      console.log(token);
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      useRole = decodedToken.roles;
    } catch (e) {
      console.log("토큰 디코딩 오류 : ", e);
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowBox(false);
      } else {
        setShowBox(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("nick_name");

      setAuth({ nick_name: null, access_token: null });
      setHeaders({ Authorization: "" });

      navigate("/signIn"); // 로그아웃 후 로그인 페이지로 리디렉션
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token") || "";
    const nickName = localStorage.getItem("nick_name") || "";

    // token과 nickName이 둘 다 있을 때만 로그인 상태 유지
    if (token && nickName) {
      setAuth({ nick_name: nickName, access_token: token });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      setAuth(null); // 로그인 상태 해제
    }
  }, [setAuth]);

  const handleMyPageClick = (e) => {
    if (!auth?.nick_name) {
      // auth가 null일 수도 있으므로 ?. 사용
      e.preventDefault(); // 기본 링크 동작 방지
      alert("로그인이 필요합니다! 로그인 페이지로 이동합니다.");
      navigate("/signIn");
    }
  };

  const handleAdminPageClick = (e) => {
    if (useRole !== "ROLE_ADMIN") {
      e.preventDefault(); // 기본 링크 동작 방지
      alert("관리자만 접근 가능합니다!");
      navigate("/");
    }
  };
  const [hovered, setHovered] = useState(false);
  return (
    <HeaderContainer>
      <HeaderSection>
        <HeaderPosition>
          <Logo>
            <Link to="/">
              <img src={header_logo} width="128px" height="36px" alt="logo" />
            </Link>
          </Logo>

          <MainNavi
            onMouseEnter={() => setHovered(true)} // 마우스가 올라가면 hovered 상태 true
            onMouseLeave={() => setHovered(false)} // 마우스가 떠나면 hovered 상태 false
          >
            <ul>
              <img
                src={header_menu_stroke}
                width="36px"
                height="36px"
                alt="menu"
              />
              {navItems.map((item) => (
                <li key={item.name}>
                  <MenuLink to={item.path || "#"}>{item.name}</MenuLink>
                </li>
              ))}
            </ul>
          </MainNavi>
          {/* 서브 메뉴를 밖으로 빼서 따로 관리 */}
          <SubNavi
            show={hovered}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <article>
              {navItems.map((item) => {
                if (item.submenu) {
                  return (
                    <ul key={item.name}>
                      {item.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <SubLink to={subItem.path}>{subItem.name}</SubLink>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </article>
          </SubNavi>

          <HederSectionB>
            <LoginBox>
              {useRole === "ROLE_ADMIN" ? (
                <>
                  <Link to="/admin/adminuser" onClick={handleAdminPageClick}>
                    <img src={myIcon} alt="관리자페이지" />
                    <LoginButton>관리자</LoginButton>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/mypagecheck" onClick={handleMyPageClick}>
                    <img src={myIcon} alt="마이페이지" />
                    <LoginButton>마이페이지</LoginButton>
                  </Link>
                </>
              )}

              {auth && auth.access_token ? (
                <Link to="/" onClick={handleLogout}>
                  <img src={userIcon} />
                  <LoginButton>로그아웃</LoginButton>
                </Link>
              ) : (
                <Link to="/signIn">
                  <img src={userIcon} />
                  <LoginButton>로그인</LoginButton>
                </Link>
              )}
            </LoginBox>
            <SearchBox>
              <Link to="/">
                <input
                  type="search"
                  placeholder="검색어를 입력해주세요."
                ></input>
                <img src={searchIcon} />
                <LoginButton></LoginButton>
              </Link>
            </SearchBox>
          </HederSectionB>
        </HeaderPosition>
      </HeaderSection>

      {/* ------------------------------------------------------------------------------------------------ */}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: block;
  width: 100%;
  margin: auto;
  height: 100px;
  background-color: #0d326f;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
  position: fixed;
  z-index: 999999999;
  background-color: #0d326f;
`;

const HeaderPosition = styled.div`
  width: 1280px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 auto; /* 부모 요소에서 중앙 정렬 */
`;

const Logo = styled.h1`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 150px;
  height: 100px;
  img {
    margin-left: 5px;
    margin-top: 5px;
  }
`;

const MainNavi = styled(Link)`
  justify-content: left;
  align-items: left;
  z-index: 99;
  width: 500px;
  font-weight: 500;
  text-align: center;
  img {
    position: relative;
    top: -8px;
  }

  ul {
    display: flex;
    justify-content: left;
    padding: 40px 10px 20px 20px;
  }
  li {
    width: 650px;
  }
  a {
    font-family: "Noto Sans KR", serif;
  }
`;

const SubNavi = styled(Link)`
  display: ${(props) => (props.show ? "block" : "none")};
  top:120px;
   position: absolute;
   background-color: #F6F7F8;
  width: 100vw;
  height: 180px;
  font-family: "Noto Sans KR", serif;
  article{

    display: flex;
    height: 180px;
    padding:10px;
    justify-content: center;

    ul li{
   padding:3px;
    }
  }

  ul{
  margin-top:20px;
  width: 150px;
  }
   li:first-child{
     font-size: 16px;
   font-weight: 700;
  li{

  }
 a{
  height: 100px;
 }

`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 14.2px;
  width: 600px;

  &:hover {
    color: #ffa228;
  }
`;

const SubLink = styled(Link)`
  text-decoration: none;
  color: #111;

  &:hover {
    color: #ffa228;
  }
`;
//네비)오른쪽
const HederSectionB = styled.div`
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: #ffa228;
  }
`;

const LoginBox = styled.div`
  padding: 50px 20px 20px 20px;
  font-size: 14.2px;
  position: relative;
  display: flex;
  justify-content: left;
  color: #fff;

  width: 300px;

  a {
    &:hover {
      color: #ffa228;
    }
  }

  a {
    padding: 16px;
    &:hover {
      color: #ffa228;
    }
  }

  a:nth-child(2) img {
    top: 3px;
    position: relative;
    &:hover {
      color: #ffa228;
    }
  }
`;
// ---------------------------------------------------------------
const LoginButton = styled.button`
  font-family: "Noto Sans KR", serif;
  margin-left: 8px;
  background-color: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
  lineheight: 16;
`;

const SearchBox = styled.button`
  top: 20px;
  border: none;
  font-size: 12px;
  cursor: pointer;
  position: relative;

  width: 260px;
  height: 30px;
  border-radius: 15px 13px;
  margin-bottom: 16px;

  outline: none;
  input {
    //height: 25px;
    //width: 190px;
    //border: none;
    //border-bottom: 1px solid rgba(0,0,0,0.2);
    //padding-bottom: 2px;

    font-size: 13px;
    font-weight: 300;
    border: none;
    background: rgb(255, 255, 255);
    width: 260px;
    height: 30px;
    border-radius: 15px 13px;
    outline: none;
    text-align: end;
  }
  input:focus {
    outline: none;
  }
  img {
    bottom: 5px;
    left: 0px;
    padding-left: 10px;
    position: absolute;
  }
`;

export default Header;
