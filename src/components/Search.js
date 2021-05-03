import styled from 'styled-components';
import React, {useContext, useEffect, useRef, useState} from 'react';
import latest from '../../static/snapshots/latest.json';
import {MdVideoLibrary} from 'react-icons/md';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import Fuse from 'fuse.js';
import {navigate} from 'gatsby';
import {Context} from '../AppContext';
import useFavoriteState from '../hooks/useFavoriteState';
import {SearchAlt} from '@styled-icons/boxicons-regular';
import {SquaredCross} from '@styled-icons/entypo';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: rgba(56, 56, 56, 1);
  width: 50vw;
  max-width: 560px;
  aspect-ratio: calc(560 / 356);
  border-radius: 10px;
  padding: 12px;
  & > section.top {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: 8px;
    transition: all 300ms ease;
    & > .input-area {
      display: flex;
      height: 56px;
      align-items: center;
      border-radius: 5px;
      border: 3px double #4f77e2;
      padding: 0 12px;
      & > .icon {
        cursor: pointer;
      }
      & > .search {
        margin-right: 8px;
        min-width: 20px;
      }
      & > .cancel {
        margin-left: 8px;
        min-width: 20px;
      }
      & > input {
        flex: 1;
        font-size: 14px;
        border: none;
        outline: none;
        background-color: transparent;
        color: white;
      }
    }
    & > .list {
      flex: 1;
      height: auto;
      overflow-y: auto;
      padding: 10px 0;
      & > .item {
        cursor: pointer;
        height: 50px;
        background-color: gray;
        padding: 0 10px;
        display: flex;
        align-items: center;
        border-radius: 5px;
        margin: 8px 0;
        & > .icon {
          cursor: pointer;
          font-size: 1.5rem;
          min-width: 32px;
        }
        & > .video-icon {
          margin-right: 8px;
        }
        & > .title {
          color: white;
          max-width: 400px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        :hover {
          border: 1px solid #4f77e2;
          box-shadow: 0 0 10px #4f77e2;
        }
      }
      & > .item:last-child {
        margin-bottom: 0;
      }
    }
  }
  & > section.bottom {
    display: flex;
    & > .control {
      flex: 1;
      height: 30px;
      background-color: gray;
      border-radius: 5px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      color: #fff;
      & > .hint {
        display: flex;
        align-items: center;
        margin: 0 8px;
        & > label {
          margin-left: 4px;
          font-size: 14px;
        }
        & > .key {
          font-size: 12px;
          background-color: darkgrey;
          border-radius: 5px;
          padding: 0 5px;
          margin: 0 2px;
          text-align: center;
        }
      }
    }
  }
  @media screen and (max-width: 996px) {
    width: 80vw;
  }
`;

const SearchItem = (props) => {
  const {video} = props;
  const app = useContext(Context);
  const {isInFavorite, toggleFavoriteState} = useFavoriteState({
    confId: video.playlistId,
    talkIdx: video.idx,
  });

  return (
    <div
      onClick={async () => {
        app.actions.setModal(null);
        await navigate(`/player?conf=${video.playlistId}&idx=${video.idx}`);
      }}
      className="item">
      <MdVideoLibrary fill="#fff" className="video-icon icon" />
      <div className="title">{video.title}</div>
      <div style={{flex: 1}} />
      {isInFavorite ? (
        <AiFillHeart
          onClick={(e) => {
            e.stopPropagation();
            toggleFavoriteState({
              title: video.title,
              thumbnail: video.thumbnail,
            });
          }}
          fill="#fff"
          className="love-icon icon"
        />
      ) : (
        <AiOutlineHeart
          onClick={(e) => {
            e.stopPropagation();
            toggleFavoriteState({
              title: video.title,
              thumbnail: video.thumbnail,
            });
          }}
          fill="#fff"
          className="love-icon icon"
        />
      )}
    </div>
  );
};

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState([]);
  const fuse = useRef(null);

  useEffect(() => {
    fuse.current = new Fuse(Object.values(latest), {
      findAllMatches: true,
      isCaseSensitive: false,
      keys: ['title'],
    });
  }, []);

  const _onValueChange = (e) => {
    const {value} = e.target;
    setKeyword(value);
    setResult(
      fuse.current
        .search(value)
        .map((r) => ({
          ...r.item,
        }))
        .splice(0, 5),
    );
  };

  return (
    <Wrapper>
      <section className="top">
        <div className="input-area">
          <SearchAlt className="search icon" size={32} color="white" />
          <input
            autoComplete="off"
            type="text"
            name="keyword"
            value={keyword}
            onChange={_onValueChange}
          />
          <SquaredCross
            onClick={() => {
              setKeyword('');
              setResult([]);
            }}
            className="cancel icon"
            size={32}
            color="white"
          />
        </div>
        <div className="list">
          {result.map((v, idx) => (
            <SearchItem key={idx} video={v} />
          ))}
        </div>
      </section>
      <section className="bottom">
        <div className="control">
          {/*<div className="hint">*/}
          {/*  <div className="key">↵</div>*/}
          {/*  <label>SELECT</label>*/}
          {/*</div>*/}
          {/*<div className="hint">*/}
          {/*  <div className="key">↑</div>*/}
          {/*  <div className="key">↓</div>*/}
          {/*  <label>NAVIGATE</label>*/}
          {/*</div>*/}
          <div className="hint">
            <div className="key">ESC</div>
            <label>Close</label>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Search;
