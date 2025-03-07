import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

function File({ noticeId }) {
  const [files, setFiles] = useState([]);

  // 파일 목록을 noticeId에 맞게 불러오는 useEffect
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`/api/notice/${noticeId}/file`);
        setFiles(response.data.noticeFiles || []); // 서버에서 받아온 파일 목록을 상태에 저장
      } catch (error) {
        console.error("파일 목록 불러오기 오류:", error);
      }
    };

    if (noticeId) {
      fetchFiles(); // noticeId가 존재하면 파일 목록을 불러옴
    }
  }, [noticeId]);

  const downloadFile = async (fileId) => {
    try {
      // 파일을 다운로드할 때 fileId를 포함한 URL로 요청
      const response = await axios.get(
        `/api/notice/${noticeId}/file/${fileId}`,
        { responseType: "blob" } // 파일을 blob 형식으로 받기
      );

      // 서버에서 originFileName을 헤더에서 받아옴
      const originFileName = response.headers["content-disposition"]
        .split("filename=")[1]
        .replace(/"/g, "");

      // 파일 다운로드 처리
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", originFileName); // originFileName으로 다운로드
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("파일 다운로드 오류:", error);
    }
  };

  return (
    <FileContainer>
      {files.length > 0 ? (
        files.map((file) => (
          <FileItem key={file.id}>
            <FileButton onClick={() => downloadFile(file.id)}>
              {file.originFileName} (다운로드)
            </FileButton>
          </FileItem>
        ))
      ) : (
        <NoFilesMessage>파일이 없습니다.</NoFilesMessage>
      )}
    </FileContainer>
  );
}

// 스타일 추가
const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px; // 파일 항목 간 간격 추가
  padding: 20px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const FileButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const NoFilesMessage = styled.p`
  color: #777;
  font-size: 18px;
  text-align: center;
`;

export default File;
