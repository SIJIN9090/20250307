import styled from "styled-components";
import React, { useState, useEffect } from "react";

const File = ({ files, noticeId }) => {
  const [accessToken, setAccessToken] = useState(""); // accessToken 상태

  useEffect(() => {
    // 예를 들어 localStorage에서 access_token을 가져오는 경우
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleDownload = async (fileId) => {
    // 사용자에게 다운로드 확인을 요청
    const isConfirmed = window.confirm("이 파일을 다운로드 하시겠습니까?");

    if (!isConfirmed) {
      // 사용자가 "취소"를 누르면 다운로드를 하지 않음
      return;
    }

    try {
      // 요청 헤더에 인증 토큰 추가
      const response = await fetch(`/api/notice/${noticeId}/file/${fileId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // accessToken을 사용
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the file");
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");
      const originFileName = contentDisposition
        ? contentDisposition.split("originFileName=")[1].replace(/"/g, "")
        : `file-${fileId}`;

      // Create a link to trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = originFileName;
      link.click();
      URL.revokeObjectURL(link.href); // Clean up the URL object
    } catch (error) {
      console.error("File download error:", error);
    }
  };

  if (!files || files.length === 0) {
    return (
      <FileBox>
        <p>No files</p>
      </FileBox>
    );
  }

  return (
    <FileBox>
      <ul>
        {files.map((file) => (
          <FileItem key={file.id}>
            <FileDetails>
              <FileName>{file.originFileName}</FileName>
            </FileDetails>
            <Actions>
              {/* 다운로드 버튼 */}
              <DownloadButton onClick={() => handleDownload(file.id)}>
                Download
              </DownloadButton>
            </Actions>
          </FileItem>
        ))}
      </ul>
    </FileBox>
  );
};

const FileBox = styled.div`
  border: 2px solid #ccc;
  padding: 10px 16px;
  margin-top: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 600px;
  width: 100%;
  height: auto;
  /* 세로 크기를 더 작게 설정 */
  min-height: 60px;
`;

const FileItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const FileDetails = styled.div`
  display: flex;
  align-items: center;
`;

const FileName = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  padding: 6px 12px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }
`;

const DownloadButton = styled(Button)`
  background-color: #000; /* 검정색 배경 */
  color: white;

  &:hover {
    background-color: #333; /* hover 시 더 어두운 검정색 */
  }
`;

export default File;
