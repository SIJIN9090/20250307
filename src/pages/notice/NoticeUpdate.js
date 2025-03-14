import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HttpHeadersContext } from "../../context";
import Update from "../../components/button/Update";
import Back from "../../components/button/Back";

function NoticeUpdate() {
  const location = useLocation();
  const { bbs } = location.state || {};
  const navigate = useNavigate();
  const [title, setTitle] = useState(bbs?.title || "");
  const [content, setContent] = useState(bbs?.content || "");
  const [files, setFiles] = useState([]); // 추가: 파일 상태
  const [fileNames, setFileNames] = useState([]); // 파일 이름을 저장할 상태 추가
  const [pageNumber] = useState(1);
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const noticeId = bbs?.id;
  const [accessToken, setAccessToken] = useState(""); // accessToken 상태

  useEffect(() => {
    // 예를 들어 localStorage에서 access_token을 가져오는 경우
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeContent = (event) => {
    setContent(event.target.value);
  };

  const handleChangeFile = (event) => {
    // 총 5개까지만 허용
    const selectedFiles = Array.from(event.target.files).slice(0, 5);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  // 주어진 배열의 일부에 대한 얕은 복사본을 생성
  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  /* 파일 업로드 */
  const fileUpload = async (noticeId) => {
    const fd = new FormData();
    files.forEach((file) => fd.append("file", file)); // 파일 추가

    try {
      const response = await axios.post(
        `/api/admin/notice/${noticeId}/file`,
        fd,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data", // 파일 전송 시 Content-Type 설정
          },
        }
      );
      console.log("[file.js] fileUpload() success :D", response.data);
      alert("파일 업로드 성공 :D");
    } catch (err) {
      console.log("[FileData.js] fileUpload() error :<", err);
      alert("파일 업로드 실패");
    }
  };

  // 게시글 세부 정보 가져오기 (파일 목록 포함)
  const getBbsDetail = async () => {
    try {
      const response = await axios.get(`/api/notice/${noticeId}`);
      console.log("[NoticeDetail.js] getBbsDetail() success :D", response.data);

      // 서버에서 받아온 파일 목록이 있으면 설정
      if (
        response.data.noticeFiles &&
        Array.isArray(response.data.noticeFiles)
      ) {
        setFiles(response.data.noticeFiles);
        // 파일 이름만 추출해서 상태에 저장
        setFileNames(response.data.noticeFiles.map((file) => file.name));
      } else {
        setFiles([]); // 파일 목록이 없으면 빈 배열로 설정
        setFileNames([]); // 파일 이름도 비워줌
      }

      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      console.log("[NoticeDetail.js] getBbsDetail() error :<", error);
    }
  };

  useEffect(() => {
    console.log("noticeId:", noticeId); // 콘솔로 확인
    if (!noticeId) return;

    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });

    getBbsDetail(); // noticeId가 있을 때만 데이터 요청
  }, [noticeId]);

  const handleFileFetch = async (fileId) => {
    try {
      const response = await fetch(`/api/notice/${noticeId}/file/${fileId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

      // 파일 이름만 화면에 표시 (새로 추가한 상태로 처리)
      setFileNames((prevFileNames) => [...prevFileNames, originFileName]);
    } catch (error) {
      console.error("File fetch error:", error);
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <TableBox>
          <Table>
            <tbody>
              <tr>
                <td>
                  <TableTitle
                    type="text"
                    value={title}
                    onChange={changeTitle}
                  />
                </td>
              </tr>
              <UploadWrapper>
                <FileInputWrapper>
                  {/* 파일 목록 표시 */}
                  {fileNames.length > 0 && (
                    <div>
                      {fileNames.map((fileName, index) => (
                        <div
                          key={index}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <span>{fileName}</span> {/* 파일 이름만 표시 */}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 파일 입력 필드 - 파일이 5개 미만일 때만 표시 */}
                  {files.length < 5 && (
                    <div>
                      <InputFile
                        type="file"
                        name="file"
                        onChange={handleChangeFile}
                        multiple="multiple"
                      />
                    </div>
                  )}
                </FileInputWrapper>
              </UploadWrapper>
              <tr>
                <td>
                  <TableContent value={content} onChange={changeContent} />
                </td>
              </tr>
            </tbody>
          </Table>
        </TableBox>

        <BottomBox>
          <Update
            noticeId={noticeId}
            navigate={navigate}
            title={title}
            content={content}
            fileUpload={fileUpload}
          />
          <Back pageNumber={pageNumber} itemId={bbs.id} />
        </BottomBox>
      </ContentWrapper>
    </Container>
  );
}

//  컨테이너
const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//  내부 콘텐츠
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

//  테이블 박스
const TableBox = styled.div`
  width: 100%;
  margin-top: 20px;
`;

// 테이블
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

//  입력 필드
const TableTitle = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px;
  border: none;
  border-bottom: 1px solid #111111;
  font-size: 20px;
  font-weight: medium;
  font-family: "Noto Sans KR", serif;
  margin-bottom: 30px;

  outline: none;
`;

const TableContent = styled.textarea`
  width: 100%;
  min-height: 400px;
  padding: 5px;
  border: none;
  font-size: 16px;
  font-weight: 300;
  font-family: "Noto Sans KR", serif;
  border: none;
  border-bottom: 1px solid #111111;
  outline: none;
  resize: none;
  overflow-x: hidden;
`;

//  하단 버튼 박스
const BottomBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 100px;
`;
const UploadWrapper = styled.div`
  margin-bottom: 10px;
  width: 1000px;
`;

const InputFile = styled.input`
  width: 270px;
  font-size: 16px;
  color: #111111;
  cursor: pointer;
  position: relative;
  padding: 10px 20px;
  border: 1px solid #111111;
  border-radius: 5px;
  background-color: white;
  transition: background-color 0.3s ease;
  left: 300px;
  &:hover {
    background-color: #f0f8f0;
  }
`;

const FileInputWrapper = styled.div`
  border: 2px solid #ccc;
  padding: 10px 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 600px;
  width: 100%;
  height: auto;
  min-height: 60px;

  span {
    font-size: 14px;
    font-weight: 500;
  }
`;

export default NoticeUpdate;
