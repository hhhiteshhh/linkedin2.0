import styled from "styled-components";
import React, { useState, useEffect } from "react";
import PhotoIcon from "@material-ui/icons/Photo";
import MovieIcon from "@material-ui/icons/Movie";
import AssignmentIcon from "@material-ui/icons/Assignment";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CommentIcon from "@material-ui/icons/Comment";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import SendIcon from "@material-ui/icons/Send";
import { useSelector } from "react-redux";
import { selectuser } from "../features/userSlice";
import PostModal from "./PostModal";
import { db } from "../firebase";
import ReactPlayer from "react-player";

const Main = (props) => {
  const user = useSelector(selectuser);
  const [showModal, setShowModal] = useState(false);
  const [articles, setArticles] = useState([]);
  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  useEffect(() => {
    db.collection("articles")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        setArticles(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, [articles]);
  return (
    <Container>
      <ShareBox>
        <div>
          {user?.user.photoURL ? (
            <img src={user?.user.photoURL} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
          <button onClick={(e) => handleClick(e)}>Start a post</button>
        </div>
        <div>
          <button>
            <a>
              {" "}
              <PhotoIcon
                className="photoIcon"
                style={{ color: "#70b5f9", fontSize: 30 }}
              />
            </a>
            <span>Photo</span>
          </button>
          <button>
            <a>
              {" "}
              <MovieIcon
                className="videoIcon"
                style={{ color: "#3cb051", fontSize: 30 }}
              />
            </a>
            <span>Video</span>
          </button>
          <button>
            <a>
              {" "}
              <PhotoIcon
                className="photoIcon2"
                style={{ color: "#e7a33e", fontSize: 30 }}
              />
            </a>
            <span>Event</span>
          </button>
          <button>
            <a>
              {" "}
              <AssignmentIcon
                className="articleIcon"
                style={{ color: "#bd533e", fontSize: 30 }}
              />
            </a>
            <span>Article</span>
          </button>
        </div>
      </ShareBox>
      <div>
        {articles?.map((article) => (
          <Article key={article.id}>
            <ShareActor>
              <a>
                <img src={article.data.actor.image} alt="" />
                <div>
                  <span>{article.data.actor.title}</span>
                  <span>{article.data.actor.email}</span>
                  <span>{article.data.date.toDate().toLocaleDateString()}</span>
                </div>
              </a>
              <button>
                <MoreHorizIcon />
              </button>
            </ShareActor>
            <Description>{article.data.description}</Description>
            {article.data.sharedImage && (
              <SharedImg>
                <a>
                  <img src={article.data.sharedImage} alt="" />
                </a>
              </SharedImg>
            )}
            {article.data.video && (
              <SharedImg>
                <a>
                  <ReactPlayer width={"100%"} url={article.data.video} />
                </a>
              </SharedImg>
            )}
            {/* <SocialCounts>
              <li>
                <button>
                  <ThumbUpIcon
                    style={{ color: "#70b5f9", fontSize: 20, margin: 3 }}
                  />
                  <span style={{ margin: 3 }}>75</span>

                  <CommentIcon
                    style={{ color: "#3cb051", fontSize: 20, margin: 3 }}
                  />
                </button>
              </li>
              <li>
                <a>2 comments</a>
              </li>
            </SocialCounts> */}
            <SocialActions>
              <button>
                <ThumbUpOutlinedIcon
                  style={{ color: "#70b5f9", fontSize: 20, margin: 3 }}
                />
                <span>Like</span>
              </button>
              <button>
                <CommentOutlinedIcon
                  style={{ color: "#70b5f9", fontSize: 20, margin: 3 }}
                />
                <span>Comment</span>
              </button>
              <button>
                <ShareOutlinedIcon
                  style={{ color: "#70b5f9", fontSize: 20, margin: 3 }}
                />
                <span>Share</span>
              </button>
              <button>
                <SendIcon
                  style={{ color: "#70b5f9", fontSize: 20, margin: 3 }}
                />
                <span>Send</span>
              </button>
            </SocialActions>
          </Article>
        ))}
      </div>
      <PostModal showmodal={showModal} handleClick={handleClick} />
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgba(0 0 0 / 15%), 0 0 0 rgba(0 0 0 /20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    outline: none;
    border: none;
    background: transparent;
    @media (max-width: 860px) {
      zoom: 0.9;
    }
    @media (max-width: 812px) {
      zoom: 0.8;
    }
    @media (max-width: 768px) {
      zoom: 1;
    }
    button {
      outline: none;
      border: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      display: flex;
      align-items: center;
      font-weight: 600;
      cursor: pointer;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: #fff;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        a {
          margin: 4px 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const ShareActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 8px;
    }
    div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        margin-top: 3px;

        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: black;
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  font-size: 14px;
  text-align: left;
  color: rgba(0, 0, 0, 0.9);
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: center;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    font-size: 12px;
    button {
      display: flex;
      outline: none;
      border: none;
      background: transparent;
      padding: 5px;
      align-items: center;
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  padding: 5px;

  button {
    display: flex;
    outline: none;
    border: none;
    background: transparent;
    padding: 5px;
    align-items: center;

    @media (min-width: 768px) {
      span {
        margin-left: 5px;
      }
    }
  }
`;

export default Main;
