import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import PhotoIcon from "@material-ui/icons/Photo";
import MovieIcon from "@material-ui/icons/Movie";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import { useSelector, useDispatch } from "react-redux";
import { selectuser, handlePost } from "../features/userSlice";
import ReactPlayer from "react-player";
import { storage, db } from "../firebase";
import firebase from "firebase";
function PostModal(props) {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideolink] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const dispatch = useDispatch();
  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideolink("");
    setAssetArea("");
    props.handleClick(e);
  };

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideolink("");
    setAssetArea(area);
  };
  const user = useSelector(selectuser);

  const post =(e)=> {
    e.preventDefault();
    const payload = {
      image: shareImage,
      video: videoLink,
      user: user?.user,
      description: editorText,
    };

    dispatch(handlePost(payload));
    reset(e);
  }

  return (
    <>
      {props.showmodal === true && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button
                onClick={(event) => {
                  reset(event);
                }}
              >
                <CloseIcon />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                <img
                  src={
                    user?.user?.photoURL
                      ? user?.user?.photoURL
                      : "/images/user.svg"
                  }
                  alt=""
                />
                <span>{user?.user?.displayName}</span>
              </UserInfo>
              <Editor>
                {" "}
                <textarea
                  value={editorText}
                  onChange={(e) => {
                    setEditorText(e.target.value);
                  }}
                  placeholder="What you gonna Share"
                  autofocus="true"
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />

                    <p>
                      <label htmlFor="file" style={{ cursor: "pointer" }}>
                        {" "}
                        Select an image to share
                      </label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="please input a video link"
                        value={videoLink}
                        onChange={(e) => {
                          setVideolink(e.target.value);
                        }}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <PhotoIcon style={{ color: "#707070", fontSize: 30 }} />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <MovieIcon style={{ color: "#707070", fontSize: 30 }} />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <InsertCommentIcon
                    style={{ color: "#707070", fontSize: 30 }}
                  />
                  <span> Anyone</span>
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(e) => post(e)}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
}

export default PostModal;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.7);
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;
const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.5);
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
  }
`;
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 10px;
  }
`;
const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;
const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
`;
const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    margin-right: 4px;
  }
  span {
    margin-left: 5px;
    font-size: 14px;
  }
`;

const PostButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  border: 2px solid
    ${(props) => (props.disabled ? "rgba(0,0,0,0.15)" : "#70b5f9")};
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.5)" : "#70b5f9")};
  color: ${(props) => (props.disabled ? "rgba(1,1,1,0.6)" : "white")};
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.5)" : "#1c86ed")};
  }
`;
const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    resize: none;
    outline: none;
    border: none;
    background: transparent;
    min-height: 100px;
    width: 100%;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;
