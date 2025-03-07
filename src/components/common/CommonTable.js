import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function CommonTable({ bbsList, columns, linkPrefix }) {
  return (
    <NoticeTableBox>
      <NoticeTabled>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bbsList.map((response, index) => (
            <tr key={index}>
              {columns.map((column, colIndex) => {
                const data = column.field ? response[column.field] : null;
                return (
                  <td key={colIndex}>
                    {column.link ? (
                      <Link to={`${linkPrefix}/${response.id}`}>{data}</Link>
                    ) : (
                      data
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </NoticeTabled>
    </NoticeTableBox>
  );
}

const NoticeTableBox = styled.div`
  width: 100%;
  max-width: 1280px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  overflow-x: auto;
  padding-left: 140px;
  padding-right: 140px;
`;

const NoticeTabled = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  thead th {
    padding: 10px;
    font-weight: medium;
    font-size: 20px;
    font-family: "Noto Sans KR", serif;
  }

  tbody tr {
    &:nth-child(odd) {
      border: none;
      height: 40px;
    }
    &:nth-child(even) {
      background-color: #f4f4f4;
      border-bottom: 1px solid #111111;
      height: 70px;
    }
  }

  tbody td {
    padding: 10px;
    font-weight: regular;
    font-size: 20px;
    font-family: "Noto Sans KR", serif;
    vertical-align: middle;
  }
`;

export default CommonTable;
