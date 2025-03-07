import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AuthContext, HttpHeadersContext } from "../../context";
import axios from "axios";
import List from "../../components/button/List";
import Write from "../../components/button/Write";

//관리자 공지작성으로

function NoticelWrite() {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { bbs } = location.state || {}; // bbs가 없으면 빈 객체를 사용
  const noticeId = bbs?.id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]); // 추가: 파일 목록 상태 추가
  const [postType, setPostType] = useState(1);

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
      } else {
        setFiles([]); // 파일 목록이 없으면 빈 배열로 설정
      }

      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      console.log("[NoticeDetail.js] getBbsDetail() error :<", error);
    }
  };

  useEffect(() => {
    if (noticeId) {
      getBbsDetail(); // 게시글 세부 정보를 가져옴
    }
  }, [noticeId]);

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
                    placeholder="제목"
                    value={title}
                    onChange={changeTitle}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TableContent
                    placeholder="내용"
                    value={content}
                    onChange={changeContent}
                  />
                </td>
              </tr>
              <tr>
                <UploadWrapper>
                  <FileInputWrapper>
                    {files.map((file, index) => (
                      <div
                        key={index}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <span>{file.name}</span>
                      </div>
                    ))}
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
              </tr>
            </tbody>
          </Table>
        </TableBox>
        <BottomBox>
          <Write
            title={title}
            content={content}
            files={files}
            setTitle={setTitle}
            setContent={setContent}
            setFiles={setFiles}
            headers={headers}
            postType={postType}
            fileUpload={fileUpload} // 파일 업로드 함수 전달
          />
          <List postType={postType} />
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
// -----------------------------------------------------------
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

const BottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export default NoticelWrite;
