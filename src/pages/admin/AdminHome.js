import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState("");

  const menuItems = [
    { title: "회원 관리", key: "adminuser", path: "adminuser" },
    { title: "공지사항 관리", key: "notice", path: "notice" },
    { title: "온라인예약 관리", key: "reservations", path: "a_reservation" },
    { title: "온라인상담 관리", key: "onlineCounsel", path: "question" },
    { title: "고객 리뷰 관리", key: "review", path: "review" },
  ];

  // const getHomeTitle = () => {
  //   const currentItem = menuItems.find((item) => item.key === selectedMenu);
  //   return currentItem ? currentItem.title : "";
  // };
  const linkPrefix1 = "/admin/";
  return (
    <LayoutContainer>
      {/* 사이드바 */}
      <Sidebar>
        <SidebarTitle>관리자</SidebarTitle>
        <SidebarMenu>
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={selectedMenu === item.key ? "active" : ""}
              onClick={() => setSelectedMenu(item.key)}
            >
              <Link to={`/admin/${item.path}`}>{item.title}</Link>
            </li>
          ))}
        </SidebarMenu>
      </Sidebar>

      {/* 자식 페이지가 렌더링되는 영역 */}
      <ContentArea>
        {/* <h1>{getHomeTitle()}</h1> */}
        <Outlet />
        {/* 자식 Route가 여기에 렌더링됩니다. */}
      </ContentArea>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  height: 100%;
  width: 1280px;
  margin: 0 auto;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #111111;
  color: white;
  padding: 20px;
`;

const SidebarTitle = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
  font-size: 30px;
  height: 80px;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  margin: 0;

  li {
    margin: 15px 0;
    cursor: pointer;
    font-size: 16px;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s, transform 0.3s ease-in-out;

    display: flex;
    align-items: center;

    &:hover {
      background-color: #333;
      transform: scale(1.05); /* 부드럽게 확대 */
    }

    &.active {
      background-color: #555; /* 선택된 항목 배경색 */
    }

    a {
      color: white;
      text-decoration: none;
      display: block; /* 링크가 li의 크기 전체를 차지하도록 */
      font-weight: 600; /* 글씨 강조 */
      padding: 5px 0; /* 링크의 수평 여백 */
    }
  }
`;

const ContentArea = styled.div`
  flex: 1;

  width: 1200px;
  transform: scale(1);
`;

export default AdminLayout;
